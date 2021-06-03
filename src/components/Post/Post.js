import React, { useState, useEffect } from 'react';
import "./Post.scss";
import parse from "html-react-parser";
import { Link } from "@reach/router";
import axios from "axios";

export default function Post({date, title, text, id, linkText}) {
    
    var single;
    var textColor;
    if (!id) {
        single = "block";
        textColor = "#d9d9d9";
    } else {
        single = "-webkit-box";
    }

    var d = new Date(date);
    // Use method to convert to UTC
    d = d.toUTCString();
    // Remove unwanted hour and second from string
    d = d.slice(0, 16)
    // date = d;

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
            <div className="primary__post">
                <p className="primary__post__date">{d}</p>
                <h4 className="primary__post__title">{title}</h4>
                <p className="primary__post__text" style={{display: single, color: textColor}}>{text ? parse(text) : null}</p>
                {
                    id ?
                    <Link to={"/posts/" + id} className="primary__post__link" style={{color: color}}>{linkText}</Link>
                    :
                    <Link to={"/posts/"} className="primary__post__link" style={{color: color}}>{linkText}</Link>
                }
            </div>
        </>
    )
}
