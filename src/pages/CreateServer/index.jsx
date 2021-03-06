import { addDoc, collection, getDocs, where, query } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../utils/firebase/config'
import {
    StyledLoginWrapper,
    StyledForm,
    StyledLoginTitle,
    StyledFieldInput,
    StyledField,
    StyledFieldLabel,
    StyledSubmit,
    StyleError,
    StyleLink,
} from '../Login/LoginSignStyle'
import { StyledText, StyledTextarea } from './CreateServerStyle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { styled } from '@mui/system'
import { theme } from '../../utils/style/colors'
import { useNavigate } from 'react-router-dom'
import {
    createChannelListFromString,
    createServerStatsField,
    joinServer,
    writeUserRole,
} from '../../utils/function'
import { getAuth } from 'firebase/auth'
import Backgrounds from '../../components/Backgrounds'
import Header from '../../components/Header'
import { ThemeProvider } from 'styled-components'
import { useAuth } from '../../utils/hooks'

const StyledExitToAppIcon = styled(ExitToAppIcon)(() => ({
    color: '#fff',
    backgroundColor: theme.chat_input_bg_color,
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    left: '4em',
    top: '-2em',
    fontSize: 'large',
    zIndex: 999,
    borderRadius: 10,

    '&:hover': {
        opacity: 0.7,
        backgroundColor: '#17094f',
    },

    position: 'relative',
}))

/**
 * Verify that each channel name is no longer than 12 chr
 * Otherwise, it removes the last character of this name to match the size
 * @param {string} chr a string of channel name separated by \n
 * @returns the string of channel name with names no more longer than 12 chr
 */
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
        'G??n??ral\n\nHistoire-G??o\n\nAnglais\n\nES\n\nAutres'
    )
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const user = getAuth().currentUser
    const { themeUsed } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (serverName.trim().length > 0) {
            const serverRef = collection(db, 'servers')
            const q = query(serverRef, where('name', '==', serverName))
            const testIfNotExist = await getDocs(q)
            testIfNotExist.forEach((doc) => {
                if (doc.exists) {
                    setError('Un serveur ?? ce nom existe d??j??')
                }
            })
            try {
                const docRef = await addDoc(serverRef, {
                    name: serverName,
                    code: code,
                    domain: '',
                    jointype: 'auto',
                })
                await writeUserRole(user.uid, 'Owner', docRef.id)
                createChannelListFromString(channels, docRef.id)
                await createServerStatsField(docRef.id)
                await joinServer(user, {
                    name: serverName,
                    code: code,
                    domain: '',
                    jointype: 'auto',
                    id: docRef.id,
                })
                navigate('/app')
            } catch (error) {
                setError(
                    "Hmmm, il semblerait qu'il y a eu une erreur lors de la cr??ation du serveur"
                )
            }
        } else {
            setError('Oups, le nom de serveur est invalide')
        }
    }
    return (
        <ThemeProvider theme={themeUsed}>
            <Backgrounds sakura={true}>
                <Header />
                <StyledLoginWrapper>
                    <StyledLoginTitle>
                        <span style={{ marginLeft: '30px' }}>Mon serveur</span>
                        <StyledExitToAppIcon onClick={() => navigate('/app')} />
                    </StyledLoginTitle>
                    <StyledText>
                        Ici tu peux cr??er ton propre serveur en quelques clics
                        et vite inviter tes amis en partageant le code que tu as
                        cr???? toi m??me !
                    </StyledText>
                    {error && <StyleError>{error}</StyleError>}
                    <StyledForm action="#">
                        <StyledField>
                            <StyledFieldInput
                                type="text"
                                name="serverName"
                                value={serverName}
                                onChange={(e) => setServerName(e.target.value)}
                                maxLength={'12'}
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
                                Cr??er mon code
                            </StyledFieldLabel>
                        </StyledField>
                        <StyledText>
                            ??cris en-dessous, ligne par ligne, le nom des salons
                            que tu veux ajouter dans ton serveur. (Tu pourras en
                            cr??er d'autre depuis l'app)
                        </StyledText>
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

                        <StyledField>
                            <StyledSubmit
                                type="submit"
                                value="Cr??er"
                                onClick={(e) => handleSubmit(e)}
                            />
                        </StyledField>
                        <StyledField>
                            D??j?? un code ?{' '}
                            <StyleLink to="/join">
                                Rejoins un serveur !
                            </StyleLink>
                        </StyledField>
                    </StyledForm>
                </StyledLoginWrapper>
            </Backgrounds>
        </ThemeProvider>
    )
}
