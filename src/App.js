import React from "react";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#282c34',
  },
  drawer: {
    width: drawerWidth,
    backgroundColor: '#282c34',

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#d3d3d3',

  },
  linkStyle: {
    fontSize: 20,
  },
  labelStyle: {
    fontSize: 15,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            WebApps Final
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <Toolbar />

          <div>
            <List component="nav">
              <ListItem>
                <Link to="/" className={classes.linkStyle}>Home</Link>
              </ListItem>
              <ListItem>
                <Link to="/stats" className={classes.linkStyle}>Stats</Link>
              </ListItem>
              <ListItem>
                <Link to="/news" className={classes.linkStyle}>News</Link>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <Switch>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

/* ALL Function pages */
function Home() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <p>Home Page</p>
    </main>);
}

function Stats() {
  //need a query for zipcode
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <p>Stats Page</p>
    </main>);
}

function News() {
  //Key word search ? Maybe add a query if needed
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <p>News Page</p>
    </main>);
}

/* form work for Home Page */
class SubmitForm extends React.Component {
  /*
  *  Home page to submit the zip code and direct to Stats page
  */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      url: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const url = "/welcome?msg=";
    const test = encodeURI(event.target.value);
    const finalURL = url + test;
    this.setState({
      value: event.target.value,
      url: finalURL
    });
  }

  handleSubmit(event) {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect, url } = this.state;
    if (redirect) {
      return <Redirect push to={url} />
    }
    return (
      <form>
        <h1>Hello!</h1>
        <label style={{ fontSize: 20 }}>
          Please enter a welcome message:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={this.handleSubmit}>Login</button>
      </form>
    );
  }
}
