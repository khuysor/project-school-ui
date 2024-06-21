
import { Navigate } from 'react-router-dom'
import { getTokenFromStorage } from '../util/auth'
import { routes } from './routes'

function Redirect() {
    const login = getTokenFromStorage()
    return (
        <Navigate to={login ? routes.dashboard : routes.login} replace={true} />
    )
}

export default Redirect