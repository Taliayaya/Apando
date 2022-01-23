import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const IsAuthed = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return user
        } else {
            navigate('/login')
        }
    })
}

export default IsAuthed
