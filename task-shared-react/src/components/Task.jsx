import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Radio from "@material-ui/core/Radio";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: 20,
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
    width: '70%',
    textAlign: 'center',
  },
  items: {
    width: '70%',
  },
  pad: {
    marginRight: 70,
  },
  margin: {
    margin: theme.spacing(1),
    width: "70%",
  },
  nones: {
    display: 'none',
  },
  blocks: {
    display: "block",
  },
  tabs: {
    backgroundColor: '#eee',
    width: '80%',
  },
  ps: {
    backgroundColor: '#eee',
    width: '100%',
  },
  lists: {
    marginBottom: 20,
    height: 50,
    width: '100%',
  }
}));

export const Task = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedRadio, setSelectedRadio] = useState("individual");
  const [inView, setInView] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [detail, setDetail] = useState("");
  const [Dopen, setDOpen] = useState(false);
  // 個人用
  const [inTasks, setInTasks] = useState([]);
  const [inIdx, setInIdx] = useState(-1);
  // グループ用
  const [gTasks, setGTasks] = useState([]);
  const [gDIdx, setGDIdx] = useState(-1);

  // タブで使うやつ
  const theme = useTheme();
  const [value, setValue] = useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInDOpen = (i) => {
    setDOpen(true);
    setInIdx(i);
  }

  const handleGDOpen = (i) => {
    setDOpen(true);
    setGDIdx(i);
  }

  const handleDClose = () => {
    setDOpen(false);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleRadioChange = event => {
    // クリックされたら、valueの値をsetします。
    setSelectedRadio(event.target.value);
    console.log(event.target.value)
    if(event.target.value === "group"){
      setInView(true);
      // グループとユーザを取得

    }else{
      setInView(false);
    }
    
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  }

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate)
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
    console.log(progress)
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  }

  const handleSelect = (e) => {
    setTitle(e.title);
    setOpen(true);
  }

  const handleCreateButton = (e) => {
    e.preventDefault();
    if(title === ""){
      alert("タイトルが未入力です");
      return
    }
    console.log(title);
    console.log(selectedRadio);
    console.log(selectedGroup);
    console.log(selectedUser);
    console.log(selectedDate);
    console.log(progress);
    console.log(detail);
    console.log(inView);

    if(selectedRadio === "individual"){
      setInTasks(inTasks => [...inTasks, {title, selectedRadio, selectedGroup, selectedUser, selectedDate, progress, detail}]);
    }else{
      setGTasks(gTasks => [...gTasks, {title, selectedRadio, selectedGroup, selectedUser, selectedDate, progress, detail}]);
    }
    console.log(inTasks);
    console.log(gTasks);

    handleClose();
    setTitle('');
    setSelectedGroup("individual");
    setSelectedGroup('');
    setSelectedUser('');
    setSelectedDate(new Date());
  }

  const handleDelete = () => {

    if(inIdx !== -1){
      inTasks.splice(inIdx, 1);
      setInIdx(-1);
    }else{
      gTasks.splice(gDIdx, 1);
      setGDIdx(-1);
    }

    setDOpen(false);
  }

  const inTaskList = inTasks.map( (task, i) => {
    return(
      <ListItem onClick={() => handleSelect(task)} className={classes.lists} key={i} dense button >
        <ListItemText primary={task.title} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments" onClick={() => handleInDOpen(i)} >
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  });

  const gTaskList = gTasks.map( (task, i) => {
    return(
      <ListItem onClick={() => handleSelect(task)} className={classes.lists} key={i} dense button >
        <ListItemText primary={task.title} />
        <ListItemSecondaryAction >
          <IconButton edge="end" aria-label="comments"  onClick={() => handleGDOpen(i)}>
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  });

  const nums = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return(
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        <h1>タスク一覧画面</h1>
      </div>

      {/* タスク作成ボタン */}
      <Grid container justify="center">
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          onClick={handleOpen}
        >
          タスクを作成する
        </Button>
      </Grid>

      {/* タスクの表示部分 */}
      <Grid container justify="center">
        <div className={classes.tabs}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="全て" {...a11yProps(0)} />
              <Tab label="個人" {...a11yProps(1)} />
              <Tab label="グループ" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <List subheader={<ListSubheader>個人</ListSubheader>} className={classes.ps} aria-label="contacts">
                {inTaskList}
              </List>
              <Divider />
              <List subheader={<ListSubheader>グループ</ListSubheader>} className={classes.ps} aria-label="contacts">
                {gTaskList}
              </List>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
            <List subheader={<ListSubheader>個人</ListSubheader>} className={classes.ps} aria-label="contacts">
                {inTaskList}
              </List>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
            <List subheader={<ListSubheader>グループ</ListSubheader>} className={classes.ps} aria-label="contacts">
                {gTaskList}
              </List>
            </TabPanel>
          </SwipeableViews>
        </div>
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
            <h3>タスク作成画面</h3>

            <form className={classes.form} autoComplete="off">
              <TextField value={title} onChange={handleTitleChange} className={classes.items} label="タスクのタイトルを入力" id="outlined-search" type="search" variant="outlined" size="small" /><br /><br />
              <FormControl component="label">
                <RadioGroup
                  name="selectedGroup"
                  value={selectedRadio}
                  row aria-label="position"
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="individual"
                    control={<Radio color="primary" />}
                    label="個人"
                  />
                  <FormControlLabel
                    value="group"
                    control={<Radio color="primary" />}
                    label="グループ"
                    
                  />
                </RadioGroup>
              </FormControl><br /><br />
              
              <div className={
                inView ? classes.blocks : classes.nones
              }>
                <TextField value={selectedGroup} className={classes.items} label="グループを選択" id="outlined-search" type="search" variant="outlined" size="small" onChange={handleGroupChange} /><br /><br />
                <TextField value={selectedUser} className={classes.items} label="ユーザを選択" id="outlined-search" type="search" variant="outlined" size="small" onChange={handleUserChange} /><br />
              </div>
              
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="期限日（任意）"
                    format="yyyy/MM/dd"
                    className={classes.items}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
              </MuiPickersUtilsProvider><br />
              <FormControl variant="outlined" className={classes.margin}>
                <InputLabel htmlFor="outlined-age-native-simple">進捗</InputLabel>
                <Select
                  native
                  value={progress}
                  onChange={handleProgressChange}
                  label="進捗"
                  inputProps={{
                    name: 'progress',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {nums.map( (num, i) => {
                    return(
                      <option key={i} value={num}>{num}％</option>
                    )
                  })}
                </Select>
              </FormControl><br />
              <TextField
                id="filled-multiline-static"
                label="詳細（任意）"
                multiline
                rows={4}
                className={classes.items}
                variant="filled"
                value={detail}
                onChange={handleDetailChange}
              /><br /><br />
              <Button className={classes.pad} variant="outlined" size="large" onClick={handleClose}>戻る</Button>
              <Button color="primary" variant="outlined" size="large" onClick={handleCreateButton} >作成</Button>
            </form>

          </div>
        </Fade>
      </Modal>

      <Dialog
      open={Dopen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"このタスクを削除しますか？"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDClose} color="primary">
            削除しません
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            削除します
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  )
}