import React, { useState } from "react";
import { Button, Input, LinearProgress } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //calculate progess
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        //when upload completes
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //create a post from the image
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage("");
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <center>
        <h3>Upload Image</h3>
      </center>
      <br />
      <Input
        type="text"
        placeholder="Enter a Caption"
        onChange={(e) => {
          setCaption(e.target.value);
        }}
        value={caption}
      />
      <Input
        type="file"
        onChange={handleChange}
        className="imageupload__filepicker"
      />
      <LinearProgress
        className="imageupload__progress"
        variant="determinate"
        value={progress}
      />

      <Button className="imageupload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
