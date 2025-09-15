"use client"

import { useEffect, useRef, useState } from "react"
import { useI18n } from "@/components/i18n-provider"

export function HeroSection() {
  const { t } = useI18n()
  const [displayedText, setDisplayedText] = useState("")
  const fullText = t("hero.intro")
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setDisplayedText("")
    let currentIndex = 0
    const typeSpeed = 35

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
        timerRef.current = window.setTimeout(typeText, typeSpeed)
      }
    }

    typeText()
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [fullText])

  return (
    <div className="grid items-start grid-cols-1 gap-6">
      <div className="col-span-10">
        <div className="prose w-full text-primary">
          <div
            className="relative p-5 text-white rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url('/futuristic-tech-circuit-board-background.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <p className="relative z-9 bg-black/70 p-4 rounded">
              <span className="font-mono">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </p>
          </div>

          <p className="mt-6">{t("hero.p1")}</p>

          <p>
            {t("hero.p2")}{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://itroadway.com"
              className="text-blue-600 hover:underline"
            >
              IT Roadway
            </a>
            .
          </p>

          <p>
            {t("hero.p3")}{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/tayyababbashaider/"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>{" "}
            {t("hero.p4")}{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.fiverr.com/s/NNaQgo8"
              className="text-orange-500 hover:underline"
            >
              Fiverr
            </a>
            ,{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.upwork.com/freelancers/~0142c1fdc1dd525e06"
              className="text-purple-600 hover:underline"
            >
              Upwork
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://pph.me/tayyababbashaider"
              className="text-orange-500 hover:underline"
            >
              PeoplePerHour
            </a>
            .
          </p>

          <p>
            {t("hero.training.prefix")}{" "}
            <a target="_blank" rel="noopener noreferrer" href="#" className="text-orange-500 hover:underline">
              {t("header.training")}
            </a>{" "}
            {t("hero.training.suffix")}
          </p>
        </div>
      </div>
    </div>
  )
}
