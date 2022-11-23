import React from "react";
import '../Stylesheets/editbio.css';

class EditBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.getItem("user"),
            show: false,
            errorMessage: false
        };
    }

    async handleSubmit(e) {
        if (this.state.user === null)
            return;
        e.preventDefault();
        let response = await fetch(`http://localhost:8080/users/${this.state.user}/bio`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({username: this.state.user, bio: e.target.bio.value})
        })
        response = await response.json();
        console.log(response);
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
            // This is altering the parent component's (Profile) state, which causes it to re-render the UserInfo 
            // component with the new bio
            this.props.changeBio(response.bio);
        }
    }

    textOnInvalid(e) {
        e.target.setCustomValidity("Bio must be 0 to 250 characters in length");
    }

    textOnChange(e) {
        e.target.setCustomValidity("");
    }

    render() {
        return (
            <div className="EditBio">
                <div className="edit-bio-button" onClick={() => this.setState({show: !this.state.show})}> Edit Bio </div>
                { this.state.show && 
                    <form onSubmit={ (e) => { this.handleSubmit(e) } }>
                        <div className="form-container">
                            <div className="form-pair">
                                <label htmlFor="Post"></label>
                                <textarea
                                    placeholder="Add/edit a bio to your profile" 
                                    id="Bio" 
                                    name="bio"
                                    maxLength="250"
                                    onInvalid={this.textOnInvalid}
                                    onChange={this.textOnChange}
                                    required
                                />
                            </div>
                            <button type="send"> Update</button>
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
export default EditBio;