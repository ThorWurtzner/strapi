import React, { useState, useEffect } from 'react';
import "./HomePost.scss";
import parse from "html-react-parser";
import { Link } from "@reach/router";

import axios from "axios";

export default function Homepost({ title, text, id, date }) {

    var [color, setColor] = useState('');
    var [mode, setMode] = useState('');

    useEffect(() => {
        axios.get("https://strapi-blog-db.herokuapp.com/site-color")
            .then(response => {
                setColor(response.data.color);
            })

        axios.get("https://strapi-blog-db.herokuapp.com/color-mode")
            .then(response => {
                setMode(response.data.mode);
            })
    }, [])

    var bgColor;
    var textColor;
    var pColor;

    if (mode === "dark") {
        bgColor = "#3E3E3E";
        textColor = "#fff";
        pColor = "rgb(146, 146, 146)";
    } else if (mode === "light") {
        bgColor = "#fff";
        textColor = "#000";
    } 

    if (color === 'blue') color = "#89CFF0"
    if (color === 'orange') color = "#FFA133"
    if (color === 'green') color = "#3CB371"

    return (
        <>
            <div className="home__post" style={{backgroundColor: bgColor}}>
                <p className="home__post__date" style={{color: textColor}}>{date}</p>
                <h4 className="home__post__title" style={{color: textColor}}>{title}</h4>
                <p className="home__post__text" style={{color: pColor}}>{parse(text)}</p>
                <Link to={"/posts/" + id} className="home__post__link" style={{color: color}}>Go to post</Link>
            </div>
        </>
    )
}
