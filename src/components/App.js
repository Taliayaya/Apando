import React from "react";
import "../styles/App.css";
import ChannelList from "./ChannelList";
import Chat from "./Chat";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import SignIn from "./SignIn";
import UsersList from "./UsersList";

class App extends Component {
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
  toggleSignIn = () => {
    // Permet d'active le form de signin
    this.setState({ wantToSignIn: !this.state.wantToSignIn });
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
    
        ) : (!this.state.wantToSignIn ?
          <Login
              online={this.state.online}
              toggleOnline={this.toggleOnline}
              toggleSignIn={this.toggleSignIn}
            /> : <SignIn />
          ) 
        }
      </div>
    );
  }
}

export default App;
