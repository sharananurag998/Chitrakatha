import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";
import { db, auth } from "./firebase";
import ImageUpload from "./components/ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user logged out
        setUser(null);
      }
    });

    return () => {
      //perform cleanup
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="app">
      {/* Header */}
      <Header user={user} />
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 style={{ margin: "20px" }}>
          You need to be logged in to upload files
        </h3>
      )}

      {/* Posts */}
      <div className="app__posts">
        <div className="app__postsleft">
          {posts.map(({ post, id }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
