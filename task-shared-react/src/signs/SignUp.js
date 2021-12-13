import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { signUp } from '../reducks/users/operations';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    paddingTop: 10,
    marginBottom: 20,
  },
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%',
      display: 'flex',
      margin: "auto",
      // width: '50%',
    },
  },
  button2: {
    marginLeft: 50
  },
  head1: {
    color: "blue",
  },
  root: {
    width: '60%',
    marginTop: 100,
  },
  paper: {
    height: 500,
  },
}));

export function SignUp() {
  const dispatch = useDispatch();

  const [idval, setIdVal] = useState("");
  const [firstNameval, setFirstNameVal] = useState("");
  const [lastNameval, setLastNameVal] = useState("");
  const [passval, setPassVal] = useState("");

  const classes = useStyles();

  function handleIdChange(e) {
    setIdVal(e.target.value);
  }

  function handlePassChange(e) {
    setPassVal(e.target.value)
  }

  function handleFirstNameChange(e) {
    setFirstNameVal(e.target.value)
  }

  function handleLastNameChange(e) {
    setLastNameVal(e.target.value)
  }

  return(
    <Grid container alignItems="center" justify="center" >
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.form}>
            <h1 className={classes.head1}>新規会員登録</h1>
            <form className={classes.textField} noValidate autoComplete="off">
              <TextField id="outlined-search" value={idval} label="学籍番号を入力してください" type="search" variant="outlined" onChange={handleIdChange}/><br />
              <TextField id="outlined-search" value={firstNameval} label="姓（ローマ字）を入力してください" type="search" variant="outlined" onChange={handleFirstNameChange}/><br />
              <TextField id="outlined-search" value={lastNameval} label="名（ローマ字）を入力してください" type="search" variant="outlined" onChange={handleLastNameChange}/><br />
              <TextField id="outlined-password-input" value={passval} label="パスワードを入力してください" type="password" variant="outlined" onChange={handlePassChange} autoComplete="current-password" /><br /><br />
              <Button variant="outlined" size="large" ><Link to="/signin">ログインに戻る</Link></Button> 
              <Button color="primary" className={classes.button2} variant="outlined" size="large" onClick={ () => dispatch(signUp((firstNameval+" "+lastNameval), idval, passval)) }>アカウント作成</Button>
            </form>
          </div>
        </Paper>
      </div>
    </Grid>
  )
}