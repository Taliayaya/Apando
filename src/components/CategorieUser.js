import React from "react";

export default function CategorieUser({ UserList }) {
  const sortedUserList = UserList.sort((a, b) =>
    a.role > b.role ? 1 : -1
  ).sort((a, b) => (a.online === b.online ? 0 : a.online ? -1 : 1));
  let categorie = "";
  return (
    <div className="users__list">
      {sortedUserList.map(({ id, user, online, role }) =>
        categorie !== role && categorie !== "Offline" ? (
          ((categorie = !online ? "Offline" : role),
          (
            <>
              <h4 key={categorie} className="categorie">
                {categorie}
              </h4>
              <p key={id} className={online ? "online" : "offline"}>
                {user}
              </p>
            </>
          ))
        ) : (
          <p key={id} className={online ? "online" : "offline"}>
            {user}
          </p>
        )
      )}
    </div>
  );
}
