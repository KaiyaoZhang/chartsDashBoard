import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Checkbox,
  FormControlLabel,
  form,
  Input
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [forgetPassword, setForgetPassword] = useState(false);

  const turnForgetPasswordTure = () => {
    setForgetPassword(true);
    setActiveTabId(2);
  }

  const handleChange = () => {
    setForgetPassword(false)
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <Typography className={classes.logotypeText}>Faux Dashboard</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          {forgetPassword === true && (
              <React.Fragment>
               <div className={classes.title}>
                <h1 className={classes.font1}>AWESOME DASH</h1>
                <text className={classes.font4}>Enter your email and we send you a password reset link</text>
               </div>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <div className={classes.formSubmitButtons}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Submit
                  </Button>
              </div>      
            </React.Fragment>
          )}
          {activeTabId === 0 && (
            <React.Fragment>
               <div>
                <h1 className={classes.font1}>AWESOME DASH</h1>
                <text className={classes.font2}>Welcome back! Please login to your account</text>
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.rememberMe}>
                <FormControlLabel
                    control={
                      <Checkbox
                        value="uncontrolled"
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                    />
                    }
                    label="Remenber me"
                />
                 <Button
                  size="large"
                  className={classes.forgetButton}
                  onClick = {turnForgetPasswordTure}
                >
                  Forget Password
                </Button>
              </div>
             
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
              </div>      
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <div>
                <h1 className={classes.font1}>AWESOME DASH</h1>
                <text className={classes.font3}>Please compelete to create your account</text>
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <Grid container direction='row' spacing={4}>
                <Grid item xs>
                  <TextField 
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    placeholder="First Name"
                  >
                  </TextField>
                </Grid>
                <Grid item xs>
                  <TextField
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    placeholder="Last Name"
                  >
                  </TextField>
                </Grid>
              </Grid>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="User Name"
                type="email"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="Password"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                margin="normal"
                placeholder="Comfirm Password"
                type="password"
                fullWidth
              />
              <div className={classes.checkbox}>
              <FormControlLabel
                  control={
                    <Checkbox
                      value="uncontrolled"
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                  />
                  }
                  label="I agree with items and conditions"
              />
              </div>
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.createAccountButton}
                  >
                    Sign up
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
          <div className={classes.loginAndNewUser}>
              <Tabs
                value={activeTabId}
                onChange={(e, id) => setActiveTabId(id)}
                onClick={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Login" classes={{ root: classes.tab }} />
                <Tab label="New User" classes={{ root: classes.tab }} />
              </Tabs>
         </div>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
