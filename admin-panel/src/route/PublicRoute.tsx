import { Navigate, Outlet } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'
import useUserStore from "@/store/main/UserStore";

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
  const {isAuth: authenticated} = useUserStore()

  return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
