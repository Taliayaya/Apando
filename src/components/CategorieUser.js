import React from 'react'


export default function CategorieUser({categorieName, UserList}) {
    console.log(UserList)
    return (
        <div className="user__list">
            
            <ul> {categorieName}
                {UserList.map(({id, user, online}) =>
                (<li key={id} >{user}, {(online) ? 'Connecté' : 'Hors-ligne'}</li>))}
            </ul>
        </div>
    )
}
