import { useAuth } from '../../utils/hooks'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function RequireAuth() {
    const { authed } = useAuth()
    const location = useLocation()

    if (!authed) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default RequireAuth
