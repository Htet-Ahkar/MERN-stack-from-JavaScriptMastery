import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import decode from "jwt-decode";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    //JWT
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button color="secondary" variant="contained" onClick={logOut}>
              Logout
            </Button>
          </div>
        ) : location.pathname === "/" ? (
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to="/auth"
          >
            Sign In
          </Button>
        ) : (
          <Button color="primary" variant="contained" component={Link} to="/">
            Home
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
