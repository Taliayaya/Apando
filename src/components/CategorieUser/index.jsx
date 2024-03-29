import { ContainerUser, StyleCategorie } from './/CategorieUserStyle'
import { useChannel } from '../../utils/hooks'
import { useEffect } from 'react'

import UserStatus from '../UserStatus'
import {
    collection,
    getDocs,
    query,
    Timestamp,
    where,
} from 'firebase/firestore'
import { db } from '../../utils/firebase/config'
import Server from '../../utils/server'

function CategorieUser() {
    const { currentServer, userList, setUserList } = useChannel()

    // Initialisation de la liste des utilisateurs une première fois
    useEffect(() => {
        const usersList = async () => {
            if (userList.length === 0 && currentServer?.id) {
                // On récupère ici la liste des utilisateurs présents dans le server
                const queryUserList = await Server.getUserList(currentServer)

                if (queryUserList?.length > 0) {
                    // On les trie en fonction de leur différente de temps
                    const userListSorted = queryUserList.sort((a, b) => {
                        return b.data.lastLogin - a.data.lastLogin
                    })
                    setUserList(userListSorted)
                }
            }
        }
        usersList()
    })

    // On récupère le status des utilisateurs toutes les 30s
    useEffect(() => {
        const usersListInterval = setInterval(async () => {
            // On récupère ici la liste des utilisateurs présents dans le server
            const queryUserList = await Server.getUserList(currentServer)
            if (queryUserList?.length > 0) {
                // On les trie en fonction de leur différente de temps
                const userListSorted = queryUserList.sort((a, b) => {
                    return b.data.lastLogin - a.data.lastLogin
                })
                setUserList(userListSorted)
            }
        }, 30000)
        return () => clearInterval(usersListInterval)
    })

    let previousOnline = false
    let previousOffline = false
    return (
        <ContainerUser>
            {userList.length > 0 &&
                userList.map(({ id, data }) => {
                    // est ce que l'indice précédent était en ligne ?
                    // Oui -> on n'affiche pas la catégorie
                    let lastLogin =
                        Timestamp.fromDate(new Date()) - data.lastLogin
                    return previousOnline && lastLogin <= 120 ? (
                        <UserStatus
                            name={data.name}
                            datediff={lastLogin}
                            avatar={data.avatar}
                            logged="true"
                            key={id}
                            uid={id}
                        />
                    ) : // Non -> on affiche la catégorie avec l'utilisateur
                    lastLogin <= 120 ? (
                        <div key={id}>
                            {(previousOnline = true)}
                            <StyleCategorie>En ligne</StyleCategorie>
                            <UserStatus
                                name={data.name}
                                datediff={lastLogin}
                                avatar={data.avatar}
                                logged="true"
                                uid={id}
                                key={id}
                            />
                        </div>
                    ) : // est ce que l'indice précédent était offline ?
                    previousOffline ? (
                        // Oui -> on affiche seulement le name
                        <UserStatus
                            name={data.name}
                            datediff={lastLogin}
                            avatar={data.avatar}
                            key={id}
                            uid={id}
                        />
                    ) : (
                        // Non -> on affiche aussi la catégorie offline
                        <div key={id}>
                            {(previousOffline = true)}
                            <StyleCategorie>Hors-Ligne</StyleCategorie>
                            <UserStatus
                                name={data.name}
                                datediff={lastLogin}
                                avatar={data.avatar}
                                uid={id}
                                key={id}
                            />
                        </div>
                    )
                })}
        </ContainerUser>
    )
}
export default CategorieUser
