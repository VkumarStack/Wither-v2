import React from "react";
import '../Stylesheets/createpost.css';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.getItem("user"),
            show: false,
            errorMessage: false
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        let response = await fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + "/posts/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({username: this.state.user, text: e.target.text.value})
        })
        response = await response.json();
        if (response.Error)
        {
            // If the user is logged in but their sign in token is bad (sign in token expires after 2 hours), log them out and reload the page
            if (response.TokenError)
            {
                sessionStorage.clear();
                window.location.reload(true);
            }
            else
            {
                // do not post 
                this.setState({errorMessage: response.Error});
                setTimeout(() => {this.setState({errorMessage: null})}, 20000);
            }
        }
        else
        {
            window.location.reload(true);
        }
    }

    textOnInvalid(e) {
        e.target.setCustomValidity("Post must be 1 to 280 characters in length");
    }

    textOnChange(e) {
        e.target.setCustomValidity("");
    }

    render() {
        return (
            <div className="CreatePost">
                <div className="create-post-button" onClick={() => this.setState({show: !this.state.show})}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </div>
                { this.state.show && 
                    <form onSubmit={ (e) => { this.handleSubmit(e) } }>
                        <div className="form-container">
                            <div className="form-pair">
                                <label htmlFor="Post"></label>
                                <textarea
                                    placeholder="What's happening?" 
                                    id="Text" 
                                    name="text"
                                    minLength="1"
                                    maxLength="280"
                                    onInvalid={this.textOnInvalid}
                                    onChange={this.textOnChange}
                                    required
                                />
                            </div>
                            <button type="send"> Send</button>
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
export default CreatePost;