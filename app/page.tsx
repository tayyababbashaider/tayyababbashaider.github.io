"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { Chatbot } from "@/components/chatbot"

export default function Portfolio() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative flex h-full min-h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-1">
        <div className="flex w-full">
          <MainContent onMenuClick={() => setIsSidebarOpen(true)} />
        </div>
      </div>

      <Chatbot />
    </div>
  )
}
