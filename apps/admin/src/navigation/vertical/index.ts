// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import Account from 'mdi-material-ui/Account'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { IoMdList } from 'react-icons/io'
import { RiCalendarEventFill } from "react-icons/ri";

import { MdCalendarMonth, MdEventNote } from "react-icons/md";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Organizadores',
      icon: AccountOutline,
      path: '/organizers'
    },
    {
      title: 'Eventos',
      icon:  RiCalendarEventFill,
      path: '/events'
    },
    {
      title: 'Leads capturados',
      icon: IoMdList,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Configurações'
    },
    {
      title: 'Jobs',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Logs',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
  ]
}

export default navigation
