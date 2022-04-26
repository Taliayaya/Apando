import { useAuth } from '../../utils/hooks'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }) {
    const { authed } = useAuth()
    const location = useLocation()

    return authed ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth
