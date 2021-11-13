import React from "react";
import "../styles/App.css";
import ChannelList from "./ChannelList";
import Chat from "./Chat";
import Footer from "./Footer";
import Header from "./Header";
import UsersList from "./UsersList";

function App() {
  return (
    <div className="app">
      {/* HEADER */}
      <Header />
      <div className="structure">
        {/* CHANNEL LIST*/}
        <ChannelList />

        {/* CHAT */}
        <Chat />

        {/* USERS LIST */}
        <UsersList />
      </div>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
