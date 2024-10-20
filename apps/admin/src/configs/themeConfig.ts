// ** MUI Imports
import { PaletteMode } from '@mui/material'

// ** Types
import { ContentWidth } from 'src/@core/layouts/types'

type ThemeConfig = {
  mode: PaletteMode
  templateName: string
  routingLoader: boolean
  disableRipple: boolean
  navigationSize: number
  menuTextTruncate: boolean
  contentWidth: ContentWidth
  responsiveFontSizes: boolean
  skin: 'default' | 'bordered'
}

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  templateName: 'Babbo Admin' /* App Name */,
  mode: 'light' /* light | dark */,
  contentWidth: 'full' /* full | boxed */,
  // ** Routing Configs
  routingLoader: true /* true | false */,
  skin: 'bordered',
  // ** Navigation (Menu) Configs
  menuTextTruncate: true /* true | false */,
  navigationSize: 260 /* Number in PX(Pixels) /*! Note: This is for Vertical navigation menu only */,

  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */
}

export default themeConfig
