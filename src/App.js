import './App.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Router } from "@reach/router";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Posts from "./pages/Posts/Posts";

function App() {

  var [posts, setPosts] = useState([]);
  var [heading, setHeading] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1337/posts')
      .then(response => {
        // // ISO format
        // var date = post.published_at;
        // // Instance new class so it's an object and pass ISO string.
        // var d = new Date(date);
        // // Use method to convert to UTC
        // var d = d.toUTCString();
        // // Remove unwanted hour and second from string
        // d = d.slice(0, 16)

        setPosts(response.data);
      });

    axios.get('http://localhost:1337/heading')
      .then(response => {
        setHeading(response.data.Heading);
      });
  }, [setPosts, setHeading])

  return (
    <Router>
      <Home path="/" />
      <Posts path="/posts" />
      <Gallery path="gallery" />
    </Router>
  )
}

export default App;
