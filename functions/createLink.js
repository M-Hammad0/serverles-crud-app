const axios = require("axios");
require("dotenv").config();

exports.handler = async (event) => {
  const CREATE_LINK = `
    mutation ($name: String!, $url: String!, $description: String){
        createLink(data: {name: $name, url: $url, description: $description }){
            _id
            name
            url
            description
        }
    }
    `;

    // get data from frontend
  const { name, url, description } = JSON.parse(event.body);

  try {
    const { data: {data: {createLink}} } = await axios({
      url: "https://graphql.fauna.com/graphql",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      },
      data: {
        query: CREATE_LINK,
        variables: {
          name,
          url,
          description,
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(createLink),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      error: JSON.stringify("something went wrong"),
    };
  }
};
