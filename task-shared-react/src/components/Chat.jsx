import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ClearIcon from '@material-ui/icons/Clear';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { getMessage, initMessage, deleteMessage } from '../reducks/chat/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from '../reducks/users/selectors';
import { getMessages } from '../reducks/chat/selectors';
import Pusher from 'pusher-js';
import { hideLoadingAction, showLoadingAction} from '../reducks/loading/actions';
import format from 'date-fns/format'
import { URL } from '../URL'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '84%',
    position: 'fixed',
    bottom: 0,
    textAlign: "center",
    backgroundColor: '#f5f5f5',
    height: 60,
  },
  root2: {
    width: '84%',
    position: 'fixed',
    bottom: 0,
    textAlign: "center",
    backgroundColor: '#000',
    height: 60,
  },
  textField: {
    '&.MuiTextField-root': {
      width: '50%',
    },
  },
  appbar: {
    flexGrow: 1,
    position: 'fixed',
    zIndex: 9999,
    width: "84%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  cards: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,
  },
  inline: {
    display: 'inline',
  },
  mes: {
    marginLeft: 70,
    minHeight: 50,
  },
  aaa: {
    paddingTop: 60,
  },
  green: {
    backgroundColor: green[300],
  },
}));

const Chat_Area = () => {
  const messagesEndRef = React.useRef(null)
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector( (state) => state);
  const name = getUserName(selector);
  const [userLists, setUserLists] = useState([])

  const [message, setMessage] = useState("");
  const [lists, setLists] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [listIndex, setListIndex] = useState(0);
  const [did, setDid] = useState(0);
  const path = history.location.pathname;
  const route = path.split('/chat/')[1];
  const id = route.split('/');
  const kugiri = /\s+/;
  const iniName = name.split(kugiri)
  const oName = id[1].split(kugiri);
  console.log(id[0])
  console.log(id)

  const socket = new Pusher("d3389a4027b76c095f3a", {
    cluster: 'ap3',
    encrypted: true,
  });

  const handleOpen = (id,i) => {
    setOpen(true);
    setListIndex(i);
    setDid(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(message === ''){
      alert('文字を入力してください。');
      return false;
    }
    dispatch(showLoadingAction('Sending...'));
    const data = JSON.stringify({
      user_id: id[0],
      room_id: id[2],
      message: message,
    });

    const getMessageUrl = `${URL}chat/add`;
    // const getMessageUrl = 'http://10.24.106.218/api/chat/add';
    // const getMessageUrl = 'http://10.24.106.157/api/chat/add';
    // const getMessageUrl = 'http://localhost/api/chat/add';
    axios.post(getMessageUrl, data, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        const chat = response.data[0];
        console.log(chat)
        console.log(response.data[0])
        dispatch(getMessage(chat));
        // setLists(lists => [...lists, {chat}]);
        
        setLists(lists => [...lists, chat]);
        scrollToBottom1();
        return
      })
      .catch( (e) => {
        dispatch(hideLoadingAction());
        throw new Error('エラーが発生しました。');
      })
    // setLists(data);
    setMessage("");
    dispatch(hideLoadingAction());
  }

  const handleDelete = () => {
    dispatch(showLoadingAction('Deleting...'));
    // 先にDBの値を削除
    const deleteMessageUrl = `${URL}chat/${id[0]}/${id[2]}/${did}/${id[3]}`;
    // const deleteMessageUrl = `http://10.24.106.218/api/chat/${id[0]}/${id[2]}/${did}/${id[3]}`;
    // const deleteMessageUrl = `http://10.24.106.157/api/chat/${id[0]}/${id[2]}/${did}/${id[3]}`;
    // const deleteMessageUrl = `http://localhost/api/chat/${id[0]}/${id[2]}/${did}`;
      axios.delete(deleteMessageUrl, {headers:{"Content-Type": "application/json"}})
        .then( response => {
          const deleteMes = response.data;
          console.log(deleteMes);
          dispatch(deleteMessage(deleteMes));
          // 削除処理追加
          const result = getMessages(selector);
          console.log(result)
          // setLists(result);
          setLists(lists.filter((list) => list.id !== deleteMes));
          scrollToBottom();
        })
        .catch( () => {
          dispatch(hideLoadingAction());
          throw new Error('メッセージの削除ができませんでした。');
        })

    setOpen(false);
    dispatch(hideLoadingAction());
  }
  //一番下まで移動する。
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "start" })
  }

  const scrollToBottom1 = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: "start" })
  }

  useEffect( () => {
    if(id === '') {
      throw new Error("ユーザIDを取得できていません。");
    }
      dispatch(showLoadingAction('Updating...'));
      const initMessageUrl = `${URL}chat/${id[0]}/${id[2]}`;
      // const initMessageUrl = `http://10.24.106.218/api/chat/${id[0]}/${id[2]}`;
      // const initMessageUrl = `http://10.24.106.157/api/chat/${id[0]}/${id[2]}`;
      // const initMessageUrl = `http://localhost/api/chat/${id[0]}/${id[2]}`;
      axios.get(initMessageUrl, {headers:{"Content-Type": "application/json"}})
        .then((response) => {
          if(response.data.length === 0) {
            dispatch(hideLoadingAction());
            return　false;
          }
          const chats = response.data;
          dispatch(initMessage(chats));

          const result = getMessages(selector);
          setLists(chats);
          scrollToBottom()
          dispatch(hideLoadingAction());
        })

      if(id[3] != null){
        console.log(id[3])
        const getChatsUserUrl = `${URL}chat1/${id[3]}`;
        // const getChatsUserUrl = `http://10.24.106.218/api/chat1/${id[3]}`;
        // const getChatsUserUrl = `http://10.24.106.157/api/chat1/${id[3]}`;
        // const getChatsUserUrl = `http://localhost/api/chat1/${id[3]}`;
        axios.get(getChatsUserUrl, {headers:{"Content-Type": "application/json"}})
          .then((response) => {
            if(response.data.length === 0) {
              dispatch(hideLoadingAction());
              return　false;
            }
            const users = response.data;
            setUserLists(users)
          })
      }
    
  }, []);

  useEffect( () => {
    if(!id[3]){
      const channel = socket.subscribe(`chat-${id[0]}-${id[2]}`);
      channel.bind('chat-delete', (data) => {
        if(JSON.stringify(data[0]) !== '{}'){
          const mid = Number(data[0].id);
          console.log(mid)
          dispatch(deleteMessage(mid));
          const result = getMessages(selector);
          console.log(result);
          console.log(lists);
          if(lists !== null){
            setLists(lists.filter((list) => list.id !== mid));
          }
          // const newArray = [...lists[0], data];
          // setLists(lists => [...lists, data[0]]);
          
          scrollToBottom()
        }
      })
    }else{
      const channel = socket.subscribe(`chat-${id[3]}`);
      channel.bind('chat-delete', (data) => {
        if(JSON.stringify(data[0]) !== '{}'){
          const mid = Number(data[0].id);
          console.log(mid)
          dispatch(deleteMessage(mid));
          const result = getMessages(selector);
          console.log(result);
          console.log(lists);
          if(lists !== null){
            setLists(lists.filter((list) => list.id !== mid));
          }
          // const newArray = [...lists[0], data];
          // setLists(lists => [...lists, data[0]]);
          
          scrollToBottom()
        }
      })
    }
    
  }, [lists])

  useEffect( () => {
    if(!id[3]){
      const channel = socket.subscribe(`chat-${id[0]}-${id[2]}`);
      channel.bind('chat', (data) => {
        if(JSON.stringify(data[0]) !== '{}'){
          const resData = JSON.stringify({
            id: data[0].id,
            user_id: data[0].user_id,
            room_id: data[0].room_id,
            message: data[0].message,
            created_at: data[0].created_at,
            updated_at: data[0].updated_at,
          });
          dispatch(getMessage(resData));
          // const result = getMessages(selector);
          // setLists(result);
          // const newArray = [...lists[0], data];
          setLists(lists => [...lists, data[0]]);
          console.log(lists)
          scrollToBottom1()
        }
      })
    }else {
      const channel = socket.subscribe(`chat-${id[3]}`);
      channel.bind('chat', (data) => {
        if(JSON.stringify(data[0]) !== '{}'){
          const resData = JSON.stringify({
            id: data[0].id,
            user_id: data[0].user_id,
            room_id: data[0].room_id,
            message: data[0].message,
            created_at: data[0].created_at,
            updated_at: data[0].updated_at,
          });
          dispatch(getMessage(resData));
          // const result = getMessages(selector);
          // setLists(result);
          // const newArray = [...lists[0], data];
          setLists(lists => [...lists, data[0]]);
          console.log(lists)
          scrollToBottom1()
        }
      })
    }
    
  }, [])

  return(
    <React.Fragment>
      <div className={classes.appbar}>
        <AppBar position="static" color="default" >
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ () => history.goBack() } >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {id[1]}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className={classes.aaa} />

      <Grid container alignItems="center" justify="center">
        {console.log(lists)}
        {lists && lists.map( (list, i) => (
            <Card key={list.id} className={classes.cards}>
              {
                userLists && userLists.length !== 0
                  ?
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={list.user_id === Number(id[0]) ? classes.green : ""}
                    >
                      {
                      list.user_id === Number(id[0])
                      ?
                      iniName[0][0] + iniName[1][0]
                      :
                      (userLists.filter(userList => Number(userList.user_id) === Number(list.user_id)))[0].name.split(/\s+/)[0][0] + (userLists.filter(userList => Number(userList.user_id) === Number(list.user_id)))[0].name.split(/\s+/)[1][0]
                    }
                    </Avatar>
                  }
                  action={
                    <IconButton onClick={() => handleOpen(list.id, i)} aria-label="settings">
                      <ClearIcon />
                    </IconButton>
                  }
                  subheader={
                    list.user_id === Number(id[0])
                    ?
                    name
                    :
                    (userLists.filter(userList => Number(userList.user_id) === Number(list.user_id)))[0].name
                  }
                />
                  :
                <CardHeader
                  avatar={
                    <Avatar
                    aria-label="recipe"
                    className={list.user_id === Number(id[0]) ? classes.green : ""}
                    >
                    {
                      list.user_id === Number(id[0])
                      ?
                      iniName[0][0] + iniName[1][0]
                      :
                      oName[0][0] + oName[1][0]
                    }
                    </Avatar>
                  }
                  action={
                    <IconButton onClick={() => handleOpen(list.id, i)} aria-label="settings">
                    <ClearIcon />
                    </IconButton>
                  }
                  subheader={
                    list.user_id === Number(id[0])
                    ?
                    name
                    :
                    id[1]
                  }
                />
              }
              
              <Typography className={classes.mes}>
                {list.message}
              </Typography>
              <Typography style={{ textAlign: 'right', marginRight: 20, color: 'gray' }}>
                {format(new Date(list.created_at), 'yyyy/MM/dd HH:mm:ss')}
              </Typography>
            </Card>
          )
        )}
      </Grid>

      <div ref={messagesEndRef} >
        <br/>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"このメッセージを削除しますか？"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            削除しません
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            削除します
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.aaa} />

      <form className={localStorage.getItem("darkMode") === "on" ? classes.root2 : classes.root} autoComplete='off' >
        <Grid container alignItems="center" justify="center" style={{ marginTop: 9 }} >
          <TextField className={classes.textField} value={message} id="outlined-search" type="search" variant="outlined" size="small" onChange={handleChange} />
          <Button color="primary" variant={localStorage.getItem("darkMode") === "on" ? "contained" : "outlined"} size="large" onClick={handleSubmit} >送信</Button>
        </Grid>
      </form>
    </React.Fragment>
  )
}

export default Chat_Area;