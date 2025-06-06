import {lazy} from 'react'
import type {Routes} from '@/@types/routes'

const authRoute: Routes = [
  {
    key: 'signIn',
    path: `/sign-in`,
    component: lazy(() => import('@/pages/auth/SignIn')),
    authority: []
  },
  {
    key: 'forgot',
    path: `/forgot`,
    component: lazy(() => import('@/pages/auth/ForgotPassword')),
    authority: []
  },
  {
    key: 'signUp',
    path: `/sign-up`,
    component: lazy(() => import('@/pages/auth/SignUp')),
    authority: []
  },
  {
    key: 'confirmPass',
    path: `/confirm-pass`,
    component: lazy(() => import('@/pages/auth/ConfirmPassword')),
    authority: []
  },
  {
    key: 'logout',
    path: `/logout`,
    component: lazy(() => import('@/pages/auth/Logout')),
    authority: []
  },
]

export default authRoute
