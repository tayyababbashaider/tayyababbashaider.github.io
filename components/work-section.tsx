import { useI18n } from "@/components/i18n-provider"

export function WorkSection() {
  const { t } = useI18n()
  const workExperience = t<any[]>("work.experiences")

  return (
    <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-12">
      <h4 className={`col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 ${t("align.content") === 'right' ? 'text-right' : 'text-left'} md:text-base md:font-normal md:text-opacity-40`}>
        {t("work.title")}
      </h4>
      <div className="col-span-10">
        <div className="flex flex-col space-y-3">
          {workExperience.map((work, index) => (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              href={work.url}
              className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group"
            >
              <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-blue-600 group-hover:underline dark:text-gray-100 dark:group-hover:text-blue-500">
                {work.company}
              </strong>
              <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
              <span className="flex-none text-gray-600 dark:text-gray-400">{work.role}</span>
              <span className="flex-none font-mono text-gray-500 dark:text-gray-500">{work.period}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
