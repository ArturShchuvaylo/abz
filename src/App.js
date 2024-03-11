import React, { useState, useEffect } from "react";
import Block from "./Block";

const App = () => {
  const [postData, setPostData] = useState("");
  const [getData, setGetData] = useState("");
  const [postResponse, setPostResponse] = useState(null);
  const [errorGet, setErrorGet] = useState(null);
  const [errorPost, setErrorPost] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setGetData(data);
    } catch (error) {
      console.error("GET Error:", error);
      setErrorGet("Failed to fetch data");
    }
  };

  const postDataHandler = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: postData }),
        }
      );
      const data = await response.json();
      setPostResponse(data);
      setPostData("");
    } catch (error) {
      console.error("POST Error:", error);
      setErrorPost("Failed to send POST request");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Block title="GET Request" error={errorGet} response={getData} />
      <Block title="POST Response" error={errorPost} response={postResponse} />
      <div className="block">
        <h2>POST Request</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postDataHandler();
          }}
        >
          <textarea
            value={postData}
            onChange={(e) => setPostData(e.target.value)}
            placeholder="Enter data to send..."
            rows="4"
            cols="30"
          />
          <button type="submit" className="button">
            Submit POST Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
