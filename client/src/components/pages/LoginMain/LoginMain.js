
import React from 'react'
import axios from 'axios'

import styles from './LoginMain.css'

import {
    ErrorMessage,
    FloatBox,
    Link,
    Button,
    Form,
  } from '../../common'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("/api/user/login",
            {
                user: this.state.user,
                password: this.state.password
            })
            .then((resp) => {
                window.localStorage.setItem("token", resp.data.token);
                window.location = '/scripts';
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        const {
            error,
            loading
        } = this.props
        return (
            <div className={styles.container}>
            <FloatBox classname={styles.floatBox} title="Login">
                <Form
                    className={styles.body}
                    onSubmit={this.handleSubmit}
                >          
                    <input name="user" placeholder="Username" type="text" value={this.state.value} onChange={this.handleChange} />
                    <input name="password" placeholder="Password" type="password" value={this.state.value} onChange={this.handleChange} />
                    
            <Button
              className="button"
              type="submit"
              title="Login"
              inactive={loading}
            />
            <ErrorMessage error={error}/>
            {/* <Link to="login/reset-password">Reset Password</Link> */}
          </Form>
        </FloatBox>
            </div>
        );
    }
}

export default Login;