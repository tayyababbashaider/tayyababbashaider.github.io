import { useI18n } from "@/components/i18n-provider"

export function OnlineSection() {
  const { t } = useI18n()
  const links = [
    { name: "GitHub", url: "https://github.com/tayyababbashaider", action: t("online.follow") },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/tayyababbashaider", action: t("online.follow") },
    {
      name: "StackOverflow",
      url: "https://stackoverflow.com/users/17666468/tayyababbashaider",
      action: t("online.follow"),
    },
    { name: "YouTube", url: "https://www.youtube.com/@tayyababbashaider", action: t("online.subscribe") },
    { name: "Twitter", url: "https://x.com/tayyababbasdev", action: t("online.follow") },
  ]

  return (
    <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-12">
      <h4 className={`col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 ${t("align.content") === 'right' ? 'text-right' : 'text-left'} md:text-base md:font-normal md:text-opacity-40`}>
        {t("online.title")}
      </h4>
      <div className="col-span-10">
        <div className="flex flex-col gap-5 lg:gap-3">
          {links.map((link) => (
            <a
              key={link.name}
              target="_blank"
              rel="noopener noreferrer"
              href={link.url}
              className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group"
            >
              <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-blue-600 group-hover:underline dark:text-gray-100 dark:group-hover:text-blue-500">
                {link.name}
              </strong>
              <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
              <span className="flex-none text-gray-600 dark:text-gray-400">{link.action}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
