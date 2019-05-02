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

class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.changedGroupName = this.changedGroupName.bind(this);
    this.changedPassword = this.changedPassword.bind(this);
  }
  state={
    password:'',
    groupName:''
  }
  CheckUser = (event)=>{
    const {history} = this.props;
    event.preventDefault();
    if (this.state.password === '' || this.state.groupName === '') {
      alert("can't connect");
      return;
    }
    //check user on firebase. 
    //need to add to each group a name and a password!!!
    let logged = false;
    const ref = firebase.database().ref('RuppinProjects');
    ref.once("value", (snapshot)=> {
      snapshot.forEach((project)=> {
        if (parseInt(this.state.password) === project.val().Password && this.state.groupName === project.val().GroupName) {
          logged = true;
          console.log(project.val())
          localStorage.setItem('groupData', JSON.stringify(project.val()));
          if (project.val().Major === 'מערכות מידע') {
            history.push('/ISproject');
          }
        }
    })
    }, (errorObject)=> {
      console.log("The read failed: " + errorObject.code);
    })
    .then(()=>{
      if (!logged) {
        history.push('/Crop');
        alert('worng details, try again')
      }
    })
  }
  changedGroupName(e){
    this.setState({groupName:e.target.value});
  }
  changedPassword(e){
    this.setState({password:e.target.value})
  }
  render(){
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar style={{backgroundColor:'transparent'}} className={classes.avatar}>
            <img
              alt="ruppin logo"
              src='http://sn2e.co.il/wp-content/uploads/2016/07/logo.Ruppin_round-300x296.png'
              width='80'
              height='80'
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            התחבר
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
    );
  }
}

LoginScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginScreen);