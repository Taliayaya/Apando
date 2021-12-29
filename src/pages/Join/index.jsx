import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi, useData } from '../../utils/hooks'
import { API_USE_CODE } from '../../utils/paths'
import {
    StyledLoginWrapper,
    StyledLoginPage,
    StyledForm,
    StyledLoginTitle,
    StyledHeaderTitle,
    StyledFieldInput,
    StyledField,
    StyledFieldLabel,
    StyledSubmit,
    StyleError,
} from '../../utils/style/LoginSignStyle'
import { StyledText, WaveJoin } from './JoinStyle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { styled } from '@material-ui/styles'
import colors from '../../utils/style/colors'
const StyledExitToAppIcon = styled(ExitToAppIcon)(({ theme }) => ({
    color: '#fff',
    backgroundColor: colors.chat_input_bg_color,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    top: 50,
    right: -200,
    fontSize: 'large',
    zIndex: 999,
    borderRadius: 10,

    '&:hover': {
        opacity: 0.7,
        backgroundColor: '#17094f',
    },

    position: 'relative',
}))

const Join = () => {
    const [code, setCode] = useState('')
    const { sender } = useApi()
    const { userData } = useData()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const handleCode = async (e) => {
        e.preventDefault()
        if (code.length > 0) {
            const codeFormData = new FormData()
            codeFormData.append('code', code)
            codeFormData.append('user_id', userData.id)
            const result = await sender(API_USE_CODE, codeFormData)
            console.log(result)
            result?.success
                ? navigate('/app')
                : setError('Oups, le code semble invalide')
        }
    }
    return (
        <StyledLoginPage>
            <StyledHeaderTitle>Utilise ton code ici</StyledHeaderTitle>
            <StyledExitToAppIcon onClick={() => navigate('/app')} />
            <StyledLoginWrapper>
                <StyledLoginTitle>Mon code</StyledLoginTitle>
                <StyledText>
                    Ici tu peux rentrer le code que ton enseignant(e), ton
                    ami(e) ou tes camarades t'ont donné.
                </StyledText>
                <StyledText>
                    Courage c'est la dernière étape avant de les rejoindre !
                </StyledText>
                {error && <StyleError>{error}</StyleError>}
                <StyledForm action="#">
                    <StyledField>
                        <StyledFieldInput
                            type="text"
                            name="mycode"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                        <StyledFieldLabel htmlFor="mycode">
                            Entrer mon code
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledSubmit
                            type="submit"
                            onClick={(e) => handleCode(e)}
                        />
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
            <WaveJoin />
        </StyledLoginPage>
    )
}

export default Join
