import './App.scss';
import axios from "axios";
import { Router } from "@reach/router";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Posts from "./pages/Posts/Posts";

function App() {

  return (
    <Router>
      <Home path="/" />
      <Posts path="/posts" />
      <Posts path="/posts/:id" />
      <Gallery path="gallery" />
    </Router>
  )
}

export default App;
