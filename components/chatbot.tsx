"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

interface Message {
  text: string
  isUser: boolean
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ text: "Hi! How can I help you today?", isUser: false }])
  const [inputValue, setInputValue] = useState("")
  const [showBadge, setShowBadge] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowBadge(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }])

    // Add typing indicator
    setMessages((prev) => [...prev, { text: "Typing...", isUser: false }])

    try {
      const response = await generateResponse(userMessage)
      setMessages((prev) => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = { text: response, isUser: false }
        return newMessages
      })
    } catch (error) {
      setMessages((prev) => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = {
          text: "Sorry, something went wrong while generating a response.",
          isUser: false,
        }
        return newMessages
      })
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) setShowBadge(false)
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-4 w-80 max-h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-indigo-600 text-white">
            <div className="font-semibold text-sm">Assistant</div>
            <button onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-3 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/20">
            {messages.map((message, index) => (
              <div key={index} className={`flex mb-2 ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    message.isUser
                      ? "bg-indigo-600 text-white rounded-br-md"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-slate-200 dark:border-slate-700">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Chat Toggle Button */}
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

// Portfolio data and AI response generation
const PORTFOLIO_DATA = {
  name: "Tayyab Abbas",
  title: "Senior Software Engineer & Solutions Architect",
  contact: {
    phone: "+92 339 0786039",
    email: "tayyababbaxi661@gmail.com",
    location: "Lahore, Punjab, Pakistan",
    website: "https://tayyababbashaider.github.io",
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

async function generateResponse(query: string): Promise<string> {
  try {
    const apiKey = (window as any).COHERE_API_KEY;

    const systemPrompt = `
You are an AI assistant for ${PORTFOLIO_DATA.name}'s portfolio website.
Title: ${PORTFOLIO_DATA.title}
Contact: ${JSON.stringify(PORTFOLIO_DATA.contact)}
Skills: ${(PORTFOLIO_DATA.skills || []).join(", ")}
Profiles: ${JSON.stringify(PORTFOLIO_DATA.profiles)}
Profile Summary: ${PORTFOLIO_DATA.profile}
`;

    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "command",
        message: query,
        preamble: systemPrompt,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await res.json();
    return data.text ?? "Sorry, no response.";
  } catch (err) {
    console.error("Error calling Cohere:", err);
    return "I’m having trouble connecting to the assistant right now. Please try again later.";
  }
}
