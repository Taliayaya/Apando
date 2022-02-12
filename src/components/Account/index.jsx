import { useAuth } from '../../utils/hooks'
import FileUploader from '../FileUploader'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import {
    StyledBody,
    StyledCompte,
    StyledField,
    Separator,
    StyledButton,
    StyledDangerousButton,
} from './AccountStyle'
import { styled } from '@material-ui/styles'
import { theme } from '../../utils/style/colors'
import { deleteUser, getAuth, updateProfile } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase/config'

const StyledExitToAppIcon = styled(ExitToAppIcon)(() => ({
    color: '#fff',
    backgroundColor: theme.chat_input_bg_color,
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
    const [selectedFile, setSelectedFile] = useState(null)
    const { logout, resetPassword } = useAuth()

    const navigate = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser
    const storage = getStorage()
    const [reset, setReset] = useState(null)
    const submitNewAvatar = async () => {
        const avatarRef = ref(storage, `avatars/${user.uid}`)
        uploadBytes(avatarRef, selectedFile).then(() => {
            getDownloadURL(avatarRef).then(async (url) => {
                updateProfile(user, {
                    photoURL: url,
                }).catch((error) => {
                    console.log('Il y a eu une erreur')
                })
                await updateDoc(doc(db, 'users', user.uid), {
                    'data.avatar': url,
                })

                setSelectedFile(null)
                setSuccess(true)
                setReset(Timestamp.fromDate(new Date()))
            })
        })
    }

    const handleDeleteAccount = () => {
        const deleteAccountAnswer = prompt(`${user.displayName},
        vous êtes sur le point de définitivement supprimer votre compte.
        Il sera parti pour de bon.

        Pour continuer la suppression, veuillez écrire CONFIRMER dans la boîte de dialogue.`)
        if (deleteAccountAnswer.toLowerCase() === 'confirmer') {
            deleteUser(user)
                .then(() => {
                    logout()
                })
                .catch((error) => {
                    console.log(
                        `Il semblerait que le destin ait produit l'erreur suivante : ${error.message} pour vous empêcher de nous quitter.`
                    )
                })
        }
    }

    const handleNavigateClick = (e) => {
        e.preventDefault()
        navigate('/app')
    }
    const handleNavigateEscape = (e) => {
        const keyCode = e.which || e.keyCode
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
                        <div id="pseudo">{user?.displayName}</div>
                        <StyledField>Adresse mail</StyledField>
                        <div id="mail">{user?.email}</div>
                    </div>
                </StyledCompte>
                <Separator />
                <StyledCompte>
                    <h1>Mot de passe</h1>
                    <StyledButton
                        onClick={() => resetPassword(auth, user.email)}
                    >
                        Changer le mot de passe
                    </StyledButton>
                    <StyledButton onClick={() => logout()}>
                        Déconnexion
                    </StyledButton>
                    <StyledDangerousButton
                        onClick={() => handleDeleteAccount()}
                    >
                        Supprimer le compte
                    </StyledDangerousButton>
                </StyledCompte>
            </div>
        </StyledBody>
    )
}

export default Account
