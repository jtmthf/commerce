import '@assets/main.css'

import { CheckoutProvider } from '@components/checkout/context'
import { Footer, Navbar } from '@components/common'
import { Button, LoadingDots } from '@components/ui'
import { CommerceProvider } from '@framework'
// import commerce from '@lib/api/commerce'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import s from './layout.module.css'

import type { Page } from '@commerce/types/page'
import type { Category } from '@commerce/types/site'
import SidebarUI from './sidebar-ui'
import ModalUI from './modal-ui'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: Loading,
}

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ...dynamicProps,
})

interface Props {
  pageProps: {
    pages?: Page[]
    categories: Category[]
  }
  lang: string
  children?: React.ReactNode
}

type Params = {
  lang: string
}

const Layout: React.FC<Props> = ({
  children,
  lang,
  pageProps: { categories = [], ...pageProps },
}) => {
  // const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const navBarlinks = categories.slice(0, 2).map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }))

  return (
    <CommerceProvider locale={lang}>
      <div className={cn(s.root)}>
        <Navbar links={navBarlinks} />
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />
        <ModalUI />
        <CheckoutProvider>
          <SidebarUI links={navBarlinks} />
        </CheckoutProvider>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={true}
          action={
            <Button className="mx-5" /* onClick={() => onAcceptCookies()} */>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Params
}) {
  // const [{ pages }, { categories }] = await Promise.all([
  //   commerce.getAllPages(),
  //   commerce.getSiteInfo(),
  // ])

  return (
    <html lang={params.lang}>
      <body>
        <Layout pageProps={{ categories: [] }} lang={params.lang}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
