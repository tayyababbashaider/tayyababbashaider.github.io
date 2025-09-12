"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText =
    "Hi, I'm Tayyab Abbas — a Senior Software Engineer and Solutions Architect with 4+ years of professional experience in developing scalable web applications and software solutions. Passionate about problem-solving, building innovative digital products, and sharing knowledge with the developer community. Always eager to learn emerging technologies and contribute to impactful projects."

  useEffect(() => {
    let currentIndex = 0
    const typeSpeed = 35

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, typeSpeed)
      }
    }

    typeText()
  }, [])

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

          <p className="mt-6">
            Experienced in providing custom solutions, skilled with cloud, serverless, AWS's multiple services and OTT,
            building environments from the scratch up to <strong>production</strong> level.
          </p>

          <p>
            I'm currently building an app that brings together learning experience, management, and e-commerce along
            with multi vendor support at{" "}
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
            As a experienced software engineer, I have a proven track record of delivering high-quality solutions to
            clients. You can find my professional profile on{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/tayyababbashaider/"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>{" "}
            and explore my services on{" "}
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
            </a>{" "}
            for any project proposals.
          </p>

          <p>
            After graduation, I spent 1 year as a Software Engineer at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/shark-innovation-labs/posts/?feedView=all"
              className="text-orange-500 hover:underline"
            >
              Shark Innovation Labs
            </a>
            , a child company of{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.alsharqi.co/"
              className="text-blue-600 hover:underline"
            >
              Al Sharqi
            </a>
            , working with a Dubai-based client. This experience marked a significant milestone in my career, leveraging
            my Vue Js and React Js skills.
          </p>

          <p>
            Before Shark Innovation Labs, I completed an internship as a Trainee and Associate Software Engineer at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/mettlesol/posts/?feedView=all"
              className="text-orange-500 hover:underline"
            >
              Mettlesol
            </a>
            , where I worked on various projects, including an online website for the company using React.js and
            Firebase. Additionally, I participated in an Apprenticeship at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/zauq-group/posts/?feedView=all"
              className="text-blue-600 hover:underline"
            >
              Zauq Group
            </a>
            , contributing to an RFID-based Grocery Website project as part of my university's Final Year Project.
          </p>

          <p>
            I also co-host the multiple{" "}
            <a target="_blank" rel="noopener noreferrer" href="#" className="text-orange-500 hover:underline">
              training
            </a>{" "}
            sessions about software development.
          </p>
        </div>
      </div>
    </div>
  )
}
