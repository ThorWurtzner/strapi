import './App.scss';
import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { navigate, Router } from "@reach/router";
import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Posts from "./pages/Posts/Posts";
import SimpleReactLightbox from 'simple-react-lightbox';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Admin from "./pages/Admin/Admin";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";

import TokenContext from "./TokenContext";


function App() {
  var [hero, setHero] = useState('');
  var [open, setOpen] = useState(false);
  var [token, setToken] = useState('false');

  useEffect(() => {
      axios.get("https://strapi-blog-db.herokuapp.com/hero")
        .then(response => setHero(response.data.Hero.url))
  }, [setHero])

  var { register, handleSubmit, formState: {errors} } = useForm();
  var [loginError, setLoginError] = useState('');

  function login(data) {
    axios.post("https://strapi-blog-db.herokuapp.com/auth/local", {
      "identifier": data.email,
      "password": data.password
    })
      .then(response => {
        setToken(response.data);
        navigate("/admin");
        setLoginError(false);
        setOpen(false);
      })
      .catch(error => setLoginError("Email or password is incorrect"))
  }
  
  return (
    <div className="app" style={{backgroundImage: `url(${hero})`}}>
      {/* <TokenContext.Provider value={tokenState}> */}
        <SimpleReactLightbox>
          <Router>
            <Home path="/" />
            <Admin path="/admin" token={token} />
            <Posts path="/posts" />
            <Posts path="/posts/:id" />
            <Gallery path="gallery" />
          </Router>
        </SimpleReactLightbox>
      {/* </TokenContext.Provider> */}
        <div>
          <button className="loginBtn" onClick={() => setOpen(!open)}><i className="fas fa-user"></i></button>

          <form onSubmit={handleSubmit(login)} noValidate autoComplete="off" className="dropdown" style={{transform: open === true ? "translateX(0)" : "translateX(100%)"}}>
              <TextField id="standard-basic" label="Username"
                {...register("email", {required: true})} error={errors.email ? true : false} 
               />

              <TextField style={{marginTop: "-20px"}} id="standard-basic" label="Password" type="password" 
                {...register("password", {required: true})} error={errors.password ? true : false} 
               />

              <Button type="submit" style={{width: "150px"}} variant="contained" color="primary">Log in</Button>
              {loginError ? <Alert className="login__error" severity="error">{loginError}</Alert> : null}
          </form>
        </div>
    </div>
  )
}

export default App;
