import React from "react";
import { Box } from "@mui/material";
// import LoginForm from "./LoginForm";
import thinkingImg from "../images/brainthinking.png";
import writingImg from "../images/brainnote.jpeg";
import zenImg from "../images/zenbrain.jpeg";

function Home() {
  const boxStyle = {
    // margin: 'auto',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: '1px solid',
    width: "60%",
    height: "fit-content",
    flexDirection: "row",
    mariginBottom: "200px",
    // flexWrap: 'wrap'
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <Box sx={boxStyle}>
        <h1 className="welcome">WELCOME TO AFTER THOUGHT</h1>
      </Box>
      <Box sx={boxStyle}>
        <img
          src={thinkingImg}
          className="home-img"
          atl="cartoon-brain-thinking"
        />
        <h1 className="home-words">
          Tired of forgetting what that thing was called, what you need from the
          store, or what you needed to do when you got home? Maybe you had a
          Shark Tank idea... but what was it?
        </h1>
      </Box>
      <Box sx={boxStyle}>
        <h1 className="home-words">
          After Thought is where you can secure those great ideas,
          reccomendations, tedious tasks, and access them from anywhere using
          any device.
        </h1>
        <img
          src={writingImg}
          className="home-img"
          alt="cartoon-brain-writing"
        />
      </Box>
      <Box sx={boxStyle}>
        <img src={zenImg} className="home-img" alt="cartoon-brain-meditating" />
        <h1 className="home-words">
          Stop racking your brain trying to remember all those thoughts and let
          After Thought do the job for you. Finally, you can put your mind at
          ease.
        </h1>
      </Box>
      <Box sx={boxStyle}>
        <h1 className="home-words">
          <a href="register">Register</a> or <a href="login">login</a> to
          continue.
        </h1>
      </Box>
      <h4>&copy;After Thought - GA Capstone 2022</h4>
    </div>
  );
}

export default Home;
