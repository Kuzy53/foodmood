import {
  useAppSelector,
  useAppDispatch, setUser, removeUser
} from '@/store'
import appConfig from '@/configs/app.config'
import {REDIRECT_URL_KEY} from '@/constants/app.constant'
import {useNavigate} from 'react-router-dom'
import {SignInCredential, SignUpCredential} from '@/@types/auth'
import {AuthService} from "@/services/auth/auth.service";
import useQuery from './useQuery'

type Status = 'success' | 'failed'

function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    user
  } = useAppSelector((state) => state.auth.user)

  const query = useQuery()

  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
    status: Status
    message: string
  }
    | undefined
  > => {
    try {
      const resp = await AuthService.signIn(values.email, values.password)

      if (resp?.response?.status !== 200) {
        alert('not sign in')
        return
      }

      const userResp = await AuthService.getMe()

      if (userResp?.response?.status !== 200) {
        alert('USER REST NOT')
        return
      }

      const { user: userApi } = userResp.payload
      dispatch(
        setUser(userApi)
      )

      console.log('user', userApi, user)
      const redirectUrl = query.get(REDIRECT_URL_KEY)
      navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
      return {
        status: 'success',
        message: ''
      }
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString()
      }
    }
  }

  const signUp = async (values: SignUpCredential) => {
    try {
      const res = await AuthService.signUp(values)

      // todo check
      if(res.status === 200){
        return {
          status: 'success',
          message: ''
        }
      }

      return {
        status: 'failed',
        message: ''
      }
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString()
      }
    }
  }

  const confirmEmail = async (values: { email: string, submit_code: string }) => {
    try {
      const {email, submit_code} = values
      const res = await AuthService.confirmEmail(submit_code, email)
      console.log('res', res)
      return {
        status: 'success',
        message: ''
      }
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString()
      }
    }
  }

  const signOut = async () => {
    dispatch(removeUser())
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  return {
    authenticated: !!user,
    signIn,
    signUp,
    confirmEmail,
    signOut,
  }
}

export default useAuth
