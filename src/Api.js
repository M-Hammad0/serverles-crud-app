import axios from 'axios'

export const getLinks = async () => {
    const { data } = await axios.get("/.netlify/functions/getLinks");
    // setLinks(data.data);
    return data
  };