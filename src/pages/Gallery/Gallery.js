import React, { useEffect, useState } from 'react';
import "./Gallery.scss";
import axios from "axios";
import { Link } from "@reach/router";
import { SRLWrapper } from "simple-react-lightbox";


export default function Gallery(props) {

    var [gallery, setGallery] = useState([]);
    
    useEffect(() => {
        axios.get("https://strapi-blog-db.herokuapp.com/gallery-images")
            .then(response => {
                setGallery(response.data);
            })
    }, [])

    return (
        <div className="gallery">
            <div className="gallery__wrapper">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/posts">Indlæg</Link>
                    <Link to="/gallery" style={{color: "#FFA133"}}>Galleri</Link>
                </nav>
                <SRLWrapper>
                {
                    gallery?.map(img => {
                        console.log(img);
                        return(
                            <img src={img.image.url} key={img.id} />
                        )
                    })
                }
                </SRLWrapper>
            </div>
        </div>
    )
}
