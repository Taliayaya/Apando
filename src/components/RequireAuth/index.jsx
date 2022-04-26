import { useAuth } from '../../utils/hooks'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function RequireAuth({ children }) {
    const { authed } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    !authed && navigate('/login')

    return children
}
export default RequireAuth
