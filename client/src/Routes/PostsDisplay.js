import React from "react";
import Post from "./Post";
import "../Stylesheets/postdisplay.css";

class PostDisplay extends React.Component {
    // Pass in (optional) username for props - if there is a username, show all posts from users that they follow
    // If there is no username, then show every single post
    constructor(props) {
        super(props);
        this.state = {
            posts: {},
        };
    }

    async componentDidMount() {
        await this.getPosts();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.usernames !== prevProps.usernames)
            await this.getPosts();
    }

    async getPosts() {
        if (this.props.usernames)
        {
            const requests = this.props.usernames.map((username) => this.postsFromUser(username));
            const postArrays = await Promise.all(requests); // An array of arrays containing post information
            let postMapping = {};
            for (let i = 0; i < postArrays.length; i++)
            {
                for (let j = 0; j < postArrays[i].length; j++)
                {
                    postMapping[postArrays[i][j]._id] = postArrays[i][j];
                }
            }
            this.setState({posts: postMapping})
            
        }
        else
        {
            let postIDs = await fetch("https://wither.onrender.com/posts");
            postIDs = await postIDs.json();
            if (!postIDs.Error)
            {
                const urls = postIDs.posts.map((id) => fetch(`https://wither.onrender.com/posts/${id}`));
                const posts = await Promise.all(urls);
                const json = posts.map((reponse) => reponse.json());
                const data = await Promise.all(json);
                let postMapping = {}
                for (let i = 0; i < data.length; i++)
                {
                    if (!data[i].Error)
                        postMapping[data[i]._id] = data[i];
                }
                this.setState({ posts: postMapping});
            }
        }
    }

    async postsFromUser(user) {
        let response = await fetch(`https://wither.onrender.com/users/${user}`);
        response = await response.json();
        if (!response.Error)
        {
            let urls = response.a_posts.map((id) => fetch(`https://wither.onrender.com/posts/${id}`));
            const posts = await Promise.all(urls);
            const json = posts.map((response) => response.json());
            const data = await Promise.all(json);
            return data;
        }
        return [];

    }

    generatePosts() {
        if (Object.keys(this.state.posts).length === 0)
            return;
        const sorted = Object.values(this.state.posts).sort( (a, b) => {
            return new Date(b.a_dateCreated) - new Date(a.a_dateCreated);
        });
        let posts = sorted.map((post) => {
            let props = { id: post._id, user: post.a_username, text: post.a_text, date: post.a_dateCreated, likes: post.a_likes, dislikes: post.a_dislikes };
            return (<Post post={props} key={post._id}/>);
        })
        console.log(posts);
        return posts;
        
    }

    render() {
        this.generatePosts();
        return (
            <div className="PostDisplay">
                { this.generatePosts()}
            </div>
        );
    }
}

export default PostDisplay;