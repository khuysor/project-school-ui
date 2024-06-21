
import { Navigate, useLocation } from 'react-router-dom'
import { routes } from './routes'
import { getTokenFromStorage } from '../util/auth'
import { ReactNode } from 'react'

interface Prop {
    children: ReactNode
}
const RequireAuth = ({ children }: Prop) => {
    const location = useLocation()

    const admin = getTokenFromStorage();
    if (!admin) {
        return <Navigate to={routes.login} state={{ from: location }} replace />
    }
    return children;


}

export default RequireAuth