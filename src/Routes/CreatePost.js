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

    async handleSubmit(e) {
    }

    render() {
        return (
            <div className="CreatePost">
                <div className="create-post-button" onClick={() => this.setState({show: !this.state.show})}> Create Post </div>
                { this.state.show && 
                
                    <form onSubmit={ (e) => { this.handleSubmit(e) } }>
                        <div className="form-container">
                            <div className="text">
                                <input type="text" placeholder="What's happening?" onChange={(e) => this.setState({input: e.target.value})}/>
                            </div>
                            <button type="send"> Send</button>
                            { this.state.errorMessage &&
                                <h1> Over Character Limit </h1>
                            }
                        </div>
                    </form>
                }
            </div>
        );
    }
}
export default CreatePost;