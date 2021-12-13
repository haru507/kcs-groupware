import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import calendar from "../assets/img/カレンダー.png"
import gant from "../assets/img/ガントチャート.png"
import group from "../assets/img/グループ.png"
import task from "../assets/img/タスク.png"
import chat from "../assets/img/チャット.png"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    marginLeft: 20,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
    height: '70vh'
  },
}));

function getSteps() {
  return ['タスク一覧 → タスク作成', 'タスク カレンダー画面', 'タスク ガントチャート画面', 'グループ画面', 'チャット画面'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return task;
    case 1:
      return calendar ;
    case 2:
      return gant ;
    case 3:
      return group;
    case 4:
      return chat;
    default:
      return ;
  }
}

const Intro = () => {
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <img className={classes.instructions} src={getStepContent(activeStep)} />
            <div style={{ textAlign: 'center' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {
                activeStep === steps.length - 1 
                  ? 
                  <Button variant="contained" color="primary" onClick={ () => history.goBack() }>Finish</Button>
                  :
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Intro;