import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from "axios";
import { Link } from "@reach/router";
import HomePost from "../../components/HomePost/HomePost";

export default function Home() {

    var [heading, setHeading] = useState('');
    var [posts, setPosts] = useState([]);
    var [logo, setLogo] = useState([]);
    var [color, setColor] = useState('');
    var [mode, setMode] = useState('');
    var [hero, setHero] = useState({});
    var [position, setPosition] = useState("");

    useEffect(() => {
        axios.get("https://strapi-blog-db.herokuapp.com/hero")
            .then(response => {
                console.log(response.data);
                if (response.data.Logoposition === "Left") {
                    setPosition("row-reverse");
                }
                if (response.data.Logoposition === "Right") {
                    setPosition("row");
                }
                setHero(response.data);
            })

        // axios.get("https://strapi-blog-db.herokuapp.com/heading")
        //     .then(response => setHeading(response.data.Heading))

        axios.get("https://strapi-blog-db.herokuapp.com/posts")
            .then(response => {
                setPosts(response.data);
            })

        // axios.get("https://strapi-blog-db.herokuapp.com/logo")
        //     .then(response => {
        //         setLogo(response.data.logo.url);
        //     })

        axios.get("https://strapi-blog-db.herokuapp.com/site-color")
            .then(response => {
                setColor(response.data.color);
            })

        axios.get("https://strapi-blog-db.herokuapp.com/color-mode")
            .then(response => {
                setMode(response.data.mode);
            })
    }, [])

    if (color === 'blue') color = "#89CFF0"
    if (color === 'orange') color = "#FFA133"
    if (color === 'green') color = "#3CB371"

    var bgColor;
    var textColor;

    if (mode === "dark") {
        bgColor = "#252525";
        textColor = "#fff";
    } else if (mode === "light") {
        bgColor = "#eee";
        textColor = "#000";
    } 

    return (
        <>
            <div className="home">
                <header className="home__header" style={{flexDirection: position}}>
                    {hero.header?.map(zone => {
                        console.log(zone);
                        return zone.__component === "header.header" ? <img className="home__header__logo" src={zone.Logo.url} alt="logo" /> : zone.__component === "header.heading" ? <h1 className="home__header__heading" style={{color: color}}>{zone.heading}</h1> : null;
                    })}
                </header>

                <main className="home__content" style={{backgroundColor: bgColor}}>
                    <nav style={{backgroundColor: bgColor}}>
                        <Link to="/" style={{color: color}}>Home</Link>
                        <Link to="/posts" style={{color: textColor}}>Indl??g</Link>
                        <Link to="/gallery" style={{color: textColor}}>Galleri</Link>
                    </nav>
                    <h3 style={{color: textColor}}>Seneste indl??g</h3>

                    <div className="home__content__posts">
                        { posts?.slice(posts.length - 3, posts.length).map(post => {
                            // ISO format
                            // Instance new class so it's an object and pass ISO string.
                            var d = new Date(post.published_at);
                            // Use method to convert to UTC
                                d = d.toUTCString();
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
