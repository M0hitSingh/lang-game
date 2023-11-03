import React, { Component } from 'react';
import './signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


class Signup extends Component {
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

    handleSignup = (e) => {
        e.preventDefault();
        // You can send a request to your backend API for authentication here
        const { username,email, password } = this.state;
        // Replace with your actual API endpoint and handling
        fetch('https://api.spccare.in/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                name:username,
                email:email,
                password:password
            })
            // TODO change it to username
        })
        .then(response => response.json())
        .then(response => {
            if (response.message== 'success') {                            // TODO change it to boolean
                // Login successful, you can redirect the user to the dashboard or do other actions
                console.log(response.data);
            } else {
                // Handle authentication errors here
                toast.error(`${response.error.data} !`,{
                    position:toast.POSITION.TOP_RIGHT
                })
                window.alert(`${response.error.data}`)
                console.log(`${response.error.data}`);
            }
        })
        .catch(error => {
            // Handle network or other errors
            console.log(error);
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='image-container'>
                </div>
                <div className="signup-container">
                    <h2>Signup</h2>
                    <form onSubmit={this.handleSignup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={this.state.email}
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
                        <button type="submit">Signup</button>
                    </form>
                    <div >
                        <p>Alrady have an account? <Link to="/login">Login to your account</Link> </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
