const axios = require("axios");
require("dotenv").config();

exports.handler = async (event) => {
  const DELETE_LINK = `
        mutation($id: ID!){
            deleteLink(id: $id){
                _id
            }
        }
        `;

  if (event.httpMethod !== "DELETE") {
    return {
      statusCode: 405,
      err: JSON.stringify("Method not supported"),
    };
  }

  const { id } = JSON.parse(event.body);

  try {
    const {data}
     = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query: DELETE_LINK,
        variables: {
          id,
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data), // stringyfy json to send to faunadb
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error: JSON.stringify("something went wrong"),
    };
  }
};
