'use client'

import CartSidebarView from '@components/cart/CartSidebarView'
import CheckoutSidebarView from '@components/checkout/CheckoutSidebarView'
import PaymentMethodView from '@components/checkout/PaymentMethodView'
import ShippingView from '@components/checkout/ShippingView'
import { MenuSidebarView } from '@components/common/UserNav'
import { Sidebar, useUI } from '@components/ui'

import type { Link as LinkProps } from '@components/common/UserNav/MenuSidebarView'

const SidebarView: React.FC<{
  sidebarView: string
  closeSidebar(): any
  links: LinkProps[]
}> = ({ sidebarView, closeSidebar, links }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === 'CART_VIEW' && <CartSidebarView />}
      {sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
      {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
      {sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />}
      {sidebarView === 'MOBILE_MENU_VIEW' && <MenuSidebarView links={links} />}
    </Sidebar>
  )
}

const SidebarUI: React.FC<{ links: LinkProps[] }> = ({ links }) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI()
  return displaySidebar ? (
    <SidebarView
      links={links}
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
    />
  ) : null
}

export default SidebarUI
