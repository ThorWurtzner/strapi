import React, { useState, useEffect } from 'react';
import "./HomePost.scss";
import parse from "html-react-parser";
import { Link } from "@reach/router";

import axios from "axios";

export default function Homepost({ title, text, id, date }) {

    var [color, setColor] = useState('')

    useEffect(() => {
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
            <div className="home__post">
                <p className="home__post__date">{date}</p>
                <h4 className="home__post__title">{title}</h4>
                <p className="home__post__text">{parse(text)}</p>
                <Link to={"/posts/" + id} className="home__post__link" style={{color: color}}>Go to post</Link>
            </div>
        </>
    )
}
