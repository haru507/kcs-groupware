import React, {useState, useEffect} from 'react'
import format from 'date-fns/format'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfWeek from 'date-fns/endOfWeek'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import isSameMonth from 'date-fns/isSameMonth'
import isSameDay from 'date-fns/isSameDay'
import addWeeks from 'date-fns/addWeeks'
import startOfWeek from 'date-fns/startOfWeek'
import isThisWeek from 'date-fns/isThisWeek'
import isToday from 'date-fns/isToday'
import isWithinInterval from 'date-fns/isWithinInterval'
import subDays from 'date-fns/subDays'

import MenuItem from '@material-ui/core/MenuItem';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Radio from "@material-ui/core/Radio";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Backdrop from '@material-ui/core/Backdrop';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Popover from '@material-ui/core/Popover';
import CachedIcon from '@material-ui/icons/Cached';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HistoryIcon from '@material-ui/icons/History';
import DialogContentText from '@material-ui/core/DialogContentText';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import jaLocale from 'date-fns/locale/ja'

import Circle from 'react-circle';
import { Divider } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux';
import { getUserName } from '../reducks/users/selectors';
import { isValidRequiredInput, checkDateInterval } from '../function/common';
import { URL } from '../URL'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(3, 5),
    padding: theme.spacing(5, 5),
  },
  yearMonth: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  tableHead: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: '#999',
  },
  tables: {
    width: '100%',
  },
  heights: {
    height: '50%'
  },
  button: {
    margin: theme.spacing(1),
    marginBottom: 20,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper0: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '50%',
    textAlign: 'center',
  },
  paper10: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',
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
  },
  tabs12: {
    backgroundColor: '#eee',
    flexGrow: 1,
    position: 'fixed',
    zIndex: 99,
    width: "84%",
  },
  ps: {
    backgroundColor: '#eee',
    width: '100%',
  },
  lists: {
    marginBottom: 20,
    height: 50,
    width: '100%',
  },
  chips: {
    display: 'flex',
    // justifyContent: 'space-betWeen',
    // flexFlow: 'column',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  tab: {
    flexGrow: 1,
  },
  circles: {
    marginTop: 30,
  },
  tc: {
    marginTop: 40,
    width: "90%",
    marginLeft: '4%',
  },
  btn: {
    position: "fixed",
    bottom: 30,
    right: 20,
  },
  formControl: {
    width: "30%",
    marginLeft: '34%'
  },
  formControl1: {
    position: 'absolute',
    top: 150,
    left: 350,
    width: 150,
    height: 30,
  },
  paper1: {
    width: 1200,
    marginLeft: '2%',
    display: 'flex',
    marginTop: 40,
    // minHeight: 500,
    paddingBottom: 10,
  },
  paper2: {
    width: '100%',
    minHeight: 600,
  },
  geogia: {
    width: '51%',
    marginLeft: 10,
  },
  geogia0: {
    width: '45%',
    marginLeft: 10,
    marginTop: 85,
  },
  b: {
    height: 15,
    width: 5,
  },
  division: {
    marginLeft: '2%',
    display: 'flex',
    marginTop: 20,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    width: '90%',
    marginTop: 15,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  green: {
    color: '#81c784',
  },
  typography: {
    padding: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 400,
  },
  formControl01: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 120
  },
}));

const getCalendarArray = date => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  })
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
  )
}

const getCalendarArray0 = date => {
  const sundays = eachWeekOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date)
  })
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
  )
}

const useCalendarCellStyles = makeStyles(theme => ({
  calendarCell: {
    width: '14.2%',
    color: ({wday, isTargetMonth}) => {
      if(isTargetMonth) {
        switch(wday) {
          case 0: // Sunday
            return red[500]
          case 6: // Saturday
            return blue[500]
          default:
            return theme.palette.text.primary
        }
      } else {
        // previous or next month
        switch(wday) {
            case 0: // Sunday
            return red[200]
          case 6: // Saturday
            return blue[200]
          default:
            return theme.palette.text.secondary
        }
      }
    },
    backgroundColor: ({isToday}) =>
      isToday ? localStorage.getItem("darkMode") === "on" ? '#9370DB' : pink[50] : "transparent",
  },
}))

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy MMM", { locale: this.locale });
  }
  getDatePickerHeaderText(date) {
    return format(date, "MMMd日", { locale: this.locale });
  }
}

const Calendar = () => {
  const [targetDate, setTargetDate] = useState(new Date())
  const calendar = getCalendarArray(targetDate)
  const classes = useStyles()
  const today = new Date()

  const [targetDate0, setTargetDate0] = useState(new Date())
  const calendar0 = getCalendarArray0(targetDate0)

  const cssChange = (day) => {
    if(day === 1){
      return {width: `100%`}
    }else {
      // return {width: ((55 * day) + (20 * day))}
      let data = (48 * day) + (31 * day)
      return {width: data}
    }
  };

  const handleIdxChange = (idx) => {
    setValue(idx);
  };

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedRadio, setSelectedRadio] = useState("individual");
  const [inView, setInView] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [gName, setGName] = useState("")
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [detail, setDetail] = useState("");

  const [tid, setTid] = useState(0);
  const [tasks, setTasks] = useState([])
  const day = new Date();
  const todays = day.getFullYear() + '-' + (day.getMonth()+1) + '-' + day.getDate();
  const [value, setValue] = useState("1");
  const [state, setState] = useState("");
  const [test, setTest] = useState(0);
  const [gantSelect, setGantSelect] = useState(null);

  const history = useHistory();
  const path = history.location.pathname;
  const user_id = path.split('/')[2];
  
  const [groups, setGroups] = useState([])
  const [users, setUsers] = useState([])
  const [usernames, setUsernames] = useState("");
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const selector = useSelector( state => state);
  const username = getUserName(selector);
  const [bool, setBool] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(-1)

  const [open55, setOpen55] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [taskDayInterval, setTaskDayInterval] = useState([])
  let idx;
  const [thisWeek, setThisWeek] = useState(false)
  const [selectUser_id, setSelectUser_id] = useState(0)
  const [reset, setReset] = useState(false)

  const handleChange55 = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const [open00, setOpen00] = React.useState(false);
  const [listIndex, setListIndex] = useState(0);
  const [tt, setTT] = useState([]);
  const handleOpen00 = (task) => {
    setTT(task)
    setListIndex(task.task_id);
    setOpen00(true);
  };

  const handleClose00 = () => {
    setOpen00(false);
    setListIndex(0)
    setTT([])
  };

  const handleClickOpen55 = () => {
    setOpen55(true);
    // ユーザの取得
    
    // グループに合わせてユーザを取得
    const getUserUrl = `${URL}group/user/${gantSelect}`;
    // const getUserUrl = `http://10.24.106.218/api/group/user/${gantSelect}`;
    // const getUserUrl = `http://10.24.106.157/api/group/user/${gantSelect}`;
    // const getUserUrl = `http://localhost/api/group/user/${gantSelect}`;
      axios.get(getUserUrl, {headers:{"Content-Type": "application/json"}})
        .then(response => {
          if(response.data.length === 0) {
            return;
          }
          setUsers(response.data)
          return;
        })
        .catch( () => {
          throw new Error('エラーが発生しました。');
        })
  };
  const ResetButton = () => {
    setReset(false)
    setStatus(-1)
    setSelectUser_id(0)
    setThisWeek(false)
  }

  const handleClose55 = () => {
    setOpen55(false);
    if(status !== -1 || selectUser_id !== 0 || thisWeek !== false){
      setReset(true);
    }else {
      setReset(false)
    }
  };

  const [text, setText] = useState("");
  const [anchorEl5, setAnchorEl5] = useState(null);
  const open10 = Boolean(anchorEl5);
  const id5 = open10 ? 'simple-popover' : undefined;
  const handleClick5 = (e) => {
    setText(e);
    setAnchorEl5(e);
  };

  const handleClose5 = () => {
    setText('')
    setAnchorEl5(null);
  };

  console.log(taskDayInterval)

  useEffect( () => {
    if(path.split('/')[3]){
      idx = path.split('/')[3];
      console.log(idx)
      setValue(idx)
    }
    // 所属グループを取得
    const getGroupUrl = `${URL}group/${user_id}`;
    // const getGroupUrl = `http://10.24.106.218/api/group/${user_id}`;
    // const getGroupUrl = `http://10.24.106.157/api/group/${user_id}`;
    // const getGroupUrl = `http://localhost/api/group/${user_id}`;
    axios.get(getGroupUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        const data = response.data
        if(typeof data === 'string'){
          return
        }
        console.log(data)
        setGroups(response.data)
      })
      .catch( (e) => {
        throw new Error('エラーが発生しました。');
      })
    // 自分のタスクを取得
    const getTaskUrl = `${URL}task/read/${user_id}`;
    // const getTaskUrl = `http://10.24.106.218/api/task/read/${user_id}`;
    // const getTaskUrl = `http://10.24.106.157/api/task/read/${user_id}`;
    // const getTaskUrl = `http://localhost/api/task/read/${user_id}`;
    axios.get(getTaskUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        const data = response.data
        if(!data || data.length == 0){
          return
        }
        console.log(data.length)
        setTasks(response.data)
        return
      })
      .catch( (e) => {
        throw new Error('エラーが発生しました。');
      })

    // タスクの日付インターバルを取得
    const getTaskDayIntervalUrl = `${URL}task/readDayInterval/${user_id}`;
    // const getTaskDayIntervalUrl = `http://10.24.106.218/api/task/readDayInterval/${user_id}`;
    // const getTaskDayIntervalUrl = `http://10.24.106.157/api/task/readDayInterval/${user_id}`;
    // const getTaskDayIntervalUrl = `http://localhost/api/task/readDayInterval/${user_id}`;
    axios.get(getTaskDayIntervalUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        const data = response.data
        if(!data || data.length == 0){
          return
        }
        console.log(data.length)
        console.log(data)
        setTaskDayInterval(data)
        return
      })
      .catch( (e) => {
        throw new Error('エラーが発生しました。');
      })
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  const handleOpen = (date) => {
    const dates = format(new Date(date), 'y-M-d')
    const arrayDate = dates.split('-')
    const arrayTodays = todays.split('-')
    // if(Number(arrayDate[0]) < Number(arrayTodays[0])){
    //   alert('日付が去年のためタスク投稿画面を開けません。')
    // }else if(Number(arrayDate[1]) <= Number(arrayTodays[1]) && Number(arrayDate[2]) < Number(arrayTodays[2])) {
    //   alert('日付が今日よりも後でないためタスク投稿画面を開けません。')
    // }else {
    //   setTitle("");
    //   setSelectedRadio("individual");
    //   setInView(false)
    //   setSelectedGroup('');
    //   setSelectedUser('');
    //   setProgress("")
    //   setDetail('')
    //   setSelectedStartDate(date)
    //   setSelectedEndDate(date)
    //   setOpen(true);
    //   setBool(false);
    // }

    setTitle("");
      setSelectedRadio("individual");
      setInView(false)
      setSelectedGroup('');
      setSelectedUser('');
      setProgress("")
      setDetail('')
      setSelectedStartDate(date)
      setSelectedEndDate(date)
      setOpen(true);
      setBool(false);
  };
  
  const handleOpen0 = (date) => {
      setTitle("");
      setSelectedRadio("individual");
      setInView(false)
      setSelectedGroup('');
      setSelectedUser('');
      setProgress("")
      setDetail('')
      setBool(false);
      setSelectedStartDate(date)
      setSelectedEndDate(date)
      setOpen(true);
  };

  const handleOpen1 = (date) => {
    setTitle("");
    setSelectedRadio("individual");
    setInView(false)
    setSelectedGroup('');
    setSelectedUser('');
    setProgress("")
    setBool(false);
    setDetail('')
    setSelectedStartDate(date);
    setSelectedEndDate(date);
    setOpen1(true);
  };

  const handleOpen2 = (task) => {
    task.group_id == null ? setSelectedRadio("individual") : setSelectedRadio("group")
    const group = task.group_id == null ? "individual" : "group"
    group === 'group' ? setInView(true) : setInView(false)
    setTitle(task.title);
    setTid(task.task_id)
    setBool(true);
    if(task.group_id){
      setGName((groups.filter(group => group.group_id === task.group_id))[0].name);
      setSelectedGroup(task.group_id);
      setUsernames(task.name);
      setSelectedUser(task.user_id)
    }else {
      setSelectedGroup('');
      setSelectedUser('');
    }
    setProgress(task.progress)
    setDetail(task.detail)
    setSelectedStartDate(new Date(task.startDate));
    setSelectedEndDate(new Date(task.endDate));
    setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleSelectChange = (event) => {
    setState(event.target.value);
    if(event.target.value === '個人'){
      let progTotal = 0
      const tLen = tasks.filter(task => !task.group_id).length
      if(tLen === 0){
        setTest(0)
        return
      }
      tasks.filter(task => !task.group_id)
      .map(task => progTotal += Number(task.progress))
      setTest(Math.round((progTotal / (tLen * 100)) * 100));
    }else if(event.target.value === '') {
      setTest(0)
    }else {
      let progTotal = 0
      const tLen = tasks.filter(task => task.group_id === Number(event.target.value)).length
      console.log(tLen)
      if(tLen === 0){
        setTest(0)
      }else {
        tasks.filter(task => task.group_id === Number(event.target.value))
        .map(task => progTotal += Number(task.progress))
        setTest(Math.round((progTotal / (tLen * 100)) * 100));
      }
      
    }
  };

  const handleSelectChange1 = (e) => {
    setSelectedUser([])
    setSelectedGroup(e.target.value)
    const g = e.target.value
    if(g === ""){
      return 
    }
    const gps = groups.filter( group => group.group_id === Number(g))
    // グループに合わせてユーザを取得
    const getUserUrl = `${URL}group/user/${g}`;
    // const getUserUrl = `http://10.24.106.218/api/group/user/${g}`;
    // const getUserUrl = `http://10.24.106.157/api/group/user/${g}`;
    // const getUserUrl = `http://localhost/api/group/user/${g}`;
    
      axios.get(getUserUrl, {headers:{"Content-Type": "application/json"}})
        .then(response => {
          if(response.data.length === 0) {
            return;
          }
          if(gps[0].leaderUser_id !== Number(user_id)){
            const data = response.data
            let d = data.filter(dt => dt.user_id === Number(user_id))
            setUsers(d)
            return
          }
          setUsers(response.data)
          return;
        })
        .catch( () => {
          throw new Error('エラーが発生しました。');
        })
  }

  const handleRadioChange = event => {
    // クリックされたら、valueの値をsetします。
    setSelectedRadio(event.target.value);
    if(event.target.value === "group"){
      setInView(true);
      // グループとユーザを取得

    }else{
      setInView(false);
      setSelectedGroup("")
      setSelectedUser('')
      setUsers([])
    }
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  }

  const handleSelect = (e) => {
    setTitle(e.title);
    setOpen(true);
  }

  const handleCreateButton = () => {
    // 個人用タスク
    if(selectedRadio === "individual"){
      if( !isValidRequiredInput(title, username, progress, selectedStartDate, selectedEndDate) ){
        alert("未入力項目があります。");
        return
      }
      if( !checkDateInterval(format(new Date(selectedStartDate), 'y-MM-dd'), format(new Date(selectedEndDate), 'y-MM-dd')) ){
        alert("開始日時が終了日付よりも小さい日付となっています。");
        return
      }
      const isDone = progress === 100 ? 1 : 0;
      const createInTasksUrl = `${URL}task/create/inTask`;
      // const createInTasksUrl = `http://10.24.106.218/api/task/create/inTask`;
      // const createInTasksUrl = `http://10.24.106.157/api/task/create/inTask`;
      // const createInTasksUrl = `http://localhost/api/task/create/inTask`;
      axios.post(createInTasksUrl, {user_id, title, name: username, detail, progress, startDate: format(new Date(selectedStartDate), 'y-MM-dd'), endDate: format(new Date(selectedEndDate), 'y-MM-dd'), isDone }, {headers:{"Content-Type": "application/json"}})
        .then(response => {
          if(response.data.length === 0) {
            return;
          }
          const data = response.data;
          setTasks(tasks => [...tasks, data]);
          handleClick5(`タスク【${data.title}】を作成しました。`)
          setTimeout( () => {
            handleClose5()
          },2000)

          // タスクの開始日付、終了日付の間を登録
          const dayInterval = eachDayOfInterval({
            start: new Date(selectedStartDate),
            end: new Date(selectedEndDate)
          })

          const result = dayInterval.map(day => format(day, 'yyyy-MM-dd'))
          
          const createTasksIntervalUrl = `${URL}task/dayInterval/${data.task_id}`;
          // const createTasksIntervalUrl = `http://10.24.106.218/api/task/dayInterval/${data.task_id}`;
          // const createTasksIntervalUrl = `http://10.24.106.157/api/task/dayInterval/${data.task_id}`;
          // const createTasksIntervalUrl = `http://localhost/api/task/dayInterval/${data.task_id}`;
          axios.post(createTasksIntervalUrl, result, {headers:{"Content-Type": "application/json"}})
            .then(response => {
              const array = taskDayInterval.concat(response.data)
              setTaskDayInterval(array);
              handleClose();
            })
        })
    }else{
      if( !isValidRequiredInput(selectedUser, title, selectedGroup, progress, selectedStartDate, selectedEndDate) ){
        alert("未入力項目があります。");
        return
      }
      if( !checkDateInterval(selectedStartDate, selectedEndDate) ){
        alert("開始日時が終了日付よりも小さい日付となっています。");
        return
      }
      const isDone = progress === 100 ? 1 : 0;
      const names = users.filter(user => user.user_id == selectedUser)
      // グループ用タスク
      const createGTasksUrl = `${URL}task/create/gTask`;
      // const createGTasksUrl = `http://10.24.106.218/api/task/create/gTask`;
      // const createGTasksUrl = `http://10.24.106.157/api/task/create/gTask`;
      // const createGTasksUrl = `http://localhost/api/task/create/gTask`;
      axios.post(createGTasksUrl, {user_id: Number(selectedUser), group_id: Number(selectedGroup), title, name: names.name, detail, progress, startDate: format(new Date(selectedStartDate), 'y-MM-dd'), endDate: format(new Date(selectedEndDate), 'y-MM-dd'), isDone}, {headers:{"Content-Type": "application/json"}})
        .then(response => {
          if(response.data.length === 0) {
            return;
          }
          const data = response.data
          setTasks(tasks => [...tasks, data]);
          handleClick5(`タスク【${data.title}】を作成しました。`)
          setTimeout( () => {
            handleClose5()
          },2000)

          // タスクの開始日付、終了日付の間を登録
          const dayInterval = eachDayOfInterval({
            start: new Date(selectedStartDate),
            end: new Date(selectedEndDate)
          })

          const result = dayInterval.map(day => format(day, 'yyyy-MM-dd'))
          
          const createTasksIntervalUrl = `${URL}task/dayInterval/${data.task_id}`;
          // const createTasksIntervalUrl = `http://10.24.106.218/api/task/dayInterval/${data.task_id}`;
          // const createTasksIntervalUrl = `http://10.24.106.157/api/task/dayInterval/${data.task_id}`;
          // const createTasksIntervalUrl = `http://localhost/api/task/dayInterval/${data.task_id}`;
          axios.post(createTasksIntervalUrl, result, {headers:{"Content-Type": "application/json"}})
            .then(response => {
              const array = taskDayInterval.concat(response.data)
              setTaskDayInterval(array);
              handleClose();
            })
        })
    }
  }

  const handleUpdateButton = () => {
    
    if( !isValidRequiredInput(title, progress, selectedStartDate, selectedEndDate) ){
      alert("未入力項目があります。");
      return
    }
    if( !checkDateInterval(selectedStartDate, selectedEndDate) ){
      alert("開始日時が終了日付よりも小さい日付となっています。");
      return
    }
    const isDone = progress === 100 ? 1 : 0;
    // タスク更新
    const updateTasksUrl = `${URL}task/update`;
    // const updateTasksUrl = `http://10.24.106.218/api/task/update`;
    // const updateTasksUrl = `http://10.24.106.157/api/task/update`;
    // const updateTasksUrl = `http://localhost/api/task/update`;
    axios.post(updateTasksUrl, {task_id: tid, user_id: Number(selectedUser), group_id: Number(selectedGroup), title, name: selectedUser, detail, progress, startDate: format(selectedStartDate, 'y-M-d'), endDate: format(selectedEndDate, 'y-M-d'), isDone}, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        const data = response.data
        const prevLists = tasks
        const idx = prevLists.findIndex(pl => pl.task_id === data.task_id)
        prevLists[idx] = data;
        const l = Object.assign([], prevLists)
        setTasks(l);
        let title1 = title
        handleClose();

        handleClick5(`タスク【${title1}】を更新しました。`)
          setTimeout( () => {
            handleClose5()
          },2000)
      })
  }

  const handleDeleteButton = (task) => {
    const tid = task.task_id
    const deleteTasksUrl = `${URL}task/delete/${tid}`;
    // const deleteTasksUrl = `http://10.24.106.218/api/task/delete/${tid}`;
    // const deleteTasksUrl = `http://10.24.106.157/api/task/delete/${tid}`;
    // const deleteTasksUrl = `http://localhost/api/task/delete/${tid}`;
      axios.get(deleteTasksUrl, {headers:{"Content-Type": "application/json"}})
        .then( () => {
          const tLists = tasks.filter( t => t.task_id !== task.task_id)
          setTasks(tLists);

          handleClick5(`タスク【${task.title}】を削除しました。`)
          setTimeout( () => {
            handleClose5()
          },2000)
          
          return
        })
      setOpen00(false)
  }

  const tasksUpdate = () => {
    const getTaskUrl = `${URL}task/read/${user_id}`;
    // const getTaskUrl = `http://10.24.106.218/api/task/read/${user_id}`;
    // const getTaskUrl = `http://10.24.106.157/api/task/read/${user_id}`;
    // const getTaskUrl = `http://localhost/api/task/read/${user_id}`;
    axios.get(getTaskUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        const data = response.data
        if(!data || data.length == 0){
          return
        }
        console.log(data.length)
        const l = Object.assign([], data)
        setTasks(l)
        return
      })
      .catch( (e) => {
        throw new Error('エラーが発生しました。');
      })
  }

  function CalendarTableCell(props) {
    const {wday, isTargetMonth, isToday, children, ...other} = props
    const classes = useCalendarCellStyles(props)
    return (
      isTargetMonth
        ? 
      <TableCell className={classes.calendarCell} {...other} onClick={ () => handleOpen1(`${format(targetDate, 'y/M')}/${children}`)}>
        {children}
        <div className={classes.chips}>
          {
            taskDayInterval.filter( date => isSameDay(new Date(date.date), new Date(`${format(targetDate, 'y/M')}/${children}`)))
            .map((date, i) => {
              return(
              tasks.filter( task => task.task_id === date.task_id)
              .map( (task) => (
                Number(task.task_id) === Number(date.task_id)
                ?
                i < 2
                  ?
                  task.title.length > 6
                    ?
                    <Tooltip key={`${date}-${i}`} title={task.title}>
                      <Chip
                        key={i}
                        size="small"
                        label={task.title.slice(0,6) + '...'}
                        style={Number(user_id) != Number(task.user_id) ? { width: '80%', marginBottom: 5, backgroundColor: "#E0DDD7"} : {width: '80%', marginBottom: 5, backgroundColor: "#4caf50"}}
                      />
                    </Tooltip>
                    :
                    <Chip
                      key={i}
                      size="small"
                      label={task.title}
                      style={Number(user_id) != Number(task.user_id) ? { width: '80%', marginBottom: 5, backgroundColor: "#E0DDD7"} : {width: '80%', marginBottom: 5, backgroundColor: "#4caf50"}}
                    />
            
                  :
                  i === 2
                    ?
                  <Chip
                    key={i}
                    size="small"
                    label="・・・"
                    style={Number(user_id) != Number(task.user_id) ? { width: '80%', marginBottom: 5, backgroundColor: "#E0DDD7"} : {width: '80%', marginBottom: 5, backgroundColor: "#4caf50"}}
                  />
                :
                i > 2 ? 
                <></>
                : <> </>
              :
              <></>
              ))
            )})
          }
        </div>
      </TableCell>
        :
      <TableCell className={classes.calendarCell} {...other}>{children}</TableCell>  
    )
  }

  const nums = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div>
      <CssBaseline />
        <TabContext value={value}>
        <div className={classes.tabs12}>
          <AppBar position="static" color="default">
            <TabList onChange={handleChange} aria-label="simple tabs example">
              <Tab label="タスク" value="1" />
              <Tab label="カレンダー" value="2" />
              <Tab label="ガントチャート" value="3" />
              <Tab label="進 捗" value="4" />
              <IconButton onClick={tasksUpdate}><CachedIcon /></IconButton>
            </TabList>
          </AppBar>
        </div>
          <TabPanel value="1">
            {/* テーブル要素 */}
            <div className={classes.tc} >
              <div style={{ width: '100%' }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>個人</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <TableContainer>
                  <Table size="small" aria-label="purchases">
                  <TableHead>
                  <TableRow>
                  <TableCell style={{ width: 100 }} />
                  <TableCell>タイトル</TableCell>
                  <TableCell>名前</TableCell>
                  <TableCell align="right" style={{ width: 145 }}>タスク開始日付</TableCell>
                  <TableCell align="right" style={{ width: 145 }}>タスク終了日付</TableCell>
                  <TableCell align="right" style={{ width: 105 }}>ステータス</TableCell>
                  </TableRow>
                  </TableHead>
                  
                  <TableBody>
                  {tasks && tasks.filter(task => task.group_id == null)
                    .map((gtask) => (
                      <TableRow key={gtask.task_id}>
                      <TableCell style={{ width: 100 }}>
                      <IconButton size="small" onClick={() => handleOpen2(gtask)}><EditIcon /></IconButton>
                      <IconButton size="small" onClick={() => handleOpen00(gtask)}><DeleteForeverIcon /></IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">{gtask.progress === 100 ? <strike style={{ color: 'red' }}>{gtask.title}</strike> : gtask.title}</TableCell>
                      <TableCell>{gtask.name}</TableCell>
                      <TableCell align="right" style={{ width: 145 }}>{gtask.startDate}</TableCell>
                      <TableCell align="right" style={{ width: 145 }}>{gtask.endDate}</TableCell>
                      <TableCell align="right" style={{ width: 105 }}>{gtask.progress === 0 ? "未進行" : gtask.progress === 100 ? "完了" : "進行中"}</TableCell>
                      </TableRow>
                      ))}
                      </TableBody>
                      </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
              </div>
                {groups && groups.map( (group, i) => (
                  <div style={{ width: "100%" }}>
                    <Accordion key={group.group_id} >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${i}a-content`}
                        id={`panel${i}a-header`}
                      >
                        <Typography className={classes.heading}>{group.name}</Typography>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                      <TableContainer>
                        <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                        <TableCell style={{ width: 100 }} />
                        <TableCell>タイトル</TableCell>
                        <TableCell>名前</TableCell>
                        <TableCell align="right" align="right" style={{ width: 145 }}>タスク開始日付</TableCell>
                        <TableCell align="right" align="right" style={{ width: 145 }}>タスク終了日付</TableCell>
                        <TableCell align="right" align="right" style={{ width: 105 }}>ステータス</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tasks && tasks.filter(task => group.group_id === task.group_id)
                          .map((gtask) => (
                            <TableRow key={gtask.task_id}>
                              <TableCell style={{ width: 30 }}>
                                {
                                  group.leaderUser_id === Number(user_id)
                                    ?
                                  <>
                                    <IconButton size="small" onClick={() => handleOpen2(gtask)}><EditIcon /></IconButton>
                                    <IconButton size="small" onClick={() => handleOpen00(gtask)}><DeleteForeverIcon /></IconButton>
                                  </>
                                    :
                                    gtask.user_id === Number(user_id)
                                      ?
                                    <IconButton size="small" onClick={() => handleOpen2(gtask)}><EditIcon /></IconButton>
                                      :
                                    <></>
                                }
                              </TableCell>
                              <TableCell component="th" scope="row">{gtask.progress === 100 ? <strike style={{ color: 'red' }}>{gtask.title}</strike> : gtask.title}</TableCell>
                              <TableCell style={ gtask.group_id != null && gtask.user_id === Number(user_id) ? { backgroundColor: "#4caf50", color: "white"} : { }}>{gtask.name}</TableCell>
                              <TableCell align="right" align="right" style={{ width: 145 }}>{gtask.startDate}</TableCell>
                              <TableCell align="right" align="right" style={{ width: 145 }}>{gtask.endDate}</TableCell>
                              <TableCell align="right" align="right" style={{ width: 105 }}>{gtask.progress === 0 ? "未進行" : gtask.progress === 100 ? "完了" : "進行中"}</TableCell>
                            </TableRow>
                            ))}
                            </TableBody>
                            </Table>
                          </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
            </div>
            <Fab className={classes.btn} color="primary" onClick={() => handleOpen0(new Date())} >
              <AddIcon fontSize="large" />
            </Fab>
          </TabPanel>
          <TabPanel value="2">
            <Paper className={classes.paper}>
              <Grid container justify="space-between">
                <Grid item>
                  <Button variant="outlined" onClick={() => setTargetDate(subMonths(targetDate, 1))}>前の月</Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" onClick={() => setTargetDate(new Date())}>今月</Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" onClick={() => setTargetDate(addMonths(targetDate, 1))}>次の月</Button>
                </Grid>
              </Grid>
              <div className="module-spacer--small" />
              <Typography variant="h4" align="center" className={classes.yearmonth}>{format(targetDate, 'y年M月')}</Typography>
              <div className="module-spacer--small" />
              <Table className={classes.tables}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" classes={{head: classes.tableHead, }}>日</TableCell>
                    <TableCell align="center" classes={{head: classes.tableHead, }}>月</TableCell>
                    <TableCell align="center" classes={{head: classes.tableHead, }}>火</TableCell>
                    <TableCell align="center" classes={{head: classes.tableHead, }}>水</TableCell>
                    <TableCell align="center" classes={{head: classes.tableHead, }}>木</TableCell>
                    <TableCell align="center" classes={{head: classes.tableHead, }}>金</TableCell>
                    <TableCell align="center" classes={{head: classes.tableHead, }}>土</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calendar.map((weekRow, rowNum) => (
                    <TableRow key={rowNum}>
                      {weekRow.map(date => (
                        <CalendarTableCell
                          key={getDay(date)}
                          wday={getDay(date)}
                          isTargetMonth={isSameMonth(date, targetDate)}
                          isToday={isSameDay(date, today)}
                          align="center"
                        >
                          {getDate(date)}
                        </CalendarTableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TabPanel>
          <TabPanel value="3">
            <div>
              <CssBaseline />
              <Paper className={classes.paper1}>
                <FormControl className={classes.formControl1} >
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">グループ選択</InputLabel>
                  <Select
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={gantSelect}
                    onChange={(e) => setGantSelect(e.target.value)}
                  >
                    <MenuItem value={null}><em>個人</em></MenuItem>
                    {groups.map(group => (
                      <MenuItem key={group.group_id} value={group.group_id}>{group.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button  variant="contained" style={{ width: 150, height: 20, position: 'absolute', top: 170, left: 580  }} onClick={handleClickOpen55}>タスク表示設定</Button>
                {/* resetの値に応じて表示を変える */}
                {
                  !reset 
                    ?
                  <></>
                    :
                  <Tooltip title="条件をリセットする"><IconButton onClick={ResetButton} style={{ position: "absolute", top: 155, left: 760 }}><HistoryIcon /></IconButton></Tooltip>
                }
                
                <div className={classes.geogia0}>
                  <Table>
                    <TableHead>
                      <TableRow >
                        <TableCell size="small" >名前</TableCell>
                        <TableCell size="small" align="left">タスク名</TableCell>
                        <TableCell size="small" align="right">開始日時</TableCell>
                        <TableCell size="small" align="center" style={{ width: 10 }}>
                          <IconButton onClick={() => handleOpen0(new Date())}><AddCircleIcon /></IconButton>
                        </TableCell>
                        {/* <TableCell /> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                      tasks.filter(task => {
                        return(
                          status === -1 && selectUser_id === 0 && thisWeek === false ? task.group_id === gantSelect
                          : status === -1 && selectUser_id !== 0 && thisWeek === true ? task.group_id === gantSelect && selectUser_id === task.user_id && isThisWeek(new Date(task.startDate))
                          : status === -1 && selectUser_id !== 0 && thisWeek === false ? selectUser_id === task.user_id && task.group_id === gantSelect
                          : status === -1 && selectUser_id === 0 && thisWeek === true ? isThisWeek(new Date(task.startDate)) && task.group_id === gantSelect
                          : status === 0 && selectUser_id !== 0 && thisWeek === false ? task.group_id === gantSelect && selectUser_id === task.user_id && task.progress < 100
                          : status === 0 && selectUser_id === 0 && thisWeek === false ? (task.group_id === gantSelect && task.progress < 100)
                          : status === 0 && selectUser_id !== 0 && thisWeek === true ? task.group_id === gantSelect && task.progress < 100 && isThisWeek(new Date(task.startDate)) && selectUser_id === task.user_id
                          : status === 0 && selectUser_id === 0 && thisWeek === true ? task.group_id === gantSelect && task.progress < 100 && isThisWeek(new Date(task.startDate))
                          : status === 1 && selectUser_id !== 0 && thisWeek === false ? task.group_id === gantSelect && selectUser_id === task.user_id && task.progress == 100
                          : status === 1 && selectUser_id === 0 && thisWeek === false ? task.group_id === gantSelect && task.progress == 100
                          : status === 1 && selectUser_id === 0 && thisWeek === true ? task.group_id === gantSelect && task.progress == 100 && isThisWeek(new Date(task.startDate))
                          : status === 1 && selectUser_id !== 0 && thisWeek === true ? task.group_id === gantSelect && task.progress == 100 && selectUser_id === task.user_id && isThisWeek(new Date(task.startDate)) : ""
                        )
                      })
                      .map( (task) => (
                        <TableRow key={task.task_id} >
                          <TableCell style={ task.group_id != null && task.user_id === Number(user_id) ? { backgroundColor: "#4caf50", color: "white"} : { }}>{task.name}</TableCell>
                            
                            {task.title.length > 12
                              ?
                              <Tooltip interactive disableFocusListener disableTouchListener title={task.title}>
                                <TableCell align="left">
                                  {
                                    task.progress === 100
                                      ?
                                    <del style={{ color: '#f00' }}>{task.title.slice(0,12) + '...'}</del>
                                      :
                                    task.title.slice(0,12) + '...'
                                  }
                                </TableCell>
                              </Tooltip>
                              :
                              <TableCell align="left">
                                {
                                  task.progress === 100
                                    ?
                                  <strike style={{ color: '#f00' }}>{task.title}</strike>
                                    :
                                  task.title
                                }
                              </TableCell>
                            }
                          
                          <TableCell align="right">{task.startDate}</TableCell>
                          {/* 57 */}
                          <TableCell align="center" style={{ display: 'flex', height: 73 }}>
                            {
                              !gantSelect
                                ?
                              <>
                                <IconButton size="small" onClick={() => handleOpen2(task)}><EditIcon /></IconButton>
                                {/* <IconButton size="small" onClick={() => handleDeleteButton(task)}><DeleteForeverIcon /></IconButton> */}
                                <IconButton size="small" onClick={() => handleOpen00(task)}><DeleteForeverIcon /></IconButton>
                              </>
                                :
                              
                              groups.filter(g => g.group_id === task.group_id)
                              .map( group => {
                                if((group.leaderUser_id === Number(user_id) || task.group_id == null) && (gantSelect === group.group_id || gantSelect == null)){
                                  return(
                                    <>
                                      <IconButton size="small" onClick={() => handleOpen2(task)}><EditIcon /></IconButton>
                                      <IconButton size="small" onClick={() => handleOpen00(task)}><DeleteForeverIcon /></IconButton>
                                    </>
                                  )
                                }else if(task.user_id === Number(user_id) && group.group_id === gantSelect){
                                  return(
                                    <IconButton size="small" onClick={() => handleOpen2(task)}><EditIcon /></IconButton>
                                  )
                                }else {
                                  return(
                                    <></>
                                  )
                                }
                              })
                            }
                            </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className={classes.geogia}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Button className={classes.b} variant="outlined" onClick={() => setTargetDate0(addWeeks(targetDate0, -1))}>＜</Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.b} variant="outlined" onClick={() => setTargetDate0(new Date())}>今週</Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.b} variant="outlined" onClick={() => setTargetDate0(addWeeks(targetDate0, 1))}>＞</Button>
                    </Grid>
                  </Grid>
                  <Typography variant="h5" align="center">{format(targetDate0, 'y年M月')}</Typography>
                  <Table style={{ width: "100%", tableLayout: 'fixed' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell size="small" align="center" classes={{head: classes.tableHead, }}>日</TableCell>
                        <TableCell size="small" align="center" classes={{head: classes.tableHead, }}>月</TableCell>
                        <TableCell size="small" align="center" classes={{head: classes.tableHead, }}>火</TableCell>
                        <TableCell size="small" align="center" classes={{head: classes.tableHead, }}>水</TableCell>
                        <TableCell size="small" align="center" classes={{head: classes.tableHead, }}>木</TableCell>
                        <TableCell size="small" align="center" classes={{head: classes.tableHead, }}>金</TableCell>
                        <TableCell size="small" align="center" classes={{head: classes.tableHead, }}>土</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {calendar0.map((weekRow, rowNum) => (
                        <TableRow key={rowNum}>
                          {weekRow.map(date => (
                            
                            isToday(date)
                            ?
                            <TableCell style={{ height: 58 }} style={localStorage.getItem("darkMode") === "on" ? { backgroundColor: '#9370DB'} : { backgroundColor: "#FFE4E1" }} key={getDay(date)} align="center">{getDate(date)}</TableCell>
                            :
                            <TableCell key={getDay(date)} align="center" style={{ height: 58 }}>{getDate(date)}</TableCell>
                            )
                        )
                      }
                        </TableRow>
                      ))}
                      {
                        // 絞り込み　ユーザ、ステータス、日付の近い順
                        tasks.filter(task => {
                          return(
                            status === -1 && selectUser_id === 0 && thisWeek === false ? task.group_id === gantSelect
                            : status === -1 && selectUser_id !== 0 && thisWeek === true ? task.group_id === gantSelect && selectUser_id === task.user_id && isThisWeek(new Date(task.startDate))
                            : status === -1 && selectUser_id !== 0 && thisWeek === false ? selectUser_id === task.user_id && task.group_id === gantSelect
                            : status === -1 && selectUser_id === 0 && thisWeek === true ? isThisWeek(new Date(task.startDate)) && task.group_id === gantSelect
                            : status === 0 && selectUser_id !== 0 && thisWeek === false ? task.group_id === gantSelect && selectUser_id === task.user_id && task.progress < 100
                            : status === 0 && selectUser_id === 0 && thisWeek === false ? (task.group_id === gantSelect && task.progress < 100)
                            : status === 0 && selectUser_id !== 0 && thisWeek === true ? task.group_id === gantSelect && task.progress < 100 && isThisWeek(new Date(task.startDate)) && selectUser_id === task.user_id
                            : status === 0 && selectUser_id === 0 && thisWeek === true ? task.group_id === gantSelect && task.progress < 100 && isThisWeek(new Date(task.startDate))
                            : status === 1 && selectUser_id !== 0 && thisWeek === false ? task.group_id === gantSelect && selectUser_id === task.user_id && task.progress == 100
                            : status === 1 && selectUser_id === 0 && thisWeek === false ? task.group_id === gantSelect && task.progress == 100
                            : status === 1 && selectUser_id === 0 && thisWeek === true ? task.group_id === gantSelect && task.progress == 100 && isThisWeek(new Date(task.startDate))
                            : status === 1 && selectUser_id !== 0 && thisWeek === true ? task.group_id === gantSelect && task.progress == 100 && selectUser_id === task.user_id && isThisWeek(new Date(task.startDate)) : ""
                          )
                        })
                      .map( task => {
                        const ai = eachWeekOfInterval({
                          start: new Date(task.startDate),
                          end: new Date(task.endDate)
                        })
                        const ai2 = ai.map(sunday =>
                          eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
                        )
                        
                        return(
                          calendar0.map(( weekRow, rowNum ) => (
                            <>
                              {/* <div className="module-spacer-extra-extra-small" /> */}
                              <TableRow key={rowNum} >
                                {console.log(weekRow)}
                                {weekRow.map(date => (
                                  // 57
                                  <TableCell style={{ maxWidth: 70, overflow: 'visible', height: 73 }} key={getDay(date)} align="center">
                                    {
                                      ai2.map( date1 => {
                                        const size = date1.filter( date2 => isWithinInterval( new Date(date2), {start: subDays(new Date(task.startDate), 1), end: new Date(task.endDate)})).length
                                        const arr = date1.filter( date2 => isWithinInterval( new Date(date2), {start: subDays(new Date(task.startDate), 1), end: new Date(task.endDate)}))
                                        console.log(size)
                                        return(
                                          format(new Date(arr[0]), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd')
                                            ?<Chip
                                                style={cssChange(size)}
                                                size="small"
                                                color={localStorage.getItem("darkMode") === "on" ? "secondary" : "primary"}
                                              />
                                            :
                                          <></>
                                        ) 
                                    })}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </>
                            )))
                          })
                      }
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </div>
          </TabPanel>
          <TabPanel value="4">
            <Paper className={classes.paper}>
              <Grid container alignItems="center" justify="center" >
                <div className={classes.chips}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">Group Select</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state}
                      onChange={handleSelectChange}
                      
                    >
                      <option value={""}></option>
                      <option value={"個人"}>個人</option>
                      {groups.map(group => (
                        <option key={group.group_id} value={group.group_id}>{group.name}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <div className={classes.circles}>
                    <Circle
                      progress={test}
                      size='400px'
                      lineWidth="50px"
                      progressColor='green'
                      bgColor="#D3DEF1"
                      textColor="green"
                      animationDuration="1s"
                    />
                  </div>
                </div>
              </Grid>
            </Paper>
          </TabPanel>
        </TabContext>
      
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
          <div className={classes.paper0}>
            <h3>{bool ? "タスク編集画面" : "タスク作成画面"}</h3>
            <form className={classes.form} autoComplete="off">
              <TextField value={title} onChange={(e) => setTitle(e.target.value)} className={classes.items} label="※タスクのタイトルを入力" id="outlined-search" type="search" variant="outlined" size="small" /><br /><br />
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
                {/* <TextField value={selectedGroup} className={classes.items} label="グループを選択" id="outlined-search" type="search" variant="outlined" size="small" onChange={handleGroupChange} /><br /><br /> */}
                {!bool
                  ?
                  <>
                    <FormControl variant="filled" className={classes.items}>
                      <InputLabel htmlFor="filled-age-native-simple">※グループ選択</InputLabel>
                      <Select
                        native
                        value={selectedGroup}
                        onChange={handleSelectChange1}
                        inputProps={{
                          state: 'state',
                        }}
                      >
                        <option aria-label="None" value="" />
                        {groups && groups.map( group => (
                          <option key={group.group_id} value={group.group_id}>{group.name}</option>
                        ))}
                      </Select>
                    </FormControl><br /><br />
                    {/* <TextField value={selectedUser} className={classes.items} label="ユーザを選択" id="outlined-search" type="search" variant="outlined" size="small" onChange={handleUserChange} /><br /> */}
                    <FormControl variant="filled" className={classes.items}>
                      <InputLabel htmlFor="filled-age-native-simple">※ユーザ選択</InputLabel>
                      <Select
                        native
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                      >
                        <option aria-label="None" value="" />
                        {users && users.map( user => {
                          console.log(user)
                          return(
                            <option key={user.user_id} value={user.user_id}>{user.name}</option>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </>
                  :
                    bool && selectedGroup === ""
                      ?
                      <>
                        <FormControl variant="filled" className={classes.items}>
                          <InputLabel htmlFor="filled-age-native-simple">※グループ選択</InputLabel>
                          <Select
                            native
                            value={selectedGroup}
                            onChange={handleSelectChange1}
                            inputProps={{
                              state: 'state',
                            }}
                          >
                            <option aria-label="None" value="" />
                            {groups && groups.map( group => (
                              <option key={group.group_id} value={group.group_id}>{group.name}</option>
                            ))}
                          </Select>
                        </FormControl><br /><br />
                        {/* <TextField value={selectedUser} className={classes.items} label="ユーザを選択" id="outlined-search" type="search" variant="outlined" size="small" onChange={handleUserChange} /><br /> */}
                        <FormControl variant="filled" className={classes.items}>
                          <InputLabel htmlFor="filled-age-native-simple">※ユーザ選択</InputLabel>
                          <Select
                            native
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                          >
                            <option aria-label="None" value="" />
                            {users && users.map( user => (
                              <option key={user.user_id} value={user.user_id}>{user.name}</option>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                      :
                    <div style={{ border: '1px solid #000', width: '70%', textAlign: 'center', marginLeft: "15%"}}>  
                      <h3>{gName}</h3>
                      <h3>{usernames}</h3>
                    </div>
                }
                
              </div>
              
              <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="※開始日付"
                    format="yyyy/MM/dd"
                    className={classes.items}
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    okLabel="決定"
                    cancelLabel="キャンセル"
                  />
              </MuiPickersUtilsProvider><br />
              <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="※終了日付"
                    format="yyyy/MM/dd"
                    className={classes.items}
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    okLabel="決定"
                    cancelLabel="キャンセル"
                  />
              </MuiPickersUtilsProvider><br />
              <FormControl variant="outlined" className={classes.margin}>
                <InputLabel htmlFor="outlined-age-native-simple">※進捗</InputLabel>
                <Select
                  native
                  value={progress}
                  onChange={handleProgressChange}
                  label="※進捗"
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
              <Button color="primary" variant={localStorage.getItem("darkMode") === "on" ? "contained" : "outlined"} size="large" onClick={!bool ? handleCreateButton : handleUpdateButton} >{!bool ? "作成" : "更新"}</Button>
            </form>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* モーダルの中身 */}
        <Fade in={open1}>
          <Paper className={classes.paper10}>
            <div className={classes.paper2}>
              <div className={classes.division}>
                <Typography variant="h5" style={{ height: '30px', marginLeft: '10%', marginTop: "10px", width: '80%' }}>{format(new Date(selectedStartDate), 'y年M月d日') + "の予定"}</Typography>
                <Fab className={classes.icon} color="default" onClick={() => handleOpen(selectedStartDate)} >
                  <AddIcon fontSize="medium" />
                </Fab>
              </div>
              <Grid container alignItems="center" justify="center" >
                {((taskDayInterval.filter(day => format(new Date(day.date), 'y/M/d') === format(new Date(selectedStartDate), 'y/M/d'))).length === 0 && (tasks.filter(task => Number(task.task_id) === Number(day.task_id) && !task.group).length === 0 ))
                  ?
                <Typography variant="h5" style={{ marginTop: "50px" }}>予定がありません</Typography>
                  :
                <List className={classes.root} subheader={<li />}>
                  <li className={classes.listSection}>
                    <ul className={classes.ul}>
                      <ListSubheader>[個人]</ListSubheader>
                      <ListItem>
                        <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={"タイトル"} />
                        <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={"名前"} />
                        <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={"開始日"} />
                        <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={"終了日"} />
                        <ListItemText style={{ textAlign: 'right', width: "15%" }} primary={"ステータス"} />
                        <ListItemText style={{ textAlign: 'right', width: "2%" }} />
                      </ListItem>
                      <Divider/>
                      {
                        taskDayInterval.filter(day => isSameDay(new Date(day.date), new Date(selectedStartDate)))
                        .map( day => (
                          tasks.filter(task => !task.group_id && Number(task.task_id) === Number(day.task_id))
                          .map( task => (
                            <div style={{ display: 'flex' }}>
                              <ListItem button key={`section-${task.task_id}`} onClick={() => handleOpen2(task)} >
                              {
                                task.title.length > 13
                                  ?
                                <Tooltip title={task.title}>
                                  <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title.slice(0,13) + '...'} />
                                </Tooltip>
                                  :
                                <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title} />
                              }
                                <ListItemText style={{ textAlign: 'left', width: "25%", paddingLeft: 7 }} primary={task.name} />
                                <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.startDate} />
                                <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.endDate} />
                                <ListItemText style={{ textAlign: "right", width: "12%" }} primary={task.progress === 0 ? "未進行" : task.progress === 100 ? "完了" : "進行中" } />
                                <EditIcon style={{ marginLeft: 15 }} />
                              </ListItem>
                              <IconButton size="small" onClick={() => handleOpen00(task)}><DeleteForeverIcon /></IconButton>
                              <Divider/>
                            </div>
                          ))
                        ))
                      }
                      </ul>
                    </li>
                  {groups.map((group, i) => (
                    <li key={`section-${group.group_id}-${i}`} className={classes.listSection}>
                      <ul className={classes.ul}>
                        {
                          tasks.filter(task => group.group_id === task.group_id && taskDayInterval.filter( date => Number(task.task_id) === Number(date.task_id)).length > 0).length !== 0
                          ?
                          <>
                          <ListSubheader>{group.name}</ListSubheader>
                          <ListItem>
                            <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={"タイトル"} />
                            <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={"名前"} />
                            <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={"開始日"} />
                            <ListItemText style={{ textAlign: 'right',width: "13%" }} primary={"終了日"} />
                            <ListItemText style={{ textAlign: 'right', width: "15%" }} primary={"ステータス"} />
                            <ListItemText style={{ textAlign: 'right', width: "2%" }} />
                          </ListItem>
                          <Divider/>
                          </>
                          :
                          <></>
                        }
                        
                      {
                      taskDayInterval.filter(day => isSameDay(new Date(day.date), new Date(selectedStartDate)))
                      .map( day => (
                        tasks.filter(task => task.group_id === group.group_id && Number(task.task_id) === Number(day.task_id))
                        .map( task => (
                          <div style={{ display: 'flex' }}>
                            {
                              group.leaderUser_id === Number(user_id)
                                ?
                              <>
                                <ListItem button onClick={() => handleOpen2(task)}>
                                  {
                                    task.title.length > 13
                                    ?
                                    <Tooltip title={task.title}>
                                      <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title.slice(0,13) + '...'} />
                                    </Tooltip>
                                    :
                                    <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title} />
                                  }
                                  <ListItemText style={task.group_id != null && task.user_id === Number(user_id) ? { backgroundColor: "#4caf50", color: "white", textAlign: 'left', width: "25%", paddingLeft: 7} : { textAlign: 'left', width: "25%", paddingLeft: 7 }} primary={task.name} />
                                  <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.startDate} />
                                  <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.endDate} />
                                  <ListItemText style={{ textAlign: 'right', width: "12%" }} primary={task.progress === 0 ? "未進行" : task.progress === 100 ? "完了" : "進行中" } />
                                  <EditIcon style={{ marginLeft: 15 }} />
                                </ListItem>
                                <IconButton size="small" onClick={() => handleOpen00(task)}><DeleteForeverIcon /></IconButton>
                                <Divider/>
                              </>
                                :
                                task.user_id === Number(user_id)
                                  ?
                                  <ListItem button onClick={() => handleOpen2(task)}>
                                    {
                                      task.title.length > 13
                                      ?
                                      <Tooltip title={task.title}>
                                        <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title.slice(0,13) + '...'} />
                                      </Tooltip>
                                      :
                                      <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title} />
                                    }
                                    <ListItemText style={task.group_id != null && task.user_id === Number(user_id) ? { backgroundColor: "#4caf50", color: "white", textAlign: 'left', width: "25%", paddingLeft: 7} : { textAlign: 'left', width: "25%", paddingLeft: 7 }} primary={task.name} />
                                    <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.startDate} />
                                    <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.endDate} />
                                    <ListItemText style={{ textAlign: 'right', width: "12%" }} primary={task.progress === 0 ? "未進行" : task.progress === 100 ? "完了" : "進行中" } />
                                    <EditIcon style={{ marginLeft: 15 }} />
                                  </ListItem>
                                  :
                                  <ListItem>
                                    {
                                      task.title.length > 13
                                      ?
                                      <Tooltip title={task.title}>
                                        <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title.slice(0,13) + '...'} />
                                      </Tooltip>
                                      :
                                      <ListItemText style={{ textAlign: 'left', width: "25%" }} primary={task.title} />
                                    }
                                    <ListItemText style={task.group_id != null && task.user_id === Number(user_id) ? { backgroundColor: "#4caf50", color: "white", textAlign: 'left', width: "25%", paddingLeft: 7} : { textAlign: 'left', width: "25%", paddingLeft: 7 }} primary={task.name} />
                                    <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.startDate} />
                                    <ListItemText style={{ textAlign: 'right', width: "13%" }} primary={task.endDate} />
                                    <ListItemText style={{ textAlign: 'right', width: "12%" }} primary={task.progress === 0 ? "未進行" : task.progress === 100 ? "完了" : "進行中" } />
                                    <EditIcon style={{ marginLeft: 15 }} />
                                  </ListItem>
                                }
                          </div>
                        ))
                      ))
                      }
                      </ul>
                    </li>
                  ))}
                </List>
                }
              </Grid>
            </div>
          </Paper>
        </Fade>
      </Modal>

      <Popover
        id={id5}
        open={open10}
        anchorEl={anchorEl5}
        onClose={handleClose5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>{text}</Typography>
      </Popover>
      
      <div style={{ width: 400 }}>
      <Dialog disableEscapeKeyDown open={open55} onClose={handleClose55}>
        <DialogTitle>タスク表示設定</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            {
              !gantSelect
                ?
              <></>
                :
              <FormControl className={classes.formControl01}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">ユーザ別</InputLabel>
                <Select
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={selectUser_id}
                  onChange={(e) => setSelectUser_id(e.target.value)}
                  input={<Input id="demo-dialog-native" />}
                >
                  <MenuItem value={0}><em>全ユーザ</em></MenuItem>
                  {users && users.map( user => {
                    return(
                      <MenuItem key={user.user_id} value={user.user_id}>{user.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            }
            
            <FormControl className={classes.formControl01} >
              <InputLabel htmlFor="filled-age-native-simple">ステータス</InputLabel>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                value={status}
                onChange={ (e) => setStatus(e.target.value)}
                label="ステータス"
              >
                <MenuItem value={-1}>全件表示</MenuItem>
                <MenuItem value={0}>進行中</MenuItem>
                <MenuItem value={1}>完了</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl01}>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">日付選択</InputLabel>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                value={thisWeek}
                onChange={(e) => setThisWeek(e.target.value)}
                input={<Input />}
              >
                <MenuItem value={false}>
                  <em>全件表示</em>
                </MenuItem>
                <MenuItem value={true}>今週のタスク</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose55} color="primary">
            閉じる
          </Button>
          <Button onClick={handleClose55} color="primary">
            完了
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      <Dialog
        open={open00}
        onClose={handleClose00}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{`「${tt.title}」を削除しますか？`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose00} color="primary">
            削除しません
          </Button>
          <Button onClick={() => handleDeleteButton(tt)} color="primary" autoFocus>
            削除します
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Calendar;