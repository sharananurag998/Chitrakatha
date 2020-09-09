import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";

function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, []);

  return (
    <div className="post">
      {/* header -> avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/* image */}
      <img className="post__image" src={imageUrl} alt="post" />

      {/* username + caption */}
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
    </div>
  );
}

export default Post;
