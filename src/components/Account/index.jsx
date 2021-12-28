import { useApi, useAuth, useData } from '../../utils/hooks'
import FileUploader from '../FileUploader'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { API_CHANGE_AVATAR } from '../../utils/paths'
import {
    StyledBody,
    StyledCompte,
    StyledField,
    Separator,
    StyledButton,
    StyledDangerousButton,
} from './AccountStyle'
import { styled } from '@material-ui/styles'
import colors from '../../utils/style/colors'

const StyledExitToAppIcon = styled(ExitToAppIcon)(({ theme }) => ({
    color: '#fff',
    backgroundColor: colors.chat_input_bg_color,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    top: 30,
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

function Account() {
    const [success, setSuccess] = useState(false)
    const { userData, setuserData } = useData()
    const [selectedFile, setSelectedFile] = useState(null)
    const { sender } = useApi()
    const { logout } = useAuth()
    const navigate = useNavigate()

    const submitNewAvatar = async () => {
        const avatarFormData = new FormData()
        avatarFormData.append('user_id', userData.id)
        avatarFormData.append('file', selectedFile)
        avatarFormData.append('acate', userData?.avatar)
        const sendAvatar = await sender(API_CHANGE_AVATAR, avatarFormData)
        console.log(sendAvatar)
        if (sendAvatar?.done) {
            setSelectedFile(null)
            setSuccess(true)
            setuserData({ ...userData, avatar: '' })
            setuserData({ ...userData, avatar: sendAvatar?.avatarName })
        }
    }

    const handleNavigateClick = (e) => {
        e.preventDefault()
        navigate('/app')
    }
    const handleNavigateEscape = (e) => {
        const keyCode = e.which || e.keyCode
        console.log('test')
        if (keyCode === 27) {
            navigate('/app')
        }
    }

    if (selectedFile) {
        submitNewAvatar()
    }
    return (
        <StyledBody>
            <StyledExitToAppIcon
                onClick={(e) => handleNavigateClick(e)}
                onKeyDown={(e) => handleNavigateEscape(e)}
            />
            <div>
                <StyledCompte>
                    <h1>Mon compte</h1>

                    <div>
                        <FileUploader
                            onFileSelectSuccess={(file) =>
                                setSelectedFile(file)
                            }
                            onFileSelectError={({ error }) => alert(error)}
                            selectedFile={selectedFile}
                            success={success}
                        />
                        <StyledField>Nom d'utilisateur</StyledField>
                        <div id="pseudo">{userData?.pseudo}</div>
                        <StyledField>Adresse mail</StyledField>
                        <div id="mail">{userData?.mail}</div>
                    </div>
                </StyledCompte>
                <Separator />
                <StyledCompte>
                    <h1>Mot de passe</h1>
                    <StyledButton
                        onClick={() =>
                            alert('Fonctionnalité pas encore disponible')
                        }
                    >
                        Changer le mot de passe
                    </StyledButton>
                    <StyledButton onClick={() => logout()}>
                        Déconnexion
                    </StyledButton>
                    <StyledDangerousButton
                        onClick={() =>
                            alert('Fonctionnalité pas encore disponible')
                        }
                    >
                        Supprimer le compte
                    </StyledDangerousButton>
                </StyledCompte>
            </div>
        </StyledBody>
    )
}

export default Account
