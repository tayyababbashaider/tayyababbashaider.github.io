"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

export function StatusCards() {
  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-12 gap-6">
      <div className="col-span-10 md:col-start-2">
        <div className="grid md:grid-cols-3 gap-5">
          <ClockCard />
          <StatusCard />
          <ExperienceCard />
        </div>
      </div>
    </div>
  )
}

function ClockCard() {
  const { t } = useI18n()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const tz = "Asia/Karachi"
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(time)

  const hh = Number(parts.find((p) => p.type === "hour")?.value || 0)
  const mm = Number(parts.find((p) => p.type === "minute")?.value || 0)
  const ss = Number(parts.find((p) => p.type === "second")?.value || 0)

  const hourAngle = (hh % 12) * 30 + mm * 0.5
  const minuteAngle = mm * 6 + ss * 0.1
  const secondAngle = ss * 6

  return (
    <div className="flex flex-col border border-gray-300 text-sm dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 w-full p-4">
        <div className="flex-1 text-black dark:text-white">
          <span className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{t("location.label")}</span>
          </span>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>

      <div className="p-4 text-center">
        <div className="mx-auto w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" className="fill-none stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" />
            <line x1="50" y1="6" x2="50" y2="12" className="stroke-gray-400" strokeWidth="2" />
            <line x1="88" y1="50" x2="94" y2="50" className="stroke-gray-400" strokeWidth="2" />
            <line x1="50" y1="88" x2="50" y2="94" className="stroke-gray-400" strokeWidth="2" />
            <line x1="6" y1="50" x2="12" y2="50" className="stroke-gray-400" strokeWidth="2" />

            <text x="50" y="22" textAnchor="middle" className="fill-current font-bold text-[10px]">12</text>
            <text x="78" y="53" textAnchor="middle" className="fill-current font-bold text-[10px]">3</text>
            <text x="50" y="82" textAnchor="middle" className="fill-current font-bold text-[10px]">6</text>
            <text x="22" y="53" textAnchor="middle" className="fill-current font-bold text-[10px]">9</text>

            <g transform={`rotate(${hourAngle} 50 50)`}>
              <line x1="50" y1="50" x2="50" y2="30" className="stroke-gray-900 dark:stroke-gray-200" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g transform={`rotate(${minuteAngle} 50 50)`}>
              <line x1="50" y1="50" x2="50" y2="22" className="stroke-gray-700 dark:stroke-gray-300" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g transform={`rotate(${secondAngle} 50 50)`}>
              <line x1="50" y1="52" x2="50" y2="18" className="stroke-red-500" strokeWidth="1" strokeLinecap="round" />
            </g>

            <circle cx="50" cy="50" r="2.5" className="fill-gray-900 dark:fill-gray-200" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function StatusCard() {
  const { t } = useI18n()
  return (
    <div className="flex flex-col border border-gray-300 text-sm dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 w-full p-4">
        <div className="flex-1 text-black dark:text-white uppercase">{t("status.mode")}</div>
        <div className="flex gap-2 items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>
      <div className="p-4">
        <p className="text-black dark:text-white text-sm">{t("status.mode.item_ai")}</p>
        <p className="text-black dark:text-white text-sm mt-1">{t("status.mode.item_boilerplate")}</p>
      </div>
    </div>
  )
}

function ExperienceCard() {
  const { t } = useI18n()
  return (
    <div className="flex flex-col border border-gray-300 text-sm dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 w-full p-4">
        <div className="flex-1 text-black dark:text-white uppercase">{t("status.years_pro")}</div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>
      <div className="p-4 flex items-center justify-center">
        <div className="text-black dark:text-white font-bold text-6xl">4+</div>
      </div>
    </div>
  )
}
