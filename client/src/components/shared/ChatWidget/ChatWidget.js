import React, { Component } from "react";
import io from "socket.io-client";
import { Panel, Row, Col } from 'react-bootstrap';
import jwt_decode from 'jwt-decode'

const titleStyle = {
    textAlign: "center"
}

const makeSticky = {
    position: 'fixed',
    bottom: 0,
    right: 5
}

class ChatWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            messages: [],
            isTyping: '',
            open: false,
            authors: []
        };

        const loginToken = window.localStorage.getItem("token");
        var decoded = jwt_decode(loginToken);
        

        // this.socket = io('https://sortpak-portal.herokuapp.com/');
        // this.socket = io('http://localhost:3001/');

       

        const addAuthor = data => {
            this.setState({ authors: [...this.state.authors, data] })
            console.log(this.state.authors)
        }


        let socketStatus;
        this.connectChat = data => {
            if(socketStatus === true) {
                this.socket.emit('RECEIVE_USER_DISCONNECTED', {
                    author: decoded.username,
                })

                //Cleanup code
                this.socket.off('RECIEVE_USER_TYPING')
                this.socket.off('RECIEVE_USER_STOP_TYPING')
                this.socket.off('RECEIVE_MESSAGE')
                //this.socket.off('RECEIVE_USER_DISCONNECTED')
                this.socket.off('RECEIVE_USER_CONNECTED')
                
                socketStatus = false
                return
            }
            this.socket.on('RECIEVE_USER_TYPING', function (message) {
                addIsTyping(message);
            });
    
            this.socket.on('RECIEVE_USER_STOP_TYPING', function (message) {
                console.log(message)
                removeIsTyping(message);
            });
            
            this.socket.on('RECEIVE_MESSAGE', function (data) {
                console.log(data)
                addAuthor(data.author);
                addMessage(data.message);
            });

            this.socket.on('RECEIVE_USER_DISCONNECTED', function (message) {
                console.log('asdfasdfasdg gaf sf af',message)
                addIsTyping(message);
            });
            
            this.socket.on('RECEIVE_USER_CONNECTED', function (message) {
                addIsTyping(message);
            });

            this.socket.emit('RECEIVE_USER_CONNECTED', {
                author: decoded.username,
            })

            

            socketStatus = true
        };
        
        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
            // this.setState({message: data})
            console.log('messages array', this.state.messages)
        };

        const addIsTyping = data => {
            this.setState({ isTyping: data })
        }
        
        const removeIsTyping = data => {
            this.setState({ isTyping: '' })
        }

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: decoded.username,
                message: this.state.message
            })
            this.setState({ message: '' });

        }
        let typing
        let lastTypingTime
        this.sendUserTpying = ev => {
            ev.preventDefault();
                if (!typing) {
                  typing = true
                  this.socket.emit('SEND_USER_TYPING', {
                    author: decoded.username
                  })
                }
                lastTypingTime = (new Date()).getTime();
          
                setTimeout(() => {
                  var typingTimer = (new Date()).getTime();
                  var timeDiff = typingTimer - lastTypingTime;
                  if (timeDiff >= 3000 && typing) {
                    this.socket.emit('SEND_USER_STOP_TYPING', {
                        author: decoded.username
                    });
                    typing = false;
                  }
                }, 3000);
        }
    }

    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        var decoded = jwt_decode(loginToken);
    
     this.setState({
      author: decoded.username
     })
    }

    render() {
    
        return (

            <Panel id="collapsible-panel-example-3" style={makeSticky}>

                <Panel.Collapse>
                    <Panel.Body>

                        <div className="messages">
                            {this.state.messages === null ? <div></div> :
                                this.state.messages.map((message, i) => {
                                    return (
                                        <div key={i}>{this.state.authors[i]}:   {message}</div>
                                    )
                                })}
                        </div>

                        <hr />
                        <div className="isTyping">
                                {this.state.isTyping}
                        </div>
                        {/* <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" /> */}
                        <textarea onKeyUp={this.sendUserTpying} type='text' placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                        <button onClick={this.sendMessage} className="btn btn-default form-control">Send</button>



                    </Panel.Body>
                </Panel.Collapse>
                <Panel.Heading>
                    <Panel.Title>
                        <Row style={{'display': 'flex'}}>
                            <Col md={2}><Panel.Toggle componentClass="a"><span onClick={this.connectChat} className="glyphicon glyphicon-chevron-up"></span></Panel.Toggle></Col>
                            <Col md={10}><h4 className='weather__value' style={titleStyle}>Chat</h4></Col>
                        </Row>


                    </Panel.Title>

                </Panel.Heading>
            </Panel>
        );
    }
}

export default ChatWidget;