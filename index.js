// Import the axios library
const axios = require("axios");
require("dotenv").config();

async function postToEndpoint() {
  // Retrieve the OpenAI API key from environment variables
  const apiKey = process.env.OPENAI_API_KEY;

  // Check if the API key is defined
  if (!apiKey) {
    console.error(
      "The environment variable OPENAI_API_KEY is not set. Please set it and try again."
    );
    process.exit(1);
  }

  // Specify the URL for the OpenAI API endpoint
  const endpointUrl = "https://api.openai.com/v1/chat/completions";

  // Construct the headers for the API request
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // Construct the data (payload) for the API request
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello World!" }],
    temperature: 0.7,
  };

  try {
    // Send a POST request to the API endpoint
    const response = await axios.post(endpointUrl, data, { headers });

    // Check if choices were returned in the response
    if (response.data.choices && response.data.choices.length > 0) {
      // Log the content of the first choice
      console.log(response.data.choices[0].message.content);
    } else {
      console.error("No choices were returned in the response.");
    }
  } catch (error) {
    // Log any error that occurs during the API request
    console.error(
      "An error occurred while sending the request:",
      error.message
    );
  }
}

// Call the function to post data to the API endpoint
postToEndpoint();
