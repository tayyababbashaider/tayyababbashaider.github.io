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
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    const unseenAssistantMessages = messages.filter((message, index) =>
      !message.isUser && index >= lastSeenMessageIndex
    )
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
            <div className="font-semibold text-sm">{t("chat.title")}</div>
            <button onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-50 overflow-y-auto p-3 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/20">
            {messages.map((message, index) => (
              <div key={index} className={`flex mb-2 ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`w-3/4 px-3 py-2 rounded-2xl text-sm break-words ${message.isUser
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

// Portfolio data and AI response generation remain unchanged
async function generateResponse(query: string): Promise<string> {
  try {
    const apiKey = (window as any).COHERE_API_KEY;
    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "command",
        message: query,
        preamble: "",
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    const data = await res.json();
    return data.text ?? "Sorry, no response.";
  } catch {
    return "I’m having trouble connecting to the assistant right now. Please try again later.";
  }
}
