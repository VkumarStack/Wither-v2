import React from "react";
import '../Stylesheets/createpost.css';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            errorMessage: false
        };
    }

    // TODO: resize text box, cannot return?

    async handleSubmit(e) {
        e.preventDefault();
        let response = await fetch("http://localhost:8080/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: e.target.value})
        })
        response = await response.json();
        if (response.Error)
        {
            // do not post 
            this.setState({errorMessage: response.Error});
            setTimeout(() => {this.setState({errorMessage: null})}, 20000);
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
                <div className="create-post-button" onClick={() => this.setState({show: !this.state.show})}> Create Post </div>
                { this.state.show && 
                    <form onSubmit={ (e) => { this.handleSubmit(e) } }>
                        <div className="form-container">
                            <div className="form-pair">
                                    <label htmlFor="Post"></label>
                                    <input type="text" placeholder="What's happening?" id="Text" name="text"
                                    minLength="1" maxLength="280"
                                    onInvalid={this.textOnInvalid}
                                    onChange={this.textOnChange}
                                    required/>
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