import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from "axios";
import { Link } from "@reach/router";
import HomePost from "../../components/HomePost/HomePost";

export default function Home() {

    var [heading, setHeading] = useState('');
    var [hero, setHero] = useState('');
    var [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1337/heading")
            .then(response => setHeading(response.data.Heading))

        axios.get("http://localhost:1337/hero")
            .then(response => setHero("http://localhost:1337" + response.data.Hero.url))

        axios.get("http://localhost:1337/posts")
            .then(response => {
                setPosts(response.data);
            })
    }, [])

    return (
        <>
            <div className="home">
                <header className="home__header" style={{backgroundImage: `url(${hero})`}}>
                    <h1 className="home__header__heading">
                        { heading }
                    </h1>

                    <nav>
                        <Link to="/" style={{color: "#FFA133"}}>Home</Link>
                        <Link to="/posts">Indlæg</Link>
                        <Link to="/gallery">Galleri</Link>
                    </nav>
                </header>

                <main className="home__content">
                    <h3>Seneste indlæg</h3>

                    <div className="home__content__posts">
                        { posts?.slice(0, 3).map(post => {
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
