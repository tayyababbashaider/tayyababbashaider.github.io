"use client"
import { X, Home, BookOpen, Bookmark, Layers, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/components/i18n-provider"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useI18n()
  const projects = [
    { name: "Wise Compass", url: "https://wisecompass.com/" },
    { name: "Bitgo Fulfill", url: "https://bitgofulfill.com/" },
    { name: "Future of Logistics", url: "https://agent.alsharqi.co/#/login" },
    { name: "Joblinx", url: "https://www.joblinx.com.au/" },
    { name: "Emotify", url: "https://www.crunchbase.com/organization/emotify" },
    { name: "BeNoticed", url: "#" },
  ]

  const socialLinks = [
    { name: "Skype", url: "https://join.skype.com/invite/wfHtrH7tedlg", handle: "tayyababbashaider" },
    { name: "GitHub", url: "https://github.com/tayyababbashaider" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/tayyababbashaider" },
    { name: "Twitter", url: "https://x.com/tayyababbasdev" },
    { name: "YouTube", url: "https://www.youtube.com/@tayyababbashaider" },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      <nav
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-3/4 sm:w-1/2 transform overflow-y-auto border-r border-gray-150 bg-white pb-10 transition-transform duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 md:w-72 lg:relative lg:z-auto lg:h-auto lg:w-72 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72 3xl:w-80",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="filter-blur sticky top-0 z-10 flex items-center justify-between px-3 py-4 bg-white dark:bg-gray-800 dark:border-gray-900">
          <div className="flex items-center space-x-3">
            <img src="/professional-headshot.jpg" alt="Tayyab Abbas" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <h2 className="text-sm font-bold text-black dark:text-gray-200 line-clamp-1">{t("name_title")}</h2>
              <span className="text-sm text-black/70 dark:text-gray-200 line-clamp-1">
                <a href="mailto:tayyababbaxi661@gmail.com">tayyababbaxi661@gmail.com</a>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="z-20 p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 px-3 py-3 space-y-1">
          <ul className="space-y-1">
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                href="#"
                onClick={onClose}
              >
                <Home className="h-4 w-4" />
                <span className="flex-1">{t("sidebar.home")}</span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 opacity-50 cursor-not-allowed pointer-events-none"
                aria-disabled="true"
              >
                <BookOpen className="h-4 w-4" />
                <span className="flex-1">{t("sidebar.writing")}</span>
              </a>
            </li>
          </ul>

          <ul className="space-y-1">
            <h4 className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white">{t("sidebar.me")}</h4>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 opacity-50 cursor-not-allowed pointer-events-none"
                aria-disabled="true"
              >
                <Bookmark className="h-4 w-4" />
                <span className="flex-1">{t("sidebar.bookmarks")}</span>
              </a>
            </li>
            <li className="flex items-stretch space-x-1">
              <a
                className="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 opacity-50 cursor-not-allowed pointer-events-none"
                aria-disabled="true"
              >
                <Layers className="h-4 w-4" />
                <span className="flex-1">{t("sidebar.stack")}</span>
              </a>
            </li>
          </ul>

          <ul className="space-y-1">
            <h4 className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white">
              {t("sidebar.projects")}
            </h4>
            {projects.map((project) => (
              <li key={project.name} className="flex items-stretch space-x-1">
                <a
                  className="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="flex-1">{project.name}</span>
                  <ExternalLink className="h-3 w-3 text-black text-opacity-40 dark:text-white" />
                </a>
              </li>
            ))}
          </ul>

          <ul className="space-y-1">
            <h4 className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white">
              {t("sidebar.online")}
            </h4>
            {socialLinks.map((link) => (
              <li key={link.name} className="flex items-stretch space-x-1">
                <a
                  className="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="flex-1">{link.name}</span>
                  {link.handle && <span className="text-xs">{link.handle}</span>}
                  <ExternalLink className="h-3 w-3 text-black text-opacity-40 dark:text-white" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
