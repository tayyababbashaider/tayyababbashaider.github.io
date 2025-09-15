"use client"

import { Menu } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { StatusCards } from "@/components/status-cards"
import { OnlineSection } from "@/components/online-section"
import { WorkSection } from "@/components/work-section"
import { SpeakingSection } from "@/components/speaking-section"
import { StackSection } from "@/components/stack-section"
import { ModeToggle } from "./mode-toggle"

interface MainContentProps {
  onMenuClick: () => void
}

export function MainContent({ onMenuClick }: MainContentProps) {
  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "../pdf/Tayyab-CV.pdf"
    link.download = "Tayyab-Abbas.pdf"
    link.click()
  }

  return (
    <div className="relative flex max-h-screen w-full flex-col overflow-y-auto bg-white dark:bg-black">
      {/* Header */}
      <div className="filter-blur sticky top-0 z-10 flex flex-col justify-center px-3 py-2 dark:border-b dark:border-gray-900 bg-white/80 border-b dark:bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onMenuClick}
            className="flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 flex justify-end">
            <ModeToggle />
            <button
              onClick={handleDownloadCV}
              className="ms-3 px-4 py-2 rounded-md font-semibold border border-gray-200 bg-gray-100 text-gray-900 transition hover:bg-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              Download CV
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8 dark:text-gray-400">
        <div className="pb-24 space-y-8 md:space-y-16">
          <HeroSection />
          <StatusCards />
          <OnlineSection />
          <WorkSection />
          <SpeakingSection />
          <StackSection />
        </div>
      </div>
    </div>
  )
}
