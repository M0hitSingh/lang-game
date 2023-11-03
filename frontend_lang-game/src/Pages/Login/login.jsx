import React, { Component } from 'react';
import './login.css'
import { login } from '../../server/services/auth/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleLogin = (e) => {
        e.preventDefault();
        // You can send a request to your backend API for authentication here
        const { username, password } = this.state;
        const data = {
            username:username,
            password:password
        }
        // Replace with your actual API endpoint and handling
        login(data)
            .then((res)=>{
                console.log(1,res);
                localStorage.setItem("user",JSON.stringify(res.data))
                localStorage.setItem("token",res.data.token)
            })
            .catch(error => {
                // Handle network or other errors
                console.log(error.response.data.message);
                toast.error(`${error.response.data.message} !`,{     // TODO Not Working
                    position:toast.POSITION.TOP_RIGHT
                })
                window.alert(`${error.response.data.message} !`)
            });
    }
    render() {
        return (
            <div className='container'>
                <div className='image-container'>
                </div>
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={this.handleLogin}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <div >
                        <p>Don’t have an account? <Link to="/signup">Create an account</Link> </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
