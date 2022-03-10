import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ClearIcon from '@material-ui/icons/Clear';
import { NavLink, useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { URL } from '../URL'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
  },
  box: {
    height: 80,
  }
}));


const Chat = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.split('/chatroom/')[1];
  const classes = useStyles();
  const [lists, setLists] = useState([]);

  useEffect( () => {
    if(id === '') {
      throw new Error("ユーザIDを取得できていません。");
    }
    const getChatUrl = `${URL}chatroom/${id}`;
    // const getChatUrl = `http://10.24.106.218/api/chatroom/${id}`;
    // const getChatUrl = `http://10.24.106.157/api/chatroom/${id}`;
    // const getChatUrl = `http://localhost/api/chatroom/${id}`;
    axios.get(getChatUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        console.log(response)
        if(response.data.length === 0) {
          return;
        }
        const chats = response.data;
        console.log(chats);
        setLists(chats);
      })
    console.log(lists.room_id);

  }, []);

  

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>チャット一覧画面</h1>
      <Grid container alignItems="center" justify="center">
        <List className={classes.root}>
          {lists.map((list) => {
            return (
                <ListItem className={classes.box} key={list.room_id} dense button component={NavLink} to={list.group_id == null ? `/chat/${list.user_id}/${list.room_name}/${list.room_id}` : `/chat/${list.user_id}/${list.room_name}/${list.room_id}/${list.group_id}`} >
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText primary={list.room_name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <ClearIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            );
          })}
        </List>
      </Grid>
    </React.Fragment>
  );
}

export default Chat;