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
      currentChannel:null,
    };
  }
  toggleOnline = () => {
    // Permet de mettre en ligne
    this.setState({ online: true });
  };
  // Permet de changer entre les différents salons
  changeChannel = (e, id_channel) => {
    this.setState({currentChannel: id_channel})
    console.log(e.target, this.state.currentChannel, id_channel);
  }

  render() {
    return (
      
      <div className="app">
        {console.log(this.state.wantToSignIn)}
        {this.state.online ? (
        
            <div>
              <Header />
              <div className="structure">
                {/* CHANNEL LIST*/}
                <ChannelList currentChannel={this.state.currentChannel}
                changeChannel={this.changeChannel} />

                {/* CHAT */}
                <Chat currentChannel={this.state.currentChannel} />

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
