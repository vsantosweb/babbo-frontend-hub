// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Logo } from '@/components';
// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useForm } from 'react-hook-form';
import { FormHelperText, Stack } from '@mui/material';

import { CredentialsType } from '@/types';
import { useAuth } from '@/hooks';
import { FormErrorMessage } from '@chakra-ui/react';
interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })
  const [errorMessage, setErrorMessage] = useState(null);

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth()
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const submitCredentials = async (credentials: CredentialsType) => {

    await login(credentials).then((response: any) => {

      if (!response.success) {
        return setErrorMessage(response.message)
      }

    })

  }

  return (
    <Box className='content-center'>
      <Card sx={{ border: 'none' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)}` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo style={{ width: '160px' }} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bem-vindo ao {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Utilize o usário e senha fornecido pelo admin para acessar esta área</Typography>
          </Box>
          <Stack spacing={6} component={'form'} onSubmit={handleSubmit(submitCredentials)} autoComplete='off'>
            <TextField {...register('email')} autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} />

            <TextField
              type={values.showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                  </IconButton>
                </InputAdornment>,
              }}
              {...register('password')}
              fullWidth
              label="Senha"
              error={!!errors.ticket_partner_name}
            />
            {errorMessage && <FormHelperText style={{ color: 'red' }}>{errorMessage}</FormHelperText>}
            <Button
              disabled={isSubmitting}
              fullWidth
              type={'submit'}
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
            >
              Acessar
            </Button>


          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
