import { ContainerUser, StyleCategorie } from './CategorieUserStyle'
import { useApi, useChannel } from '../../utils/hooks'
import { useEffect } from 'react'
import { API_LOAD_USERS } from '../../utils/paths'
import { useState } from 'react'

import UserStatus from '../UserStatus'

function CategorieUser() {
    const { sender } = useApi()
    const { currentServer } = useChannel()
    const [userList, setUserList] = useState([])

    // Initialisation de la liste des utilisateurs une première fois
    useEffect(() => {
        const usersList = async () => {
            if (userList.length === 0) {
                // On récupère ici la liste des utilisateurs présents dans le server
                const usersFormData = new FormData()
                usersFormData.append('id_server', currentServer)

                // API
                const loader = await sender(API_LOAD_USERS, usersFormData)
                if (loader?.loaded && loader?.users_list.length > 0) {
                    // On les trie en fonction de leur différente de temps
                    const userListSorted = loader.users_list.sort((a, b) =>
                        parseInt(a.datediff, 10) < parseInt(b.datediff) ? 1 : -1
                    )
                    setUserList(userListSorted)
                    console.log(userListSorted)
                }
            }
        }
        usersList()
    })

    // On récupère le status des utilisateurs toutes les 30s
    useEffect(() => {
        const usersListInterval = setInterval(async () => {
            // On récupre ici la liste des utilisateurs présents dans le server
            const usersFormData = new FormData()
            usersFormData.append('id_server', currentServer)

            // API
            const loader = await sender(API_LOAD_USERS, usersFormData)
            if (loader?.loaded && loader?.users_list.length > 0) {
                // On les trie en fonction de leur différente de temps
                const userListSorted = loader.users_list.sort((a, b) =>
                    parseInt(a.datediff, 10) < parseInt(b.datediff) ? 1 : -1
                )
                setUserList(userListSorted)
            }
            console.log('Récup des users done')
        }, 30000)
        return () => clearInterval(usersListInterval)
    })

    let previousOnline = false
    let previousOffline = false
    return (
        <ContainerUser>
            {userList.length > 0 &&
                userList.map(({ pseudo, id, datediff, avatar }) =>
                    // est ce que l'indice précédent était en ligne ?
                    // Oui -> on n'affiche pas la catégorie
                    previousOnline && datediff >= -5 ? (
                        <UserStatus
                            pseudo={pseudo}
                            datediff={datediff}
                            avatar={avatar}
                            logged="true"
                        />
                    ) : // Non -> on affiche la catégorie avec l'utilisateur
                    datediff >= -5 ? (
                        <div>
                            {(previousOnline = true)}
                            <StyleCategorie>En ligne</StyleCategorie>
                            <UserStatus
                                pseudo={pseudo}
                                datediff={datediff}
                                avatar={avatar}
                                logged="true"
                            />
                        </div>
                    ) : // est ce que l'indice précédent était offline ?
                    previousOffline ? (
                        // Oui -> on affiche seulement le pseudo
                        <UserStatus
                            pseudo={pseudo}
                            datediff={datediff}
                            avatar={avatar}
                        />
                    ) : (
                        // Non -> on affiche aussi la catégorie offline
                        <div key={id}>
                            {(previousOffline = true)}
                            <StyleCategorie>Hors-Ligne</StyleCategorie>
                            <UserStatus
                                pseudo={pseudo}
                                datediff={datediff}
                                avatar={avatar}
                            />
                        </div>
                    )
                )}
        </ContainerUser>
    )
}
export default CategorieUser
