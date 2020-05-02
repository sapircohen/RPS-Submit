import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';
import Header from './MainHeader';
import {findCourseForProject,getConfigsForProject} from '../functions/functions'


class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.changedGroupName = this.changedGroupName.bind(this);
    this.changedPassword = this.changedPassword.bind(this);
  }
  state={
    password:'',
    groupName:'',
    isReady:true
  }
  
  CheckUser = async (event)=>{
    const {history} = this.props;
    event.preventDefault();
    this.setState({
      isReady:false,
    },()=>{
    if (this.state.password === '') {
      alert("שכחת סיסמה?");
      this.setState({
        isReady:true,
      })
      return;
    }
    else if (this.state.groupName === '') {
      alert("שכחת שם משתמש?");
      this.setState({
        isReady:true,
      })
      return;
    }
    let logged = false;
    const ref = firebase.database().ref('RuppinProjects');
    ref.once("value", (snapshot)=> {
      snapshot.forEach( (project)=> {
        if(this.state.groupName === project.val().GroupName && project.val().Password==='notEditableDontEvenTry'){
          alert('התוצר נעול לעריכה, פנה למנהל מערכת');
          logged=true;
        }
        if (parseInt(this.state.password.trim()) === project.val().Password && this.state.groupName === project.val().GroupName) {
          logged = true;          
          localStorage.setItem('groupData', JSON.stringify(project.val()));
          localStorage.setItem('projectKey',JSON.stringify(project.key))
          if(project.val().templateSubmit){
              if(project.val().ProjectCourse){
                getConfigsForProject(project.val(),project.val().ProjectCourse);
                window.setTimeout(()=>history.push('/'+project.val().templateSubmit),3000)

              }
              else{
                console.log(project.val())
                findCourseForProject(project.val());
                window.setTimeout(()=>history.push('/'+project.val().templateSubmit),3000)
                
              }
          }
          else history.push('/CourseChoice');
        }
    })
    }, (errorObject)=> {
      console.log("The read failed: " + errorObject.code);
    })
    .then(()=>{
        if (!logged) {
          alert('נתונים שגויים, נסה שוב');
          this.setState({isReady:true})
        }
    })

  })
  }
  changedGroupName(e){
    this.setState({groupName:e.target.value.trim()},()=>console.log(this.state.groupName));
  }
  changedPassword(e){
    this.setState({password:e.target.value.trim()})
  }
  render(){
    const { classes } = this.props;
    if(!this.state.isReady){
      return(
        <div style={{flex:1,marginTop:'20%'}}>
          <Loader 
          type="Watch"
          color="#58947B"
          height="100"	
          width="100"
          />  
        </div> 
      )
    }
    return (
      <div>
        <Header/>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar style={{backgroundColor:'transparent'}} className={classes.avatar}>
              <img
                alt="ruppin logo"
                src='http://sn2e.co.il/wp-content/uploads/2016/07/logo.Ruppin_round-300x296.png'
                width='70'
                height='70'
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              ממשק הזנת תוצרים
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">שם משתמש</InputLabel>
                <Input id="groupName" onChange={this.changedGroupName} name="groupName" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">סיסמה</InputLabel>
                <Input name="password" onChange={this.changedPassword} type="password" id="password" autoComplete="current-password" />
              </FormControl>
              <Button
                onClick={this.CheckUser}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                התחבר
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}
LoginScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
export default withStyles(styles)(LoginScreen);