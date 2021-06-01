import React, { useEffect, useState } from 'react';
import "./Gallery.scss";
import axios from "axios";
import { Link } from "@reach/router";

export default function Gallery(props) {

    var [hero, setHero] = useState('');
    var [gallery, setGallery] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:1337/hero")
            .then(response => setHero("http://localhost:1337" + response.data.Hero.url))

        axios.get("http://localhost:1337/gallery")
            .then(response => {
                setGallery(response.data);
            })
    }, [])

    return (
        <div className="gallery" style={{backgroundImage: `url(${hero})`}}>
            <div className="gallery__wrapper">
                {/* {gallery?.map(image => {
                    <img src={image.url}>
                })} */}
            </div>
        </div>
    )
}
