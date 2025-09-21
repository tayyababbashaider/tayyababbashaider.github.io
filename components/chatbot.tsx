"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

interface Message {
  text: string
  isUser: boolean
}

export function Chatbot() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ text: t("chat.greeting"), isUser: false }])
  const [inputValue, setInputValue] = useState("")
  const [showBadge, setShowBadge] = useState(false)
  const [lastSeenMessageIndex, setLastSeenMessageIndex] = useState(0)
  const [usePersonalServer, setUsePersonalServer] = useState(true) // toggle between personal server and Cohere
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // -------------------------
  // Effects
  // -------------------------
  useEffect(() => {
    setMessages((prev) => {
      const firstIsAssistant = prev[0] && !prev[0].isUser
      if (firstIsAssistant) {
        const clone = [...prev]
        clone[0] = { text: t("chat.greeting"), isUser: false }
        return clone
      }
      return prev
    })
  }, [t])

  useEffect(() => {
    const unseenAssistantMessages = messages.filter((message, index) => !message.isUser && index >= lastSeenMessageIndex)
    setShowBadge(unseenAssistantMessages.length > 0 && !isOpen)
  }, [messages, lastSeenMessageIndex, isOpen])

  useEffect(() => {
    if (isOpen && messages.length > lastSeenMessageIndex) {
      setLastSeenMessageIndex(messages.length)
    }
  }, [messages, isOpen, lastSeenMessageIndex])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // -------------------------
  // Generate AI response
  // -------------------------
  async function generateResponse(query: string): Promise<string> {
    if (usePersonalServer) {
      // ---- Personal server endpoint ----
      try {
        const apiUrl = "https://tayyababbas-my-python-server.hf.space/generate"
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: query, max_length: 200, num_return_sequences: 1 }),
        })
        if (!res.ok) return "I’m having trouble connecting to the assistant right now."
        const data = await res.json()
        return data?.response || "Sorry, no response."
      } catch (err) {
        console.error(err)
        return "I’m having trouble connecting to the assistant right now."
      }
    } else {
      // ---- Cohere API ----
      try {
        const apiKey = (window as any).COHERE_API_KEY
        const systemPrompt = `
You are an AI assistant for ${PORTFOLIO_DATA.name}'s portfolio website.
Title: ${PORTFOLIO_DATA.title}
Contact: ${JSON.stringify(PORTFOLIO_DATA.contact)}
Skills: ${(PORTFOLIO_DATA.skills || []).join(", ")}
Profiles: ${JSON.stringify(PORTFOLIO_DATA.profiles)}
Profile Summary: ${PORTFOLIO_DATA.profile}
`
        const res = await fetch("https://api.cohere.ai/v2/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: "command-a-03-2025",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: query },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        })
        if (!res.ok) return "I’m having trouble connecting to the assistant right now."
        const data = await res.json()
        const content = data?.message?.content
        if (typeof content === "string") return content
        if (Array.isArray(content)) return content.map((b: any) => b.text || "").join("\n").trim() || "Sorry, no response."
        if (content && typeof content === "object" && typeof content.text === "string") return content.text
        return "Sorry, no response."
      } catch (err) {
        console.error(err)
        return "I’m having trouble connecting to the assistant right now."
      }
    }
  }

  // -------------------------
  // Handle submit
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }])
    setMessages((prev) => [...prev, { text: t("chat.typing"), isUser: false }])

    try {
      const response = await generateResponse(userMessage)
      setMessages((prev) => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = { text: response, isUser: false }
        return newMessages
      })
    } catch {
      setMessages((prev) => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = { text: t("chat.error"), isUser: false }
        return newMessages
      })
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setLastSeenMessageIndex(messages.length)
      setShowBadge(false)
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 max-h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{t("chat.title")}</span>
              <button
                onClick={() => setUsePersonalServer(!usePersonalServer)}
                className="px-2 py-0.5 text-xs bg-indigo-800 hover:bg-indigo-700 rounded-full"
              >
                {usePersonalServer ? "Personal Server" : "Cohere"}
              </button>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-50 overflow-y-auto p-3 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/20">
            {messages.map((message, index) => (
              <div key={index} className={`flex mb-2 ${message.isUser ? "justify-end" : "justify-start"}`}>
                {message.isUser ? (
                  <div
                    className={`w-3/4 px-3 py-2 rounded-2xl text-sm break-words ${
                      message.isUser
                        ? "bg-indigo-600 text-white rounded-br-md"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md"
                    }`}
                  >
                    {typeof message.text === "string" ? message.text : ""}
                  </div>
                ) : (
                  <AssistantBubble text={typeof message.text === "string" ? message.text : ""} />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-slate-200 dark:border-slate-700">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 transition-colors"
            >
              {t("chat.send")}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="relative w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6" />
        {showBadge && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            1
          </span>
        )}
      </button>
    </div>
  )
}

function AssistantBubble({ text }: { text: string }) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.overflow = "hidden"
    el.style.height = `${el.scrollHeight}px`
  }, [text])

  return (
    <textarea
      ref={ref}
      readOnly
      value={text}
      className="w-3/4 px-3 py-2 rounded-2xl text-sm bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md border border-slate-300 dark:border-slate-600 resize-none whitespace-pre-wrap leading-5"
      rows={1}
      style={{ overflow: "hidden" }}
    />
  )
}

// -------------------------
// Portfolio data
// -------------------------
const PORTFOLIO_DATA = {
  name: "Tayyab Abbas",
  title: "Senior Software Engineer & Solutions Architect",
  contact: {
    phone: "+92 339 0786039",
    email: "tayyababbaxi661@gmail.com",
    location: "Lahore, Punjab, Pakistan",
    website: "https://tayyababbashaider.github.io",
    linkedin: "https://www.linkedin.com/in/tayyababbashaider/",
  },
  skills: [
    "React.js / Next.js",
    "Vue.js / Nuxt.js",
    "TypeScript / JavaScript (ES6+)",
    "Redux / Vuex / State Management",
    "Node.js / PHP Laravel",
    "RESTful APIs / GraphQL",
    "Serverless Architectures / AWS Lambda@Edge",
    "CI/CD (GitHub Actions, GitLab, Netlify, Vercel)",
    "Docker & Containerization",
    "Tailwind CSS / Bootstrap / SCSS",
    "SEO Optimization & Core Web Vitals",
    "Agile / Scrum",
    "OTT Streaming (HLS, DASH, DRM)",
    "Media Servers & CDNs (Akamai, Cloudflare, CloudFront)",
    "Database: MySQL / PostgreSQL / MongoDB",
  ],
  profiles: {
    linkedin: "https://www.linkedin.com/in/tayyababbashaider/",
    github: "https://github.com/tayyababbashaider/",
    medium: "https://tayyababbashaider.medium.com/",
    x: "https://x.com/tayyababbasdev",
    youtube: "https://www.youtube.com/@tayyababbashaider/",
    stackoverflow: "https://stackoverflow.com/users/17666468/tayyababbashaider",
  },
  profile:
    "Senior Software Engineer and Solutions Architect with 4+ years of experience developing scalable web applications and software solutions. Skilled in cloud, serverless, and OTT streaming architectures, with hands-on expertise in React, Vue, Laravel, and AWS services.",
}
