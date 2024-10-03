import {
  faAddressCard, faBell, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBug,
  faCalculator,
  faChartPie,
  faCode,
  faDroplet,
  faGauge,
  faIndianRupeeSign,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
  faRupee,
  faRupeeSign,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        {dict.sidebar.items.dashboard}
        <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small>
      </SidebarNavItem>
      
      <SidebarNavTitle>{dict.sidebar.Finanace}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faRupee} toggleText={dict.sidebar.FinanaceGiven}>
        <SidebarNavItem href="#">{dict.sidebar.items.accordion}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.tooltips}</SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavGroup toggleIcon={faIndianRupeeSign} toggleText={dict.sidebar.FinanaceTaken}>
        <SidebarNavItem href="#">{dict.sidebar.items.accordion}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.tooltips}</SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavTitle>{dict.sidebar.items.patients}</SidebarNavTitle>
      <SidebarNavGroup toggleIcon={faPuzzlePiece} toggleText={dict.sidebar.items.patients}>
        <SidebarNavItem href="#">{dict.sidebar.items.accordion}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.tooltips}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faLocationArrow} toggleText={dict.sidebar.items.buttons}>
        <SidebarNavItem href="#">{dict.sidebar.items.dropdowns}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faChartPie} href="#">{dict.sidebar.items.charts}</SidebarNavItem>


      <SidebarNavTitle>{dict.sidebar.items.extras}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faStar} toggleText={dict.sidebar.items.pages}>
        <SidebarNavItem icon={faRightToBracket} href="login">{dict.sidebar.items.login}</SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="register">{dict.sidebar.items.register}</SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">{dict.sidebar.items.error404}</SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">{dict.sidebar.items.error500}</SidebarNavItem>
      </SidebarNavGroup>

    </ul>
  )
}
