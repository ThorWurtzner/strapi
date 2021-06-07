import React, { useEffect, useState } from 'react';
import "./Posts.scss";
import axios from "axios";
import { Link } from "@reach/router";
import Post from "../../components/Post/Post";

export default function Posts(props) {
    var [posts, setPosts] = useState([]);
    var [post, setPost] = useState({});
    var [color, setColor] = useState('');
    var [mode, setMode] = useState('');
    
    useEffect(() => {
        if (props.id) {
            axios.get("https://strapi-blog-db.herokuapp.com/posts/" + props.id)
                .then(response => {
                    console.log(response.data);
                    setPost(response.data);
                })    
        } else {
            axios.get("https://strapi-blog-db.herokuapp.com/posts")
                .then(response => {
                    setPosts(response.data);
                })
        }

        axios.get("https://strapi-blog-db.herokuapp.com/site-color")
                .then(response => {
                    setColor(response.data.color);
                })

        axios.get("https://strapi-blog-db.herokuapp.com/color-mode")
            .then(response => {
                setMode(response.data.mode);
            })
    }, [props.id, setPosts, setColor])

    var bgColor;
    var textColor;
    var pColor;

    if (mode === "dark") {
        bgColor = "#252525";
        textColor = "#fff";
        pColor = "rgb(146, 146, 146)";
    } else if (mode === "light") {
        bgColor = "#ddd";
        textColor = "#000";
    } 

    if (color === 'blue') color = "#89CFF0"
    if (color === 'orange') color = "#FFA133"
    if (color === 'green') color = "#3CB371"

    return (
        <div className="posts">
            <div className="posts__wrapper" style={{backgroundColor: bgColor}}>
                <nav style={{backgroundColor: bgColor}}>
                    <Link to="/" style={{color: textColor}}>Home</Link>
                    <Link to="/posts" style={{color: color}}>Indlæg</Link>
                    <Link to="/gallery" style={{color: textColor}}>Galleri</Link>
                </nav>
                <div className="posts__wrapper__inner">
                    { 
                        posts?.map(post => {
                            // ISO format
                            // Instance new class so it's an object and pass ISO string.
                            var d = new Date(post.published_at);
                            // Use method to convert to UTC
                            d = d.toUTCString();
                            // Remove unwanted hour and second from string
                            d = d.slice(0, 16)

                            return(
                                <Post title={post.Title} text={post.Text} id={post.id} date={d} linkText="Go to post"  />
                            )
                        })
                    }
                    { post && props.id ?
                        <Post title={post.Title} text={post.Text} date={post.published_at} linkText="Go back" dynamic={post.postZone ? post.postZone : null}  /> 
                     : null }

                </div>
            </div>
        </div>
    )
}
