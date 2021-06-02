import './App.scss';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Router } from "@reach/router";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Posts from "./pages/Posts/Posts";
import SimpleReactLightbox from 'simple-react-lightbox';

function App() {

  var [hero, setHero] = useState('');

  useEffect(() => {
      axios.get("https://strapi-blog-db.herokuapp.com/hero")
        .then(response => setHero(response.data.Hero.url))
  }, [setHero])

  return (
    <div className="app" style={{backgroundImage: `url(${hero})`}}>
      <SimpleReactLightbox>
        <Router>
          <Home path="/" />
          <Posts path="/posts" />
          <Posts path="/posts/:id" />
          <Gallery path="gallery" />
        </Router>
      </SimpleReactLightbox>
    </div>
  )
}

export default App;
