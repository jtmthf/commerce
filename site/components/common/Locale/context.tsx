'use client'

import { createContext, ReactNode, useContext, useMemo } from 'react'

export type State = {
  locale: string
  locales: string[]
  defaultLocale: string
}

export const locales = ['en-US', 'es-US']
export const defaultLocale = 'en-US'

const initialState: State = {
  locale: defaultLocale,
  locales,
  defaultLocale,
}

export const LocaleContext = createContext<State>(initialState)

LocaleContext.displayName = 'LocaleContext'

type Props = {
  children?: ReactNode
  locale: string
}

export function LocaleProvider({ children, locale }: Props) {
  const value = useMemo(
    () => ({
      ...initialState,
      locale,
    }),
    [locale]
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
