import React, { Component } from 'react';
import { FaChevronDown } from 'react-icons/fa'
// import { FaMenu } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { MdEject } from 'react-icons/md'
import SideBarOption from './SidebarOption'
import { last, get, differenceBy } from 'lodash'
import { createChatNameFromUsers } from '../../Factories'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


export default class SideBar extends Component {
	static type = {
		USERS: "users",
		CHATS: "chats"
	}
	constructor(props) {
		super(props)
		this.state = {
			reciever: "",
			activeSideBar: SideBar.type.CHATS,
			filtered: false
		}
		
	}

	componentDidMount() {
		const loginToken = window.localStorage.getItem("token");
		if (loginToken) {
			var decoded = jwt_decode(loginToken);
			axios.get('/api/user/search?userId=' + decoded.id, { headers: { "Authorization": "Bearer " + loginToken } })
				.then((resp) => {
					this.setState({
						nickname: resp.data.response[0].name,
						role: resp.data.response[0].role
					});
				}).catch((error) => {
					console.error(error);
				})
		} else {
			return;
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { reciever } = this.state
		const { onSendPrivateMessage } = this.props

		onSendPrivateMessage(reciever)
		this.setState({ reciever: "" })
	}

	addChatForUser = (reciever) => {
		console.log(this.props, this.state);
		this.props.onSendPrivateMessage(reciever)
		this.setActiveSideBar(SideBar.type.CHATS)
	}

	setActiveSideBar = (type) => {
		console.log(type)
		this.setState({ activeSideBar: type })
	}

	render() {

		const { chats, activeChat, user, setActiveChat, logout, users } = this.props
		const { reciever, activeSideBar, filteredUsers } = this.state

		if ((this.state.role === 'Physician')  && (this.state.filtered === false)) {
			const filteredU = users.filter(function (event) {
				return event.role === (("Admin") || ("Rep"));
			});
			this.setState({
				filteredUsers: filteredU,
				filtered: true
			})
		} else if ((this.state.role === (("Admin") || ("Rep")) && (this.state.filtered === false))) {
			this.setState({
				filteredUsers: users,
				filtered: true
			})
		}


		return (
			<div id="side-bar">
				<div className="heading">
					<div className="app-name">SortPak Chat <FaChevronDown /></div>
					<div className="menu">
						{/* <FaMenu /> */}
					</div>
				</div>
				<form onSubmit={this.handleSubmit} className="search">
					<i className="search-icon"><FaSearch style={{ marginTop: 10 }} /></i>
					<input
						placeholder="Search"
						type="text"
						value={reciever}
						onChange={(e) => { this.setState({ reciever: e.target.value }) }} />
					<div style={{ marginTop: 10 }} className="plus"></div>
				</form>
				<div className="side-bar-select">
					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.CHATS) }}
						className={`side-bar-select__option ${activeSideBar === SideBar.type.CHATS ? 'active' : ''}`}>
						<span>Chats</span>
					</div>
					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.USERS) }}
						className={`side-bar-select__option ${activeSideBar === SideBar.type.USERS ? 'active' : ''}`}>
						<span>Users</span>
					</div>
				</div>
				<div
					className="users"
					ref='users'
					onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>

					{
						activeSideBar === SideBar.type.CHATS ?
							chats.map((chat) => {
								return (
									<SideBarOption
										key={chat.id}
										lastMessage={get(last(chat.messages), 'message', '')}
										name={chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
										active={activeChat.id === chat.id}
										onClick={() => { this.props.setActiveChat(chat) }}
									/>
								)
							})

							:
							differenceBy(filteredUsers, [user], 'name').map((user) => {
								console.log(filteredUsers)
								return <SideBarOption
									key={user.id}
									name={user.name}
									onClick={() => { this.addChatForUser(user.name) }}
								/>
							})
					}
				</div>
				<div className="current-user">
					<span>{user.name}</span>
					<div onClick={() => { logout() }} title="Logout" className="logout">
						<MdEject />
					</div>
				</div>
			</div>
		);

	}
}
