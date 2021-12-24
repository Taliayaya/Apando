import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi, useData } from '../../utils/hooks'
import { API_USE_CODE } from '../../utils/paths'

const Join = () => {
    const [code, setCode] = useState('')
    const { sender } = useApi()
    const { userData } = useData()
    const navigate = useNavigate()
    const handleCode = async (e) => {
        e.preventDefault()
        if (code.length > 0) {
            const codeFormData = new FormData()
            codeFormData.append('code', code)
            codeFormData.append('user_id', userData.id)
            const result = await sender(API_USE_CODE, codeFormData)
            console.log(result)
            result?.success && navigate('/app')
        }
    }
    return (
        <>
            <form action="#">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Entrer mon code"
                    required
                />
                <input type="submit" onClick={(e) => handleCode(e)} />
            </form>
        </>
    )
}

export default Join
