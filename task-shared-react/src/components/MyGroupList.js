import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import { getUserId } from '../reducks/users/selectors';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {URL} from '../URL'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    backgroundColor: '#eee',
    marginTop: 30,
    marginBottom: 30,
  },
  root2: {
    width: 600,
    backgroundColor: '#000',
    marginTop: 30,
    marginBottom: 30,
  }
}));

const MyGroupList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const id = getUserId(selector);
  const [GroupLists, setGroupLists] = useState([]);
  const history = useHistory()

  // idを使って所属グループを表示する
  useEffect( () => {
    const getGroupUrl = `${URL}group/read/${id}`;
    // const getGroupUrl = `http://10.24.106.218/api/group/read/${id}`;
    // const getGroupUrl = `http://10.24.106.157/api/group/read/${id}`;
    // const getGroupUrl = `http://localhost/api/group/read/${id}`;
    axios.get(getGroupUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        if(response.data.length === 0) {
          return;
        }
        for(let i=0; i<response.data.length; i++){
          const userLists = response.data[i][1]

          const groups = {
            group_id: response.data[i][0][0].group_id,
            name: response.data[i][0][0].name,
          }
          setGroupLists(GroupLists => [...GroupLists, {groups, userLists}])
        }
      })
      .catch( () => {
        throw new Error('エラーが発生しました。');
      })
  },[])

  return (
    <Grid container justify="center">
      <div className={localStorage.getItem("darkMode") === "on" ? classes.root2 : classes.root}>
        <List 
          component="nav"
          aria-label="secondary mailbox folders"
          subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            所属グループ
          </ListSubheader>
        }>
          <Divider />
          {GroupLists && GroupLists.map( group => (
            <ListItem key={group.groups.group_id}>
              <ListItemText primary={group.groups.name} />
              <Tooltip title="チャット一覧画面へ移動">
                <IconButton onClick={() => history.push(`/chatroom/${id}`)}><ChatIcon /></IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </div>
    </Grid>
  );
}

export default MyGroupList;