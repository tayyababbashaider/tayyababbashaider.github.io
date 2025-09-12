"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"

export function StatusCards() {
  return (
    <div className="grid items-start grid-cols-1 gap-6 grid-cols-12">
      <div className="col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 md:text-right md:text-base md:font-normal md:text-opacity-40"></div>
      <div className="col-span-10">
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
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  // Calculate angles for clock hands
  const hourAngle = (hours % 12) * 30 + minutes * 0.5
  const minuteAngle = minutes * 6 + seconds * 0.1
  const secondAngle = seconds * 6

  return (
    <div className="flex flex-col border border-gray-300 text-sm dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 w-full p-4">
        <div className="flex-1 text-black dark:text-white">
          <span className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>Lhr, PK (GMT+5)</span>
          </span>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>
      <div className="p-4 text-center">
        <div className="relative w-24 h-24 mx-auto">
          {/* Clock face */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600">
            {/* Hour markers */}
            <div className="absolute top-1 left-1/2 w-0.5 h-3 bg-gray-400 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 right-1 w-3 h-0.5 bg-gray-400 transform -translate-y-1/2"></div>
            <div className="absolute bottom-1 left-1/2 w-0.5 h-3 bg-gray-400 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-1 w-3 h-0.5 bg-gray-400 transform -translate-y-1/2"></div>

            {/* Numbers */}
            <span className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold">12</span>
            <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-bold">3</span>
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold">6</span>
            <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xs font-bold">9</span>

            {/* Clock hands */}
            <div
              className="absolute top-1/2 left-1/2 w-0.5 bg-gray-800 dark:bg-gray-200 origin-bottom transform -translate-x-1/2 -translate-y-full"
              style={{
                height: "30%",
                transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
                transformOrigin: "50% 100%",
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-0.5 bg-gray-600 dark:bg-gray-300 origin-bottom transform -translate-x-1/2 -translate-y-full"
              style={{
                height: "40%",
                transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
                transformOrigin: "50% 100%",
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-px bg-red-500 origin-bottom transform -translate-x-1/2 -translate-y-full"
              style={{
                height: "45%",
                transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
                transformOrigin: "50% 100%",
              }}
            ></div>

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusCard() {
  return (
    <div className="flex flex-col border border-gray-300 text-sm dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 w-full p-4">
        <div className="flex-1 text-black dark:text-white uppercase">Mode</div>
        <div className="flex gap-2 items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>
      <div className="p-4">
        <p className="text-black dark:text-white text-sm">
          - Working at <strong>AI</strong> use cases.
        </p>
        <p className="text-black dark:text-white text-sm mt-1">
          - Developing laravel modified <strong>boilerplate</strong>.
        </p>
      </div>
    </div>
  )
}

function ExperienceCard() {
  return (
    <div className="flex flex-col border border-gray-300 text-sm dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 w-full p-4">
        <div className="flex-1 text-black dark:text-white uppercase">Years pro</div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700"></div>
      <div className="p-4 flex items-center justify-center">
        <div className="text-black dark:text-white font-bold text-6xl">4+</div>
      </div>
    </div>
  )
}
