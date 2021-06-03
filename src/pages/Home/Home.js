import React, { useEffect, useState, useContext } from 'react';
import "./Home.scss";
import axios from "axios";
import { Link } from "@reach/router";
import HomePost from "../../components/HomePost/HomePost";

export default function Home() {

    var [heading, setHeading] = useState('');
    var [posts, setPosts] = useState([]);
    var [logo, setLogo] = useState([]);
    var [color, setColor] = useState('');

    useEffect(() => {
        axios.get("https://strapi-blog-db.herokuapp.com/heading")
            .then(response => setHeading(response.data.Heading))

        axios.get("https://strapi-blog-db.herokuapp.com/posts")
            .then(response => {
                setPosts(response.data);
            })

        axios.get("https://strapi-blog-db.herokuapp.com/logo")
            .then(response => {
                setLogo(response.data.logo.url);
            })

        axios.get("https://strapi-blog-db.herokuapp.com/site-color")
            .then(response => {
                setColor(response.data.color);
            })
    }, [])

    if (color === 'blue') color = "#89CFF0"
    if (color === 'orange') color = "#FFA133"
    if (color === 'green') color = "#3CB371"

    return (
        <>
            <div className="home">
                <header className="home__header">
                    <img className="home__header__logo" src={logo} alt="logo" />
                    <h1 className="home__header__heading" style={{color: color}}>
                        { heading }
                    </h1>
                </header>

                <main className="home__content">
                    <nav>
                        <Link to="/" style={{color: color}}>Home</Link>
                        <Link to="/posts">Indlæg</Link>
                        <Link to="/gallery">Galleri</Link>
                    </nav>
                    <h3>Seneste indlæg</h3>

                    <div className="home__content__posts">
                        { posts?.slice(posts.length - 3, posts.length).map(post => {
                            // ISO format
                            // Instance new class so it's an object and pass ISO string.
                            var d = new Date(post.published_at);
                            // Use method to convert to UTC
                            var d = d.toUTCString();
                            // Remove unwanted hour and second from string
                            d = d.slice(0, 16)

                            return(
                                <HomePost title={post.Title} text={post.Text} id={post.id} date={d}  />
                            )
                        }) }
                    </div>
                </main>
            </div>
        </>
    )
}
