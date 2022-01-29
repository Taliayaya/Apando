import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { StyledText, WaveJoin } from './JoinStyle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { styled } from '@material-ui/styles'
import { theme } from '../../utils/style/colors'
import {
    doc,
    query,
    collection,
    where,
    getDocs,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore'
import { db } from '../../utils/firebase/config'
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

const Join = () => {
    const [code, setCode] = useState('')
    const [serverName, setServerName] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const auth = getAuth()
    const user = auth.currentUser
    const handleCode = async (e) => {
        e.preventDefault()
        if (code.length > 0) {
            const serversRef = collection(db, 'servers')
            const q = query(
                serversRef,
                where('code', '==', code),
                where('name', '==', serverName)
            )
            const querySnapshot = await getDocs(q)
            let server = {}
            querySnapshot.forEach((doc) => {
                server = { id: doc.id, name: doc.data().name }
            })
            if (server.name) {
                const userDocRef = doc(db, 'users', user.uid)
                await updateDoc(userDocRef, {
                    servers: arrayUnion({ id: server.id, name: server.name }),
                })
                await updateDoc(userDocRef, {
                    serversid: arrayUnion(server.id),
                })
                navigate('/app')
            } else {
                setError('Oups, le code semble invalide')
            }
        }
    }
    return (
        <StyledLoginPage>
            <StyledHeaderTitle>Utilise ton code ici !</StyledHeaderTitle>
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
                <StyledText>
                    Dans le cadre de la beta, tu peux utiliser comme nom et code{' '}
                    <b>beta</b> pour rejoindre le serveur de la beta et obtenir
                    un avant-goût de Pando !
                </StyledText>
                {error && <StyleError>{error}</StyleError>}
                <StyledForm action="#">
                    <StyledField>
                        <StyledFieldInput
                            type="text"
                            name="serverName"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            required
                        />
                        <StyledFieldLabel htmlFor="mycode">
                            Entrer le nom du serveur
                        </StyledFieldLabel>
                    </StyledField>
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
                    <StyledField>
                        Pas de code ?{' '}
                        <StyleLink to="/create">Crée ton serveur</StyleLink>
                    </StyledField>
                </StyledForm>
            </StyledLoginWrapper>
            <WaveJoin />
        </StyledLoginPage>
    )
}

export default Join
