import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {getLinks} from '../Api'
function LinkList() {

  const [Links, setLinks] = useState([]);

  const fetchList = async() => {
    const result  = await getLinks()
    setLinks(result.data)
  }
  useEffect(() => {
    fetchList()
  }, []);

  

  const deleteLink = async (event) => {
    await axios.delete("/.netlify/functions/deleteLink", {
      data: {
        id: event.target.value,
      },
    });
    fetchList(); // refresh list after deleting
  };

  return (
    <div>
      {Links &&
        Links.map((i) => (
          <div className="box" style={{ padding: "10px" }} key={i._id}>
          <ul className='list'>
            <li>Name: {i.name}</li>
            <li>URL: <a target="_blank" rel = "noopener noreferrer" href={i.url}>{i.url}</a></li>
            <li>Description: {i.description}</li>
            <li>id: {i._id}</li>
          </ul>
            <div className="row">
            </div>
            <button style={{marginLeft: "40px"}} className="btn btn-danger" value={i._id} onClick={deleteLink}>
              delete
            </button>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default LinkList;
