import React from "react";
import '../Stylesheets/signin.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            errorMessage: false
        };
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        let response = await fetch("http://localhost:8080/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value})  
        });
        response = await response.json();
        if (!response.access)
        {
            this.setState({errorMessage: true});
            setTimeout(() => {this.setState({errorMessage: false})}, 5000);
        }
        else {
            window.sessionStorage.setItem("token", response.token);
            window.sessionStorage.setItem("user", response.user);
            window.location.reload(true);
        }
    }

    render() {
        return (
            <div className="SignIn">
                <div className="sign-in-button button" onClick={() => this.setState({show: !this.state.show})}> Sign In </div>
                { this.state.show && 
                
                    <form onSubmit={ (e) => { this.handleSubmit(e) } }>
                        <div className="form-container">
                            <div className="form-pair">
                                <label htmlFor="Username">Username</label>
                                <input type="text" id="Username" name="username"/>
                            </div>
                            <div className="form-pair">
                                <label htmlFor="Password">Password</label>
                                <input type="password" id="Password" name="password"/>
                            </div>
                            <button type="submit"> Sign In</button>
                            { this.state.errorMessage &&
                                <h1> Incorrect Credentials </h1>
                            }
                        </div>
                    </form>
                }
            </div>
        );
    }
}

export default SignIn;