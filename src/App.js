import './App.css';
import axios from 'axios'
import { useState,useEffect } from 'react';

function App() {

  const [Links,setLinks] = useState([])

  const getLinks = async() => {
    const {data} = await axios.get('/.netlify/functions/getLinks')
    setLinks(data.data)
  }
  
  useEffect(() => {
    getLinks()
  },[])

  return (
    <div>
    {Links.map(i => (
      <div key={i._id}>
      <p>{i.name}</p>
      <p>{i.url}</p>
      <p>{i.description}</p>
      <hr />
      </div>
    ))}
    </div>
  );
}

export default App;
