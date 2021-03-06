import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Radio from "@material-ui/core/Radio";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
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
}));

export function Register() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRadio, setSelectedRadio] = useState("");
  const [progress, setProgress] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(selectedDate)
  // };

  // const handleRadioChange = event => {
  //   // ???????????????????????????value?????????set????????????
  //   setSelectedRadio(event.target.value);
  // };

  // const handleProgressChange = (event) => {
  //   setProgress(event.target.value);
  // };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "/tests1"
    let data = JSON.stringify({
      title: title,
      name: name,
    });

    axios.post(url, data,{headers:{"Content-Type": "application/json"}})
    .then(function (response) {
      console.log(response)
      console.log("??????")
    })
    .catch(function (error) {
      console.log(error)
      console.log("??????")
    })

  }

  return(
    <React.Fragment>
      <h3>?????????????????????</h3>

      <form className={classes.form} autoComplete="off">
        <TextField onChange={handleTitleChange} value={title} className={classes.items} label="?????????????????????????????????" id="outlined-search" type="search" variant="outlined" size="small" /><br /><br />
        {/* <FormControl component="label">
          <RadioGroup
            name="JavaScript framework"
            value={selectedRadio}
            row aria-label="position"
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="individual"
              control={<Radio color="primary" />}
              label="??????"
            />
            <FormControlLabel
              value="group"
              control={<Radio color="primary" />}
              label="????????????"
            />
          </RadioGroup>
        </FormControl><br /><br /> */}
        <TextField onChange={handleNameChange} className={classes.items} label="???????????????????????????" id="outlined-search" type="search" variant="outlined" size="small" value={name} /><br />
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="?????????????????????"
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
          <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
          <Select
            native
            value={progress}
            onChange={handleProgressChange}
            label="Age"
            inputProps={{
              name: 'age',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl><br />
        <TextField
          id="filled-multiline-static"
          label="??????????????????"
          multiline
          rows={4}
          className={classes.items}
          variant="filled"
        /><br /><br /> */}
        <Button className={classes.pad} variant="outlined" size="large" onClick={handleClose}>??????</Button>
        <Button color="primary" variant="outlined" size="large" onClick={handleSubmit} >??????</Button>
      </form>

    </React.Fragment>
  )
}
