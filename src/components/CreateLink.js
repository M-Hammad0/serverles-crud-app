import { useState } from 'react';
import axios from 'axios'

const CreateLink = () => {
    const [name,setName] = useState("")
    const [url,setUrl] = useState("")
    const [description,setdescription] = useState("")
    const [id,setid] = useState("")
    const [check,setCheck] = useState("")

    const resetForm = () => {
        setName("")
        setName("")
        setdescription("")
        setid("")
        setCheck("")
    }

    const handleSubmit = async(event) => {
      if (check === "create") {
        await axios.post('/.netlify/functions/createLink',{
          data: {
            name,
            url,
            description
          }
      })
      resetForm()
      }
      else {
        await axios.put('/.netlify/functions/updateLink',{
          data:{
            id,
            name,
            url,
            description
          }
        })
      resetForm()
      }
    }
  return (
    <div>
    <form onSubmit={handleSubmit} autoComplete="off">
    <div className="form-group">
          <label>ID</label>
          <input type="text" placeholder="Leave blank when creating" className="form-control" id="id" value={id} onChange={(e) => setid(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>URL</label>
          <input type="text" className="form-control" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="form-group">
          <label>description</label>
          <input type="text" className="form-control" id="descriptioncription" value={description} onChange={(e) => setdescription(e.target.value)} />
        </div>
        <button  type="submit" value="create" onClick={e => setCheck(e.target.value)} className="btn btn-primary">
          Create
        </button>
        <button  type="submit" value="update" onClick={e => setCheck(e.target.value)} className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default CreateLink;
