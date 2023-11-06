import React from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import "../Stylesheets/postdisplay.css";

class PostDisplay extends React.Component {
    // Pass in (optional) username for props - if there is a username, show all posts from users that they follow
    // If there is no username, then show every single post
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            suggestions: []
        };
    }

    componentDidMount() {
        this.getPosts();
        this.getSuggestions();
    }

    componentDidUpdate(prevProps) {
        let newUsernames = false;
        if ((this.props.usernames && !prevProps.usernames) || (!this.props.usernames && prevProps.usernames)) {
            newUsernames = true;
        } else if (this.props.usernames && prevProps.usernames) {
            if (this.props.usernames.length !== prevProps.usernames.length) {
                newUsernames = true;
            } else {
                for (let i = 0; i < this.props.usernames.length; i++) {
                    if (this.props.usernames[i] !== prevProps.usernames[i]) {
                        newUsernames = true;
                    }
                }
            }
        }

        if (newUsernames) {
            this.setState({posts: []});
            this.getPosts();
            this.setState({suggestions: []});
            this.getSuggestions();
        }
    }

    async getPosts() {
        let usernamePattern = "";
        if (this.props.usernames && this.props.usernames.length > 0) {
            const groups = this.props.usernames.map((name) => `(^${name}$)`)
            usernamePattern = groups.join("|")
        }
        let posts = await fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + `/posts?pattern=${usernamePattern}`)
        posts = await posts.json();
        this.setState({posts: posts.posts});
    }

    generatePosts() {
        if (this.state.posts.length === 0)
            return;
        
        const posts = this.state.posts.map((post) => <Post post={post} key={post._id}/>)

        return posts;   
    }

    async getSuggestions() {
        if (this.props.suggest !== undefined) {
            let suggestions = await fetch((process.env.REACT_APP_BACKEND_URL || "http://localhost:8080") + `/users/${this.props.suggest}/suggest`);
            suggestions = await suggestions.json();
            suggestions = suggestions.users;
            if (!suggestions.Error) {
                this.setState({suggestions: suggestions.map((item) => {return item.a_username})})
            }
        }
    }

    generateSuggestions() {
        if (this.state.suggestions.length === 0)
            return;
        
        return this.state.suggestions.map((suggestion) => <div className="Suggestion"> <Link to={`/users/${suggestion}`} key={suggestion.toLowerCase()}> {suggestion} </Link> </div>)
    }

    render() {
        return (
            <div className="PostDisplay">
                { this.generatePosts()}
                <div className="Suggestions">
                    { this.state.suggestions.length !== 0 && 
                      <div className="SuggestionsMessage"> <h1> Looks like you've reached the end of the timeline. Why not follow some new users? </h1></div>  }
                    { this.generateSuggestions() }
                </div>
            </div>
        );
    }
}

export default PostDisplay;