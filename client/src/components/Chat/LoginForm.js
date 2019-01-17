import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nickname: "",
			error: ""
		};
	}

	componentDidMount() {
		const loginToken = window.localStorage.getItem("token");
		if (loginToken) {
			var decoded = jwt_decode(loginToken);
			axios.get('/api/user/search?userId=' + decoded.id, { headers: { "Authorization": "Bearer " + loginToken } })
				.then((resp) => {
					this.setState({
						nickname: resp.data.response[0].name,
					});
				}).catch((error) => {
					console.error(error);
				})
		} else {
			return;
		}
	}


	setUser = ({ user, isUser }) => {

		if (isUser) {
			this.setError("User name taken")
		} else {
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	handleChange = (e) => {
		this.setState({ nickname: e.target.value })
	}

	setError = (error) => {
		this.setState({ error })
	}

	render() {
		const { nickname, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						<h2 style={{'cursor': 'pointer', fontSize: 20, color: '#fff', textAlign: 'center'}} onClick={this.handleSubmit}>Chat&nbsp;<i className="fa fa-caret-up"></i></h2>
					</label>
					{/* <input
						ref={(input) => { this.textInput = input }}
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={this.state.name}
					/> */}
					<div className="error">{error ? error : null}</div>

				</form>
			</div>
		);
	}
}
