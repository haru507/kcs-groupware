import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { signIn } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    paddingTop: 30,
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
  button1: {
    marginTop: '16px',
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

export function SignIn() {
  const dispatch = useDispatch();
  const [idval, setIdVal] = useState("");
  const [passval, setPassVal] = useState("");

  const classes = useStyles();

  function handleIdChange(e) {
    setIdVal(e.target.value);
  }

  function handlePassChange(e) {
    setPassVal(e.target.value)
  }

  return (
    <Grid container alignItems="center" justify="center" >
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.form}>
            <h1 className={classes.head1}>ログイン画面</h1>
            <form className={classes.textField} noValidate autoComplete="off">
              <TextField id="outlined-search" value={idval} label="学籍番号を入力してください" type="search" variant="outlined" onChange={handleIdChange}/><br />
              <TextField id="outlined-password-input" value={passval} label="パスワードを入力してください" type="password" variant="outlined" onChange={handlePassChange} autoComplete="current-password" /><br />
              <Link to="/signup">新規会員登録をする</Link><br />
              <Link to="/passForget">パスワードを忘れた方</Link><br />
              <Button color="primary" className={classes.button1} variant="outlined" size="large" onClick={ () => dispatch(signIn(idval, passval))}>ログインする</Button>
            </form>
          </div>
        </Paper>
      </div>
    </Grid>
  );
}