export function StackSection() {
  const stackCategories = [
    {
      title: "Programming Languages",
      skills: ["PHP", "JavaScript", "Elixir", "Python", "HTML", "CSS", "Liquid", "GraphQL"],
    },
    {
      title: "Libraries & Frameworks",
      skills: [
        "Laravel",
        "Next",
        "React",
        "Vue",
        "Phoenix",
        "Meteor",
        "Node",
        "Gatsby",
        "Shopify",
        "Firebase",
        "Stripe",
        "Serverless",
        "Test Driven Development",
      ],
    },
    {
      title: "Hostings & Clouds",
      skills: ["AWS", "Google", "Alibaba", "Serverless", "Lambda@edge", "Netlify", "Vercel", "Heroku", "DigitalOcean"],
    },
    {
      title: "OTT",
      skills: [
        { name: "HLS", tooltip: "HTTP Live Streaming Protocol" },
        { name: "DASH", tooltip: "Dynamic Adaptive Streaming over HTTP Protocol" },
        { name: "DRM", tooltip: "Digital Rights Management", grouped: true },
        { name: "Widevine", tooltip: "Digital Rights Management", grouped: true },
        { name: "PlayReady", tooltip: "Digital Rights Management", grouped: true },
        { name: "FairPlay", tooltip: "Digital Rights Management", grouped: true, last: true },
        "Media Servers",
        { name: "CDNs", tooltip: "Content Delivery Networks", grouped: true },
        { name: "Akamai", tooltip: "Content Delivery Networks", grouped: true },
        { name: "Cloudflare", tooltip: "Content Delivery Networks", grouped: true },
        { name: "Amazon CloudFront", tooltip: "Content Delivery Networks", grouped: true, last: true },
      ],
    },
    {
      title: "Servers",
      skills: ["Nginx", "Apache", "LiteSpeed"],
    },
    {
      title: "Databases",
      skills: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      title: "Tools & Platforms",
      skills: ["Docker", "SSH", "Git", "GitHub", "TablePlus", "Jira", "Monday", "Asana", "Agile", "Waterfall"],
    },
  ]

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

    const { name, tooltip, grouped, last } = skill
    let className = "flex items-center px-3 py-1 text-xs font-semibold leading-5 mr-1 mt-1 text-gray-900 bg-gray-200"

    if (grouped && !last) {
      className += " rounded-l-full"
    } else if (grouped && last) {
      className += " rounded-r-full mr-2"
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
      <h4 className="col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 text-left md:text-base md:font-normal md:text-opacity-40">
        Stack
      </h4>
      <div className="col-span-10">
        {stackCategories.map((category, categoryIndex) => (
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
