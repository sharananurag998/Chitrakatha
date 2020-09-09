import React, { useState } from "react";
import "./Header.css";
import Logo from "../logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header({ user }) {
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({ displayName: username });
      })
      .catch((e) => alert(e.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => alert(e.message));

    setOpenSignin(false);
  };

  return (
    <div className="app__header">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src={Logo} alt="App Logo" />
            </center>
            <Input
              placeholder="Username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src={Logo} alt="App Logo" />
            </center>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
      <img className="app__headerImage" src={Logo} alt="App logo" />

      {user ? (
        <Button onClick={() => auth.signOut()}> Sign Out </Button>
      ) : (
        <div className="app__loginContainer">
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setOpenSignin(true);
            }}
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
