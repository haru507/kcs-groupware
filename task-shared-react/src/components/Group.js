import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover';
import { useHistory } from "react-router-dom";
import { hideLoadingAction, showLoadingAction} from '../reducks/loading/actions';
import Fab from '@material-ui/core/Fab'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {getUser} from '../reducks/users/selectors';
import {useDispatch, useSelector} from 'react-redux';
import GitHubIcon from '@material-ui/icons/GitHub';
import {URL} from '../URL'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: 20
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
    textAlign: 'center',
  },
  items: {
    width: '70%',
    marginBottom: 40,
  },
  pad: {
    marginRight: 70,
  },
  cards: {
    width: "80%",
    marginTop: 30,
  },
  media: {
    height: 140,
  },
  list: {
    position: 'relative',
    top: -50,
    left: '15%',
    width: '70%',
    // backgroundColor: 'whitesmoke',
    // color: 'black',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    position: 'relative',
    top: -30,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  typography: {
    padding: theme.spacing(2),
  },
  pop: {
    position: 'fixed',
    bottom: 10,
  }
}));

const Group = () => {
  const selector = useSelector( state => state);
  const mySelf = getUser(selector);
  console.log(mySelf)
  const history = useHistory();
  const dispatch = useDispatch();
  const path = history.location.pathname;
  const id = path.split('/')[2];
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [user, setUser] = useState([]);
  const [lists, setLists] = useState([]);
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false)
  const [gid, setGid] = useState(0);
  const [prevUserLists, setPrevUserLists] = useState([]);

  const [userLists, setUserLists] = useState([mySelf]);
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [leader, setLeader] = useState(0)

  const [text, setText] = useState("");
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open0 = Boolean(anchorEl2);
  const id0 = open0 ? 'simple-popover' : undefined;
  const handleClick2 = (e) => {
    setText(e);
    setAnchorEl2(e);
  };

  const handleClose0 = () => {
    setText('')
    setAnchorEl2(null);
  };

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
            leader: response.data[i][0][0].leaderUser_id,
          }
          setLists(lists => [...lists, {groups, userLists}])
        }
      })
      .catch( () => {
        throw new Error('エラーが発生しました。');
      })

    
  },[])

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPrevUserLists([])
    setName('')
    setUsername("")
    setUserLists([mySelf])
    setBool(false);
    setBool2(false);
    setGid(0)
    setLeader(0)
  }

  // 非同期通信
  const handleUserChange = (e) => {
    setUsername(e.target.value);
    if(username !== ""){
      const usernameUrl = `${URL}userSearch/${username}`
      // const usernameUrl = `http://10.24.106.218/api/userSearch/${username}`
      // const usernameUrl = `http://10.24.106.157/api/userSearch/${username}`
      // const usernameUrl = `http://localhost/api/userSearch/${username}`
      axios.get(usernameUrl, {headers:{"Content-Type": "application/json"}})
      .then( response => {
        if(response.data.length !== 0){
          setUser(response.data)
          return;
        }
        setUser([])
      })
      .catch( (error) => {
        throw new Error(error);
      })
    }

  }
  const handleGroupNameChange = (e) => {
    
    setName(e.target.value);
  }

  const handleSubmit = () => {
    if(name === ''){
      alert('グループ名が未入力です。');
      return;
    }
    if(!leader || leader === 0){
      alert('リーダーを選択してください。');
      return;
    }
    console.log(name);
    console.log(userLists);
    console.log({name, userLists});
    // dispatch(createGroup({name, userLists}, id))
    dispatch(showLoadingAction('downloading...'));
    const createGroupUrl = `${URL}group/create/${id}`;
    // const createGroupUrl = `http://10.24.106.218/api/group/create/${id}`;
    // const createGroupUrl = `http://10.24.106.157/api/group/create/${id}`;
    // const createGroupUrl = `http://localhost/api/group/create/${id}`;
    axios.post(createGroupUrl, {name, userLists, leader}, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        console.log(response.data)
        if(response.data.length === 0) {
          return;
        }
        const groups = {
          group_id: response.data,
          name,
          leader,
        }
        setLists(lists => [...lists, {groups, userLists}]);
      })
      .catch( () => {
        throw new Error('エラーが発生しました。');
      })
    let name1 = name
    
    console.log(lists);
    dispatch(hideLoadingAction());
    handleClose();

    handleClick2(`グループ【${name1}】を作成しました。`)
    setTimeout( () => {
      handleClose0()
    },2000)
  }

  const handleNameChange = () => {
    if(name === ""){
      alert('グループ名が未入力です。');
      return;
    }

    const changeGroupNameUrl = `${URL}group/nameChange/${gid}`;
    // const changeGroupNameUrl = `http://10.24.106.218/api/group/nameChange/${gid}`;
    // const changeGroupNameUrl = `http://10.24.106.157/api/group/nameChange/${gid}`;
    // const changeGroupNameUrl = `http://localhost/api/group/nameChange/${gid}`;
    axios.post(changeGroupNameUrl, {name}, {headers:{"Content-Type": "application/json"}})
      .then( () => {
        const groupLists = lists;
        
        // console.log((groupLists.filter( groupList => groupList.groups.group_id === gid)).[0].groups.name = name);
        (groupLists.filter( groupList => groupList.groups.group_id === gid)).groups.name = name;
        let data = Object.assign([], groupLists)
        console.log(data)
        setLists(data);
      })
    let name1 = name;
    console.log(lists);
    handleClose();

    handleClick2(`グループ名を【${name1}】変更しました。`)
    setTimeout( () => {
      handleClose0()
    },2000)
  }

  const handleUpdateSubmit = () => {
    if(name === ''){
      alert('グループ名が未入力です。');
      return;
    }
    dispatch(showLoadingAction('downloading...'));
    const updateList = userLists.filter(user =>{ 
      return !prevUserLists.some(prevList => {
        return user.user_id === prevList.user_id
      });
    });
    console.log(updateList)
    const updateGroupUrl = `${URL}group/update/${gid}`;
    // const updateGroupUrl = `http://10.24.106.157/api/group/update/${gid}`;
    // const updateGroupUrl = `http://10.24.106.218/api/group/update/${gid}`;
    // const updateGroupUrl = `http://localhost/api/group/update/${gid}`;
    axios.post(updateGroupUrl, {updateList}, {headers:{"Content-Type": "application/json"}})
      .then(() => {
        const groupLists = lists;
        // (groupLists.filter( groupList => groupList.groups.group_id === gid)).userLists.push(updateList[0]);
        updateList.map(ul => {
          (groupLists.filter( groupList => groupList.groups.group_id === gid)).userLists.push(ul);
        })
        
        setLists(groupLists);
      })
    console.log(lists);
    dispatch(hideLoadingAction());
    handleClose();

    handleClick2("グループにユーザを追加しました。")
    setTimeout( () => {
      handleClose0()
    },2000)
  }

  const handleUserDelete = (list) => {
    const group_id0 = list.groups.group_id;
    const deleteGroupUrl = `${URL}group/delete/${id}/${group_id0}`;
    // const deleteGroupUrl = `http://10.24.106.218/api/group/delete/${id}/${group_id0}`;
    // const deleteGroupUrl = `http://10.24.106.157/api/group/delete/${id}/${group_id0}`;
    // const deleteGroupUrl = `http://localhost/api/group/delete/${id}/${group_id0}`;
    axios.get(deleteGroupUrl, {headers:{"Content-Type": "application/json"}})
      .then(() => {
        const groupLists = lists;
        const index = groupLists.findIndex(groupList => groupList.groups.group_id === group_id0)
        // const userIndex = groupLists[index].userLists.findIndex(uls => uls.user_id === Number(id))
        groupLists.splice(index, 1)
        console.log(groupLists)
        let data = Object.assign([], groupLists)
        setLists(data);
      })
    handleMenuClose();
    handleClick2(`【${list.groups.name}】を退会しました。`)
    setTimeout( () => {
      handleClose0()
    },2000)
    
  }

  const handleSelect = (list) => {
    setBool(true);
    console.log(list)
    console.log(list.name)
    setName(list.groups.name)
    setUserLists(list.userLists)
    setPrevUserLists(list.userLists)
    setGid(list.groups.group_id)
    setLeader(list.groups.leader)
    // setGid(i)
    setOpen(true);
  }

  const handleNameSelect = (list) => {
    setBool2(true);
    console.log(list)
    console.log(list.name)
    setName(list.groups.name)
    setUserLists(list.userLists)
    setPrevUserLists(list.userLists)
    setGid(list.groups.group_id)
    setLeader(list.groups.leader)
    // setGid(i)
    setOpen(true);
  }

  const handleAddUser = (user) => {
    if(userLists.length === 0){
      setUserLists(userLists => [...userLists, user])
      return;
    }
    
    for(let i = 0; i<userLists.length; i++){
      if(userLists[i].user_id === user.user_id){
        return;
      }
    }
    setUserLists(userLists => [...userLists, user])
  }

  const leaderSelect = (uid) => {
    setLeader(uid)
    console.log(uid)
  }

  const deleteUser = (uid) => {
    if(uid === leader) {
      setLeader(0)
    }
    const cpList = userLists.filter(ul => ul.user_id !== uid)
    setUserLists(cpList)
  }

  return(
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        <h1>グループ一覧画面</h1>
      </div>

      <Grid container justify="center">
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          onClick={handleOpen}
        >
          グループを作成する
        </Button>
      </Grid>

      <Grid container justify="center">
        {lists && lists.map( (list, i) => {
          console.log(list)
          return(
            <Paper className={classes.cards} elevation={3}>
            <Card key={i} >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" />
                }
                // action={
                //   <Fab style={{ marginTop: 8 }} size="small" variant="extended" onClick={() => handleUserDelete(list)} aria-label="settings">
                //     <ExitToAppIcon />
                //     退会する
                //   </Fab>
                // }
                title={list.groups.name}
                subheader=""
              />
              <>
              {
                list.userLists.map(userList => {
                  return(
                    <Chip
                      style={{ marginLeft: 7 }}
                      key={userList.user_id} size="small"
                      label={userList.name}
                      icon={Number(list.groups.leader) === Number(userList.user_id) ? <GitHubIcon /> : ""} />
                  )
                })
              }
              </>
              <CardActions>
                {
                  list.groups.leader === Number(id)
                  ?
                  <>
                    <Button onClick={ () => handleSelect(list)} size="small" color="primary" variant={localStorage.getItem("darkMode") === "on" ? "contained" : "outlined"}>
                      グループにユーザを追加
                    </Button>
                    <Button onClick={ () => handleNameSelect(list)} size="small" color="primary" variant={localStorage.getItem("darkMode") === "on" ? "contained" : "outlined"}>
                      グループ名を編集
                    </Button>
                  </>
                  :
                  <></>
                }
                
              </CardActions>
            </Card>
            </Paper>
          )
        })}
        
      </Grid>

      {/* ここがモーダル部分 */}
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
        {/* モーダルの中身 */}
        <Fade in={open}>
          <div className={classes.paper}>
            <h3>{bool ? "グループ編集画面" : bool2 ? "グループ名編集画面" : "グループ作成画面"}</h3>

            <form className={classes.form} autoComplete="off">
              {bool
                ?
                <h3>{name}</h3>
                :
                <TextField value={name} className={classes.items} label="※グループ名を入力" id="outlined-search" type="search" variant="outlined" size="small" onChange={handleGroupNameChange} />
              }
              <br />
              {bool2 
                ?
                <></>
                :
                <TextField value={username} className={classes.items} label="※ユーザの名前を入力" id="outlined-search" type="search" variant="outlined" size="small" onChange={handleUserChange} />
              }
              {username !== ""
                ?
                <List className={classes.list}>
                  {user.length !== 0
                    ?
                    user.map( (list) => {
                      return (
                        <React.Fragment>
                          <ListItem key={list.user_id} role={undefined} dense>
                            <ListItemText primary={list.name} />
                            {list.user_id !== Number(id)
                              ?
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="comments" onClick={() => handleAddUser(list)}>
                                <GroupAddIcon />
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
              <div className={classes.root}>
              {
                userLists && userLists.map( (userList, i) => (
                  <Chip
                    key={i}
                    label={userList.name}
                    className={classes.chip}
                    size="small"
                    onClick={!bool && !bool2 ? () => leaderSelect(userList.user_id) : ""}
                    icon={leader === userList.user_id ? <GitHubIcon /> : ""}
                    onDelete={!bool && !bool2 && Number(id) !== userList.user_id ? () => deleteUser(userList.user_id) : ""}
                  />
                ))
              }
              </div>
              {
                !bool && !bool2
                ?
                <Typography style={{ marginBottom: 15 }}>※チップをクリックしてリーダーを1人選択してください。</Typography>
                :
                <></>
              }
              <Button className={classes.pad} variant="outlined" size="large" onClick={handleClose} >戻る</Button>
              <Button color="primary" variant={localStorage.getItem("darkMode") === "on" ? "contained" : "outlined"} size="large" onClick={bool ? handleUpdateSubmit : bool2 ? handleNameChange : handleSubmit} >{ bool ? "変更" : bool2 ? "変更" : "作成"}</Button>
            </form>

          </div>
        </Fade>
      </Modal>

      <Popover
        id={id0}
        open={open0}
        anchorEl={anchorEl2}
        onClose={handleClose0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.pop}
      >
        <Typography className={classes.typography}>{text}</Typography>
      </Popover>
      <div className="module-spacer--extra-small" /> 
    </React.Fragment>
  )
}

export default Group;