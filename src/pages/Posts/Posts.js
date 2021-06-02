import React, { useEffect, useState } from 'react';
import "./Posts.scss";
import axios from "axios";
import { Link, Router } from "@reach/router";

export default function Posts(props) {
    var [posts, setPosts] = useState([]);
    
    useEffect(() => {
        axios.get("https://strapi-blog-db.herokuapp.com")
            .then(response => {
                setPosts(response.data);
            })
    }, [])

    return (
        <div className="posts">
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
