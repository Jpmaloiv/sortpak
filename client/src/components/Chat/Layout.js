import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'

// const socketUrl = "http://localhost:3000"
const socketUrl = "https://sortpak-portal.herokuapp.com/"


export default class Layout extends Component {

	constructor(props) {
		super(props);

		this.state = {
			socket: null,
			user: null
		};
	}

	componentWillMount() {
		this.initSocket()
	}

	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = () => {
		const socket = io(socketUrl)

		socket.on('connect', () => {
			console.log("Connected");
		})

		this.setState({ socket })
	}

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/
	setUser = (user) => {
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user);
		this.setState({ user })
	}

	/*
	*	Sets the user property in state to null.
	*/
	logout = () => {
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({ user: null })

	}


	render() {
		const { socket, user } = this.state
		return (
			<div>
				{!user ?
					<div className="login-container">
						<LoginForm socket={socket} setUser={this.setUser} />
					</div>
					:
					<div className="chat-container">
						<ChatContainer socket={socket} user={user} logout={this.logout} />
					</div>
				}
			</div>
		);
	}
}
