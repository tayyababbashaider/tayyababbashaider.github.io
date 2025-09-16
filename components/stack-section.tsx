import { useI18n } from "@/components/i18n-provider"

export function StackSection() {
  const { t } = useI18n()
  const stackCategories = t<any[]>("stack.categories")

  const renderSkill = (skill: any, index: number) => {
    if (typeof skill === "string") {
      return (
        <span
          key={index}
          className="flex items-center rounded-full px-3 py-1 text-xs font-semibold leading-5 mr-2 mt-1 text-gray-900 bg-gray-200"
        >
          {skill}
        </span>
      )
    }

    const { name, tooltip, grouped, last, center } = skill
    let className = "flex items-center px-3 py-1 text-xs font-semibold leading-5 mr-1 mt-1 text-gray-900 bg-gray-200"

    if (grouped && !last && !center) {
      className += " rounded-l-full"
    } else if (grouped && last) {
      className += " rounded-r-full mr-2"
    } else if (grouped && center) {
      className += ""
    } else if (!grouped) {
      className += " rounded-full mr-2"
    }

    return (
      <span key={index} className={className} title={tooltip}>
        {name}
      </span>
    )
  }

  return (
    <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-12">
      <h4 className={`col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 ${t("align.content") === 'right' ? 'text-right' : 'text-left'} md:text-base md:font-normal md:text-opacity-40 lg:leading-[2.56]`}>
        {t("stack_title")}
      </h4>
      <div className="col-span-10">
        {stackCategories.map((category: any, categoryIndex: number) => (
          <div key={categoryIndex}>
            <div className="flex flex-col space-y-3 mt-2 mb-1">
              <div className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group">
                <span className="flex-none text-gray-1000 dark:text-gray-100">{category.title}</span>
                <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
              </div>
            </div>
            <div className="flex flex-wrap mb-2">{category.skills.map(renderSkill)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
