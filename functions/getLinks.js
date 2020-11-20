const axios = require("axios"); // use nodejs syntax
require("dotenv").config(); // get env variables

exports.handler = async (event) => {
  const GET_LINKS = ` 
    query {
        allLinks{
            data{
                _id
                name
                url
                description
            }
        }
    }
    `;

  const { data: {data} } = await axios({
    url: "https://graphql.fauna.com/graphql", // url for all is same secret determines db
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`, // must write Bearer
    },
    data: {
      query: GET_LINKS,
      variables: {},
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data.allLinks),
  };
};
