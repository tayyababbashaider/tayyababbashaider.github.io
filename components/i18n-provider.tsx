'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from '@/i18n/messages/en.json'
import ur from '@/i18n/messages/ur.json'

export type Locale = 'en' | 'ur'

// allow non-string values (arrays/objects) in messages
const messagesMap: Record<Locale, Record<string, any>> = { en, ur }
const rtlLocales: Locale[] = ['ur']

interface I18nContextValue {
    locale: Locale
    setLocale: (l: Locale) => void
    t: <T = any>(key: string) => T
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en')

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? (localStorage.getItem('locale') as Locale | null) : null
        if (stored && messagesMap[stored]) {
            setLocale(stored)
            return
        }
        if (typeof navigator !== 'undefined') {
            const nav = navigator.language.toLowerCase()
            if (nav.startsWith('ur')) setLocale('ur')
            else setLocale('en')
        }
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        localStorage.setItem('locale', locale)
        const html = document.documentElement
        html.setAttribute('lang', locale)
        html.setAttribute('dir', rtlLocales.includes(locale) ? 'rtl' : 'ltr')
    }, [locale])

    const t = useMemo(() => {
        const dict = messagesMap[locale]
        return <T = any>(key: string): T => (dict as any)[key] ?? (key as any)
    }, [locale])

    const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
    const ctx = useContext(I18nContext)
    if (!ctx) throw new Error('useI18n must be used within I18nProvider')
    return ctx
}
