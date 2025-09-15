'use client'

import { useI18n } from '@/components/i18n-provider'

export function LanguageToggle() {
    const { locale, setLocale } = useI18n()

    return (
        <select
            aria-label="Select language"
            className="px-2 rounded-md border border-gray-200 bg-gray-100 text-sm dark:border-gray-800 dark:bg-gray-900"
            value={locale}
            onChange={(e) => setLocale(e.target.value as any)}
        >
            <option value="en">EN</option>
            <option value="ur">UR</option>
        </select>
    )
}
