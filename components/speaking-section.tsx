import { useI18n } from "@/components/i18n-provider"

export function SpeakingSection() {
  const { t } = useI18n()
  const talks = [
    { topic: t("speaking.topic.mindmap"), date: "Jan '25" },
    { topic: t("speaking.topic.patterns"), date: "Aug '24" },
    { topic: t("speaking.topic.kiss"), date: "Jan '24" },
    { topic: t("speaking.topic.sdlc"), date: "Oct '23" },
    { topic: t("speaking.topic.lambdaedge"), date: "Mar '23" },
    { topic: t("speaking.topic.serverless"), date: "Feb '23" },
  ]

  return (
    <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-12">
      <h4 className={`col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 ${t("align.content") === 'right' ? 'text-right' : 'text-left'} md:text-base md:font-normal md:text-opacity-40`}>
        {t("speaking.title")}
      </h4>
      <div className="col-span-10">
        <div className="flex flex-col space-y-3">
          {talks.map((talk, index) => (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              href="#"
              className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group"
            >
              <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-blue-600 group-hover:underline dark:text-gray-100 dark:group-hover:text-blue-500">
                {talk.topic}
              </strong>
              <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
              <span className="flex-none font-mono text-gray-500 dark:text-gray-500">{talk.date}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
