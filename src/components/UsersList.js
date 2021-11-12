import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import '../styles/UsersList.css'
import CategorieUser from './CategorieUser'
import { UserList } from '../datas/userList'

export default function UsersList() {
    return (
        <div className="user__list">
            <div className="user__list__top">
                <h2># Général</h2>
            </div>
                <div className="user__list__top__icons">
                    <SettingsIcon />
                </div>
            <CategorieUser 
                categorieName="Online"
                UserList={UserList}
            />
        </div>   
    )
}

