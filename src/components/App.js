import React from "react";
import "../styles/App.css";
import ChannelList from "./ChannelList";
import Chat from "./Chat";
import Footer from "./Footer";
import Header from "./Header";
import LoginSignIn from "./LoginSignIn";
import UsersList from "./UsersList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      wantToSignIn: false,
    };
  }
  toggleOnline = () => {
    // Permet de mettre en ligne
    this.setState({ online: true });
  };

  render() {
    return (
      
      <div className="app">
        {console.log(this.state.wantToSignIn)}
        {this.state.online ? (
        
            <div>
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
    
        ) :
          <LoginSignIn online={this.state.online}
          toggleOnline={this.toggleOnline}/>
        }
      </div>
    );
  }
}

export default App;
