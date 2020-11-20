import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function LinkList() {
  const [Links, setLinks] = useState([]);

  const getLinks = async () => {
    const { data } = await axios.get("/.netlify/functions/getLinks");
    setLinks(data.data);
  };

  useEffect(() => {
    getLinks();
  }, []);

  const deleteLink = async (event) => {
    await axios.delete("/.netlify/functions/deleteLink", {
      data: {
        id: event.target.value,
      },
    });
    getLinks(); // refresh list after deleting
  };

  return (
    <div>
      {Links &&
        Links.map((i) => (
          <div className="box" style={{ padding: "10px" }} key={i._id}>
            <p>{i._id}</p>
            <p>{i.url}</p>
            <p>{i.description}</p>
            <div className="row">
            </div>
            <button className="btn btn-danger" value={i._id} onClick={deleteLink}>
              delete
            </button>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default LinkList;
