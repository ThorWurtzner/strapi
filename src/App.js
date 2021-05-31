import './App.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

function App() {

  var [posts, setPosts] = useState([]);
  var [date, setDate] = useState('');
  var [heading, setHeading] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1337/posts')
      .then(response => {
        setPosts(response.data);
      });

    axios.get('http://localhost:1337/heading')
      .then(response => {
        setHeading(response.data.Heading);
      });
  }, [setDate, setPosts, setHeading])

  return (
    <div>

      { posts?.map(post => {

        // ISO format
        var date = post.published_at;
        // Instance new class so it's an object and pass ISO string.
        var d = new Date(date);
        // Use method to convert to UTC
        var d = d.toUTCString();
        // Remove unwanted hour and second from string
        d = d.slice(0, 16)
        
        return(
          <div key={post.Title}>
            <p>{d}</p>
            <p>{post.Title}</p>
            <p>{parse(post.Text)}</p>
          </div>
        )
      })}

      <p>{heading}</p>
    </div>
  );
}

export default App;
