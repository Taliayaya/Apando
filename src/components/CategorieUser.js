import React from 'react'


export default function CategorieUser({UserList}) {
    const sortedUserList = UserList.sort((a,b) => a.role>b.role ? 1 : -1);
    let categorie = '';
    return (
        <div className="user__list">
            
            {sortedUserList.map(({id, user, online, role}) => 
            
            (categorie!==role ?
            (categorie=role,
            <>
            <h4 key={role} className="categorie">{role}</h4>
            <p key={id} className={online? "online":"offline"}>{user}</p></>)
            : <p key={id} className={online? "online":"offline"}>{user}</p>))
            }
            
        </div>
    )
}
