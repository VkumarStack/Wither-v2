import React from "react";
import '../Stylesheets/register.css';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            errorMessage: null,
        };
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
    }

    async handleSubmit(e) {
        e.preventDefault();
        let response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value})
        })
        response = await response.json();
        if (response.Error)
        {
            this.setState({errorMessage: response.Error});
            setTimeout(() => {this.setState({errorMessage: null})}, 20000);
        }
        else
        {
            window.sessionStorage.setItem("token", response.token);
            window.sessionStorage.setItem("user", response.a_username);
            window.location.reload(true);
        }
    }

    usernameOnInvalid(e) {
        e.target.setCustomValidity("Usernames must contain only alphabetical characters, digits, or underscores and must begin with an alphabetical character");
    }

    usernameOnChange(e) {
        e.target.setCustomValidity("");
    }

    passwordOnInvalid(e) {
        e.target.setCustomValidity("Password must be at least eight characters and must contain at least one alphabetical character, one digit, and one special character");
    }

    passwordOnChange(e) {
        if (e.target.value !== this.confirmPasswordRef.current.value)
            this.confirmPasswordRef.current.setCustomValidity("Passwords must match");
        else
            this.confirmPasswordRef.current.setCustomValidity("");
        e.target.setCustomValidity("");
    }

    confirmPasswordOnChange(e) {
        if (e.target.value !== this.passwordRef.current.value)
            e.target.setCustomValidity("Passwords must match");
        else
            e.target.setCustomValidity("");
    }

    render() {
        return (
            <div className="Register">
                <div className="register-button button" onClick={() => this.setState({show: !this.state.show})}> Register </div>
                {   this.state.show &&
                        <form onSubmit={ (e) => {this.handleSubmit(e)}}>
                            <div className="form-container">
                                <div className="form-pair">
                                    <label htmlFor="Username">Username</label>
                                    <input type="text" id="Username" name="username"
                                    minLength="3" maxLength="15"
                                    pattern="[A-Za-z][A-Za-z0-9_]{2,14}"
                                    onInvalid={this.usernameOnInvalid}
                                    onChange={this.usernameOnChange}
                                    required/>
                                </div>
                                <div className="form-pair">
                                    <label htmlFor="Password"> Password </label>
                                    <input type="password" id="Password" name="password"
                                    minLength="8" maxLength="128"
                                    pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,128}"
                                    onInvalid={this.passwordOnInvalid}
                                    onChange={this.passwordOnChange.bind(this)}
                                    ref={this.passwordRef}
                                    required/>
                                </div>
                                <div className="form-pair">
                                    <label htmlFor="Confirm-Password"> Confirm Password </label>
                                    <input type="password" id="Confirm-Password" name="confirm-password"
                                    minLength="8" maxLength="128"
                                    onChange={this.confirmPasswordOnChange.bind(this)}
                                    ref={this.confirmPasswordRef}
                                    required/>
                                </div>
                                <button type="submit"> Register </button>
                                {   (this.state.errorMessage !== null) &&
                                        <h1> {this.state.errorMessage} </h1>
                                }
                            </div>
                        </form>
                }
            </div>
        );
    }
}

export default Register;