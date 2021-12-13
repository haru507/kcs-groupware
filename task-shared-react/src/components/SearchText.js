import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import CommentIcon from '@material-ui/icons/Comment';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {getUser} from '../reducks/users/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {URL} from '../URL'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3px 5px',
    marginRight: 80,
    display: 'flex',
    alignItems: 'center',
    width: 300,
    height: 40,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  list: {
    position: 'absolute',
    top: 53,
    right: 104,
    width: '100%',
    // height: 200,
    maxWidth: 300,
    backgroundColor: 'whitesmoke',
    color: 'black',
  },
  list2: {
    position: 'absolute',
    top: 53,
    right: 104,
    width: '100%',
    // height: 200,
    maxWidth: 300,
    backgroundColor: '#000',
  },
}));

const SearchText = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [userLists, setUserLists] = useState([]);

  const history = useHistory();
  const path = history.location.pathname;
  const id = path.split('/')[2];

  const selector = useSelector( state => state);
  const mySelf = getUser(selector);

  const userSearch = (e) => {
    setUsername(e.target.value);
    if(username !== ""){
      const usernameUrl = `${URL}userSearch/${username}`
      // const usernameUrl = `http://10.24.106.218/api/userSearch/${username}`
      // const usernameUrl = `http://10.24.106.157/api/userSearch/${username}`
      // const usernameUrl = `http://localhost/api/userSearch/${username}`
      axios.get(usernameUrl, {headers:{"Content-Type": "application/json"}})
      .then( response => {
        if(response.data.length !== 0){
          setUserLists(response.data)
          return;
        }
        setUserLists([])
      })
      .catch( (error) => {
        throw new Error(error);
      })
    }
  }

  const roomSearch = (list) => {
    console.log(id)
    const getChatUrl = `${URL}/userSearch/${id}/${list.name}`;
    // const getChatUrl = `http://10.24.106.218/api/userSearch/${id}/${list.name}`;
    // const getChatUrl = `http://10.24.106.157/api/userSearch/${id}/${list.name}`;
    // const getChatUrl = `http://localhost/api/userSearch/${id}/${list.name}`;
    axios.get(getChatUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        const result = response.data;
        // console.log(response.data[0].room_id);
        console.log(result == false);
        console.log(result);
        if(result == false){
          // チャットルームを作成
          let data = JSON.stringify({
            myUser_id: mySelf.user_id,
            myRoom_name: list.name,
            otherUser_id: list.user_id,
            otherRoom_name: mySelf.name,
          });
          console.log(data)
          const createChatUrl = `${URL}chatroom/create`;
          // const createChatUrl = `http://10.24.106.218/api/chatroom/create`;
          // const createChatUrl = `http://10.24.106.157/api/chatroom/create`;
          // const createChatUrl = `http://localhost/api/chatroom/create`;
          axios.post(createChatUrl, data, {headers:{"Content-Type": "application/json"}})
          .then(response => {
            console.log(response.data)
            const room_name = response.data.room_name
            const room_id = response.data.room_id
            setUsername('')
            history.push(`/chat/${id}/${room_name}/${room_id}`)
          })
        }else {
          history.push(`/chat/${id}/${list.name}/${response.data[0].room_id}`)
          // dispatch(push(`/chat/${id}/${name}/${response.data[0].room_id}`))
          setUsername('')
        }
        
      })
  }

  return (
    <React.Fragment>
        <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="ユーザ検索（ローマ字）"
          onChange={userSearch}
          value={username}
        />
        <IconButton className={classes.iconButton} >
          <SearchIcon />
        </IconButton>
      </Paper>
      {username !== ""
        ?
        <List className={localStorage.getItem("darkMode") === "on" ? classes.list2 : classes.list}>
          {userLists.length !== 0
            ?
            userLists.map( (list) => {
              return (
                <React.Fragment>
                  <ListItem key={list.user_id} role={undefined} dense>
                    <ListItemText primary={list.name} />
                    {list.user_id !== Number(id)
                      ?
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments" onClick={() => roomSearch(list)}>
                        <CommentIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                      :
                    <></>
                    }
                  </ListItem>
                  <Divider/>
                </React.Fragment>
              )
            })
            :
            <ListItem role={undefined} dense>
              <ListItemText primary="ユーザが存在しません。" />
            </ListItem>
          }
        </List>
          :
        <></>
        }
      
      </React.Fragment>
    );
  }

export default SearchText;