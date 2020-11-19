const axios = require("axios");
require("dotenv").config();

exports.handler = async (event) => {
  const UPDATE_LINK = `
    mutation ($id: ID!,$name: String!, $url: String!, $description: String){
        updateLink(id: $id,data: {name: $name, url: $url, description: $description }){
            _id
            name
            url
            description
        }
    }
    `;

    // make sure it is a put request to update the field in DB.
    if (event.httpMethod !== 'PUT') {
        return {
            statusCode: 405,
            err: JSON.stringify('Method not supported')
        }
    }

  // get data from frontend
  const { id, name, url, description } = JSON.parse(event.body);
  //parse data form frontend to strings
  // rename _id to id then pass to variable 

  try {
    const {
      data: {
        data: { updateLink },
      },
    } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query: UPDATE_LINK,
        variables: {
          id,
          name,
          url,
          description,
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(updateLink), // stringyfy json to send to faunadb
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error: JSON.stringify("something went wrong"),
    };
  }
};
