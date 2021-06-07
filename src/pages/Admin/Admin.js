import { Button, TextField } from '@material-ui/core';
import { navigate, Link } from '@reach/router'
import axios from 'axios';
import React, { useContext } from 'react';
import TokenContext from '../../TokenContext';
import Home from '../Home/Home';
import { useForm } from "react-hook-form";
import "./Admin.scss";

export default function Admin({token}) {

    var { register, handleSubmit } = useForm();

    if (!token.jwt) {
        navigate("/");
        return <Home />
    }

    function post(data) {
        axios.post("https://strapi-blog-db.herokuapp.com/posts", {
                Title: data.title,
                Text: data.text
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token.jwt
                }
            }
        )
        .then(response => {
            alert("Post has been created");
            console.log(response);
        })
    }
    

    return (
        <>
            <div className="admin">
            <div className="admin__wrapper">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/posts">Indlæg</Link>
                    <Link to="/gallery">Galleri</Link>
                </nav>
                <h2 className="admin__wrapper__name">Velkommen {token.user.username}</h2>
                <form onSubmit={handleSubmit(post)}>
                <h2>Opret ny artikel</h2>
                    <TextField className="admin__input" id="standard-basic" label="Title"
                        {...register("title", {required: true})}
                    />
                    <TextField style={{minHeight: "200px"}} className="admin__input" id="standard-basic" variant="outlined" label="Article" multiline rowsMax="15"
                        {...register("text", {required: true})}
                    />
                    <Button type="submit" color="secondary" variant="contained" style={{width: "150px"}}>Submit post</Button>
                </form>
            </div>
        </div>
        </>
    )
}
