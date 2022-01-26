import { addDoc, collection, getDocs, where, query } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../utils/firebase/config'
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
    StyleLink,
} from '../../utils/style/LoginSignStyle'
import { StyledText, WaveJoin, StyledTextarea } from './CreateServerStyle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { styled } from '@material-ui/styles'
import { theme } from '../../utils/style/colors'
import { useNavigate } from 'react-router-dom'
import {
    createChannelListFromString,
    writeUserRole,
} from '../../utils/function'
import { getAuth } from 'firebase/auth'

const StyledExitToAppIcon = styled(ExitToAppIcon)(() => ({
    color: '#fff',
    backgroundColor: theme.chat_input_bg_color,
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

const handleServerNameTyping = (chr) => {
    /** Vérifie que le nom donné ne soit pas vide
     * ou supérieur à 12 caractères
     * Sinon empêche de taper le caractère
     */
    const pattern = /^.{0,12}$/g
    if (pattern.test(chr)) {
        return chr
    }
    return chr.slice(0, -1)
}

const handleChannelListTyping = (chr) => {
    const pattern = /^.{0,12}$/g
    const words = chr.split('\n')
    for (let i = 0; i < words.length; i++) {
        if (!pattern.test(words[i])) {
            words[i] = words[i].slice(0, -1)
        }
    }
    return words.join('\n')
}
export default function CreateServer() {
    const [serverName, setServerName] = useState('')
    const [code, setCode] = useState('')
    const [channels, setChannels] = useState(
        'Général\n\nHistoire-Géo\n\nAnglais\n\nES\n\nAutres'
    )
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const user = getAuth().currentUser

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (serverName.trim().length > 0) {
            const serverRef = collection(db, 'servers')
            const q = query(serverRef, where('name', '==', serverName))
            const testIfNotExist = await getDocs(q)
            testIfNotExist.forEach((doc) => {
                if (doc.exists) {
                    setError('Un serveur à ce nom existe déjà')
                }
            })
            const docRef = await addDoc(serverRef, {
                name: serverName,
                code: code,
            })
            writeUserRole(user.uid, 'Owner', docRef.id)
            try {
                createChannelListFromString(channels, docRef.id)
                navigate('/app')
            } catch (error) {
                setError(
                    "Hmmm, il semblerait qu'il y a eu une erreur lors de la création du serveur"
                )
            }
        } else {
            setError('Oups, le nom de serveur est invalide')
        }
    }
    return (
        <StyledLoginPage>
            <StyledHeaderTitle>
                Crée rapidement ton serveur ici !
            </StyledHeaderTitle>
            <StyledExitToAppIcon onClick={() => navigate('/app')} />
            <StyledLoginWrapper>
                <StyledLoginTitle>Mon serveur</StyledLoginTitle>
                <StyledText>
                    Ici tu peux créer ton propre serveur en quelques clics et
                    vite inviter tes amis en partageant le code que tu as créé
                    toi même ! `
                </StyledText>
                {error && <StyleError>{error}</StyleError>}
                <StyledForm action="#">
                    <StyledField>
                        <StyledFieldInput
                            type="text"
                            name="serverName"
                            value={serverName}
                            onChange={(e) =>
                                setServerName(
                                    handleServerNameTyping(e.target.value)
                                )
                            }
                            required
                        />
                        <StyledFieldLabel htmlFor="serverName">
                            Nom de mon serveur
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField>
                        <StyledFieldInput
                            type="text"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                        <StyledFieldLabel htmlFor="code">
                            Créer mon code
                        </StyledFieldLabel>
                    </StyledField>
                    <StyledField style={{ paddingBottom: '20px' }}>
                        <StyledText>
                            Écris en-dessous, ligne par ligne, le nom des salons
                            que tu veux ajouter dans ton serveur. (Tu pourras en
                            créer d'autre depuis l'app)
                        </StyledText>
                    </StyledField>
                    <StyledField style={{ paddingBottom: '60px' }}>
                        <StyledTextarea
                            name="channels"
                            cols={12}
                            onChange={(e) =>
                                setChannels(
                                    handleChannelListTyping(e.target.value)
                                )
                            }
                            value={channels}
                        ></StyledTextarea>
                    </StyledField>

                    <StyledField>
                        <StyledSubmit
                            type="submit"
                            value="Créer"
                            onClick={(e) => handleSubmit(e)}
                        />
                    </StyledField>
                    <StyledField>
                        Déjà un code ?{' '}
                        <StyleLink to="/join">Rejoins un serveur !</StyleLink>
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
            <WaveJoin />
        </StyledLoginPage>
    )
}
