import { Avatar } from "@material-ui/core"
import { useApi, useAuth, useData } from "../../utils/hooks"
import FileUploader from "../FileUploader"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowBack } from "@material-ui/icons"

const API_CHANGE_AVATAR = "http://localhost/project-plateforme-api/avatarUploader.php"


function Account() {
    const [success, setSuccess] = useState(false)
    const { userData, setuserData } = useData()
    const [selectedFile, setSelectedFile] = useState(null);
    const { sender } = useApi()
    const { logout } = useAuth()
    const submitNewAvatar = async (e) => {
        e.preventDefault()
        const avatarFormData = new FormData()
        avatarFormData.append("user_id", userData.id)
        avatarFormData.append("file", selectedFile)
        const sendAvatar = await sender(API_CHANGE_AVATAR, avatarFormData)
        if (sendAvatar?.done) {
            setSelectedFile(null)
            setSuccess(true)
            setuserData({ ...userData, avatar: sendAvatar?.avatarName })
        }

    }
    return (
        <div>
            <div className="compte">
                <h1>Mon compte</h1>
                <Link to="/app"><ArrowBack /></Link>
                <div>
                    <Avatar src={`http://localhost/project-plateforme-api/assets/images/avatars/${userData?.avatar}`} />
                    <div id="pseudo">{userData?.pseudo}</div>
                    <div id="mail">{userData?.mail}</div>
                </div>
            </div>
            <div className="password">
                <h1>Mot de passe</h1>
                <button>Changer le mot de passe</button>
                <button onClick={logout}>Logout</button>
                <button>Supprimer le compte</button>
            </div>
            <div>
                <h1>Avatar</h1>
                <div className="avatar-uploader">
                    <form action="#">
                        <FileUploader
                            onFileSelectSuccess={(file) => setSelectedFile(file)}
                            onFileSelectError={({ error }) => alert(error)}
                            selectedFile={selectedFile}
                            success={success}
                        />
                        <button onClick={(e) => submitNewAvatar(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Account

