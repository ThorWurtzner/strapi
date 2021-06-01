import React, { useState } from 'react';
import "./HomePost.scss";
import parse from "html-react-parser";
import { Link } from "@reach/router";

export default function Homepost({ title, text, id, date }) {

    return (
        <>
            <div className="home__post">
                <p className="home__post__date">{date}</p>
                <h4 className="home__post__title">{title}</h4>
                <p className="home__post__text">{parse(text)}</p>
                <Link to={"/posts/" + id} className="home__post__link">Go to post</Link>
            </div>
        </>
    )
}
