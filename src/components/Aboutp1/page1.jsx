import React from "react";
import "./page1.scss";
import MusicPlayer from "../../app/Music";

const page1 = () => {
  return (
    <div className="main">
      <MusicPlayer src="/medias/BG5.mp3" />
      <video src="/medias/Webreel.mp4" autoPlay loop muted></video>
      <nav>
        <div className="left">
          <img src="/images/favicon.png" alt="" />
          <a href="/">
            <h1>Sheryians Coding School</h1>
          </a>
        </div>
        <div className="right">
          <a href="/">Home</a>
          <a href="/courses">Courses</a>
          <a href="/signin">Sign In</a>
        </div>
      </nav>
      <div className="container">
        <h1>where dreams</h1>
        <div className="center">
          <p>
            We are committed to providing programs that go beyond top-tier training traditional
            education
          </p>
          <h1>Transform</h1>
        </div>
        <h1>into code</h1>
      </div>
      <div className="bottom">
        <u>
          <p>Here's How we can help</p>
        </u>
      </div>
    </div>
  );
};

export default page1;
