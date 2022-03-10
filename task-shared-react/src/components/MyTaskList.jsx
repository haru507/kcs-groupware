import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import DateRangeIcon from '@material-ui/icons/DateRange';
// import Pagination from '@material-ui/lab/Pagination';
import Tooltip from '@material-ui/core/Tooltip'
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'

import format from 'date-fns/format'
import Pagination from './Pagination.jsx'
import { getUserId } from '../reducks/users/selectors';
import {useSelector} from 'react-redux';
import isSameDay from 'date-fns/isSameDay'
import isToday from 'date-fns/isToday'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
// ↓追加
import { autoPlay } from 'react-swipeable-views-utils';
import {URL} from '../URL'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
    },
  },
  root1: {
    maxWidth: 600,
    backgroundColor: "#eee",
    display: 'flex',
    flexDirection: "column",
    flexWrap: "wrap",
  },
  root2: {
    maxWidth: 600,
    backgroundColor: "#000",
    display: 'flex',
    flexDirection: "column",
    flexWrap: "wrap",
  }
}));

const MyTaskList = () => {
  const classes = useStyles();
  const selector = useSelector( state => state);
  const id = getUserId(selector);
  const [tasks, setTasks] = useState([])
  const history = useHistory();
  const path = history.location.pathname;
  const user_id = path.split('/')[2];
  const today = format(new Date(), 'MM月dd日')

  const size1 = tasks && tasks.filter( task => !task.group_id && task.progress !== 100).filter(task => isSameDay(new Date(task.startDate), new Date(task.endDate)) ? isToday(new Date(task.startDate)) : areIntervalsOverlapping({start: new Date(task.startDate), end: new Date(task.endDate)}, {start: new Date() , end: new Date()})).length
  const size2 = tasks && tasks.filter( task => task.group_id != null && task.progress !== 100 ).filter( task => isSameDay(new Date(task.startDate), new Date(task.endDate)) ? isToday(new Date(task.startDate)) : areIntervalsOverlapping({start: new Date(task.startDate), end: new Date(task.endDate)}, {start: new Date() , end: new Date()})).length
  const [bool, setBool] = useState(false)
  const [index, setIndex] = useState(0)
  console.log(size1)
  console.log(size2)
  // ↓ここで自動的にスライドするようにする
  const EnhancedSwipeableViews = autoPlay(SwipeableViews);

  console.log((tasks.filter( task => areIntervalsOverlapping({start: new Date(task.startDate), end: new Date(task.endDate)}, {start: new Date() , end: new Date()})).length > 0))

  // タスクをゲットする
  useEffect( () => {
    const getTaskUrl = `${URL}task/${user_id}`;
    // const getTaskUrl = `http://10.24.106.218/api/task/${user_id}`;
    // const getTaskUrl = `http://10.24.106.157/api/task/${user_id}`;
    // const getTaskUrl = `http://localhost/api/task/${user_id}`;
    axios.get(getTaskUrl, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        if(response.data.length === 0) {
          return;
        }
        const data = response.data
        setTasks(data)
      })
      .catch( (e) => {
        throw new Error(e);
      })
  },[])

  return (
    <Grid container justify="center">
      <div className={localStorage.getItem("darkMode") === "on" ? classes.root2 : classes.root1}>
        {
          tasks && (tasks.filter( task => task.progress !== 100 && isSameDay(new Date(task.startDate), new Date(task.endDate)) ? isToday(new Date(task.startDate)) : areIntervalsOverlapping({start: new Date(task.startDate), end: new Date(task.endDate)}, {start: new Date() , end: new Date()})).length > 0)
            ?
            <>
            <Paper elevation={3} width={600} height={700}>
              <Typography  variant="subtitle1" gutterBottom style={{ height: 30, paddingTop: 5, marginLeft: 8, color: '#7A7875'  }} >
                本日（{today}）のタスク
                <Tooltip title="カレンダー画面へ移動">
                  <IconButton size="small" style={{ marginLeft: 300 }} onClick={() => history.push(`/task/${id}/2`)} ><DateRangeIcon /></IconButton>
                </Tooltip>
                <Tooltip title="ガントチャート画面へ移動">
                  <IconButton size="small" style={{ marginLeft: 20 }} onClick={() => history.push(`/task/${id}/3`)} ><FormatAlignLeftIcon /></IconButton>
                </Tooltip>
              </Typography>
              <Divider />
              <div>
              <EnhancedSwipeableViews
                enableMouseEvents
                index={index}
                onChangeIndex={setIndex}
                interval={5000}
                animateTransitions={true}
              >
                {
                tasks.filter( task => !task.group_id && task.progress !== 100 )
                .filter( task => isSameDay(new Date(task.startDate), new Date(task.endDate)) ? isToday(new Date(task.startDate)) : areIntervalsOverlapping({start: new Date(task.startDate), end: new Date(task.endDate)}, {start: new Date() , end: new Date()}))
                .map(task => (
                  <React.Fragment key={task.task_id}>
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>タイトル</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8  }} >{task.title}</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>開始日付</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8  }} >{task.startDate}</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>終了日付</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8  }} >{task.endDate}</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>ステータス</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8 }} >{task.progress === 0 ? "未進行" : task.progress === 100 ? "完了" : "進行中" }</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>詳細</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 70, paddingTop: 6, marginLeft: 8  }} >{task.detail === null || task.detail === "" ? "なし" : task.detail}</Typography>
                  </React.Fragment>)
                )}
                {tasks.filter( task => task.group_id != null && task.progress !== 100)
                .filter(task => isSameDay(new Date(task.startDate), new Date(task.endDate)) ? isToday(new Date(task.startDate)) : areIntervalsOverlapping({start: new Date(task.startDate), end: new Date(task.endDate)}, {start: new Date() , end: new Date()}))
                .map(task => (
                  <React.Fragment key={task.task_id}>
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>タイトル</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8  }} >{task.title}</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>開始日付</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8  }} >{task.startDate}</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>終了日付</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8  }} >{task.endDate}</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>ステータス</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 35, paddingTop: 6, marginLeft: 8 }} >{task.progress === 0 ? "未進行" : task.progress === 100 ? "完了" : "進行中" }</Typography>
                    <Divider />
                    <Typography variant="caption" style={{ marginLeft: 8, color: '#7A7875' }}>詳細</Typography>
                    <Typography  variant="h6" gutterBottom style={{ height: 70, paddingTop: 6, marginLeft: 8  }} >{task.detail === null || task.detail === "" ? "なし" : task.detail}</Typography>
                  </React.Fragment>
                ))}
              </EnhancedSwipeableViews>
              </div>
            </Paper>
              
            </>

            :
            
          <List 
            style={{ width: 600 }}
            component="nav"
            aria-label="secondary mailbox folders"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                予定なし
              </ListSubheader>
          } 
          >
            <Typography style={{ marginLeft: 195 }}>
              予定を作りませんか？
              <Tooltip title="カレンダー画面へ移動">
                  <IconButton size="small" style={{ marginLeft: 20 }} onClick={() => history.push(`/task/${id}/2`)} ><DateRangeIcon /></IconButton>
                </Tooltip>
              <Tooltip title="ガントチャート画面へ移動">
                <IconButton size="small" style={{ marginLeft: 10 }} onClick={() => history.push(`/task/${id}/3`)} ><FormatAlignLeftIcon /></IconButton>
              </Tooltip>
            </Typography>
          </List>
        }
        <div className={classes.root}>
          {/* <Pagination
            count={size1+size2}
            index={index}
            onChange={ (index) => setIndex(index)}
          /> */}
          <Pagination dots={size1+size2} index={index} onChangeIndex={setIndex} />
        </div>
      </div>
      
    </Grid>
  );
}

export default MyTaskList;