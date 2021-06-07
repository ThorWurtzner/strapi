import React, { useEffect, useState } from 'react';
import "./Gallery.scss";
import axios from "axios";
import { Link } from "@reach/router";
import { SRLWrapper } from "simple-react-lightbox";


export default function Gallery(props) {

    var [gallery, setGallery] = useState([]);
    var [color, setColor] = useState('');
    var [mode, setMode] = useState('');
    
    useEffect(() => {
        axios.get("https://strapi-blog-db.herokuapp.com/gallery-images")
            .then(response => {
                setGallery(response.data);
            })

        axios.get("https://strapi-blog-db.herokuapp.com/site-color")
            .then(response => {
                setColor(response.data.color);
            })

        axios.get("https://strapi-blog-db.herokuapp.com/color-mode")
            .then(response => {
                setMode(response.data.mode);
            })
    }, [setGallery, setColor])

    var bgColor;
    var textColor;
    var pColor;

    if (mode === "dark") {
        bgColor = "#3E3E3E";
        textColor = "#fff";
        pColor = "rgb(146, 146, 146)";
    } else if (mode === "light") {
        bgColor = "#eee";
        textColor = "#000";
    } 

    if (color === 'blue') color = "#89CFF0"
    if (color === 'orange') color = "#FFA133"
    if (color === 'green') color = "#3CB371"

    return (
        <div className="gallery">
            <div className="gallery__wrapper" style={{backgroundColor: bgColor}}>
                <nav style={{backgroundColor: bgColor}}>
                    <Link to="/" style={{color: textColor}}>Home</Link>
                    <Link to="/posts" style={{color: textColor}}>Indlæg</Link>
                    <Link to="/gallery" style={{color: color}}>Galleri</Link>
                </nav>
                <SRLWrapper>
                {
                    gallery?.map(img => {
                        return(
                            <img src={img.image.url} alt="" key={img.id} />
                        )
                    })
                }
                </SRLWrapper>
            </div>
        </div>
    )
}
