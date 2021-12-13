import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import {passChange} from '../reducks/users/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: "center",
    paddingTop: 50,
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
    marginTop: 50,
  },
  button1: {
    marginLeft: 50,
  },
  head1: {
    color: "blue",
  },
  root: {
    width: '60%',
    marginTop: 150,
  },
  paper: {
    height: 400,
  },
}));

export function PassForget() {
  const [idval, setIdVal] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  function handleIdChange(e) {
    setIdVal(e.target.value);
  }

  return (
    <Grid container alignItems="center" justify="center" >
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.form}>
            <h1 className={classes.head1}>パスワードを忘れた方</h1>
            <form className={classes.textField} noValidate autoComplete="off">
              <TextField id="outlined-search" value={idval} label="学籍番号を入力してください" type="search" variant="outlined" onChange={handleIdChange}/><br />
              <Button variant="outlined" size="large"><Link to="/">ログインに戻る</Link></Button>
              <Button color="primary" className={classes.button1} variant="outlined" size="large" onClick={ () => dispatch(passChange(idval)) }>再発行をする</Button>
            </form>
          </div>
        </Paper>
      </div>
    </Grid>
  );
}