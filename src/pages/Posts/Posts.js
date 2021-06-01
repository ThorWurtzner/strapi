import React, { useEffect, useState } from 'react';
import "./Posts.scss";
import axios from "axios";
import { Link, Router } from "@reach/router";

export default function Posts(props) {
    var [hero, setHero] = useState('');
    var [posts, setPosts] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:1337/hero")
            .then(response => setHero("http://localhost:1337" + response.data.Hero.url))

        axios.get("http://localhost:1337/posts")
            .then(response => {
                setPosts(response.data);
            })
    }, [])

    return (
        <div className="posts" style={{backgroundImage: `url(${hero})`}}>
            <div className="posts__wrapper">
                {/* {
                    gallery?.map(image => {
                        <img src={image.url}>
                    })
                } */}
            </div>
        </div>
    )
}
