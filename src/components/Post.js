import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import { FormControl, Input, Button } from "@material-ui/core";
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

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
      {comments.length !== 0 ? (
        <div className="post__comments">
          {comments.map((comment) => (
            <p style={{ margin: "0px 10px 10px" }}>
              <div className="post__commentrow">
                <div className="post__commenttext">
                  <strong>{comment.username}</strong> {comment.text}
                </div>
              </div>
            </p>
          ))}
        </div>
      ) : (
        <p style={{ margin: "20px", color: "gray" }}>No comments</p>
      )}

      {user ? (
        <FormControl
          className="post__form"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "10px",
            paddingTop: "20px",
            borderTop: "1px solid lightgray",
          }}
        >
          <Input
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
            color="primary"
            variant="outlined"
          >
            Post
          </Button>
        </FormControl>
      ) : (
        <p style={{ margin: "20px" }}>Log in to post a comment</p>
      )}
    </div>
  );
}

export default Post;
