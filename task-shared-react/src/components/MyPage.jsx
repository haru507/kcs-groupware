import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MyTaskList from "./MyTaskList";
import MyGroupList from "./MyGroupList";
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useSelector} from 'react-redux';
import {getUserName} from '../reducks/users/selectors';
import { useHistory } from "react-router-dom";
import { Paper, TextField } from '@material-ui/core';
import { isValidRequiredInput } from '../function/common';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  button: {
    margin: theme.spacing(1),
  },input: {
    display: 'none',
  },
  containers: {
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '50%',
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
  typography: {
    padding: theme.spacing(2),
  },
}));

const MyPage = () =>  {

  const classes = useStyles();
  const history = useHistory();
  const selector = useSelector( (state) => state );
  const userName = getUserName(selector);
  const path = selector.router.location.pathname
  const id = path.split('/mypage/')[1];
  var kugiri = /\s+/;
  const name = userName.split(kugiri);
  const initName = name[0][0] + name[1][0];

  const [open, setOpen] = useState(false);
  const [s_id, setId] = useState("");
  const [prevPass, setPrevPass] = useState("");
  const [nextPass, setNextPass] = useState("");
  const [confirmNextPass, setConfirmNextPass] = useState("");
  const [count, setCount] = useState(0)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId("")
    setPrevPass('')
    setNextPass('')
    setConfirmNextPass('')
  };

  const handleIdChange = (e) => {
    setId(e.target.value)
  }

  const handlePrevPassChange = (e) => {
    setPrevPass(e.target.value)
  }

  const handleNextPassChange = (e) => {
    setNextPass(e.target.value)
  }

  const handleConfirmNextPassChange = (e) => {
    setConfirmNextPass(e.target.value)
  }

  const handlePassChange = () => {
    if( !isValidRequiredInput(s_id, prevPass, nextPass, confirmNextPass) ){
      // dispatch(hideLoadingAction());
      alert("?????????????????????????????????");
      return false;
    }
    if( prevPass.length < 6 || nextPass.length < 6 || confirmNextPass.length < 6 ){
      // dispatch(hideLoadingAction());
      alert('??????????????????6??????????????????????????????????????????');
      return false;
    }
    if(s_id.length !== 8){
      // dispatch(hideLoadingAction());
      alert('???????????????8???????????????????????????');
      return false;
    }
    if(nextPass !== confirmNextPass){
      alert('??????????????????????????????????????????????????????????????????????????????')
      return false
    } 
  }
  
  return(
    <React.Fragment>
      <div className={classes.containers}>
        <h1>???????????????</h1>

      </div>

      <MyTaskList />
      <MyGroupList />

      <Grid container justify="center">
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<FolderSharedIcon />}
          size="large"
          color="default"
          href="https://www.office.com/?omkt=ja-jp&auth=2"
          target="_blank"
          style={{ marginBottom: 50, }}
        >
          Office365???????????????
        </Button>
      </Grid>
      <Grid container justify="center" className={classes.root} >
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<VpnKeyIcon />}
          color="default"
          className={classes.button}
          style={{ marginBottom: 50, width: 230 }}
        >???????????????????????????</Button>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: 'center' }}>
              <h2>???????????????????????????</h2>
              <form autoComplete="off" className={classes.textField}>
                <TextField value={s_id} onChange={handleIdChange} className={classes.items} label="?????????????????????" id="outlined-search" type="search" variant="outlined" /><br />
                <TextField id="outlined-password-input" value={prevPass} label="??????????????????????????????" type="password" variant="outlined" onChange={handlePrevPassChange} autoComplete="current-password" /><br />
                <TextField id="outlined-password-input" value={nextPass} label="????????????????????????" type="password" variant="outlined" onChange={handleNextPassChange} autoComplete="current-password" /><br />
                <TextField id="outlined-password-input" value={confirmNextPass} label="???????????????????????????????????????" type="password" variant="outlined" onChange={handleConfirmNextPassChange} autoComplete="current-password" /><br />
              </form>
              <Button style={{ marginRight: 20 }} variant="outlined" onClick={handleClose}>??????</Button>
              <Button color="primary" variant={localStorage.getItem("darkMode") === "on" ? "contained" : "outlined"} onClick={handlePassChange}>????????????</Button>
            </div>
          </Paper>
        </Fade>
      </Modal>

    </React.Fragment>
  )
}

export default MyPage;