import React, { Component } from 'react';
import '../styles/Chat.css';
import Message from './Message';
import { AddCircle } from '@material-ui/icons';

class Chat extends Component {
    handleSubmit(e) {
        e.preventDefault()    
    }
    render() {
        return (
            <div className="chat">
                {/* Chat Header ? */}
                <div className="chat__messages">
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                </div>

                <div className="chat__input">
                    <AddCircle fontSize="large"/>
                    <form>
                        <input placeholder={`Ecrivez à tous`} type="text"/>
                        <button className="chat__inputButton" onClick={(e)=>this.handleSubmit(e)}type="submit">
                            Envoyer
                        </button>
                    </form>

                </div>
            </div>
        );
    }
}

export default Chat;