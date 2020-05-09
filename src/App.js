import React from "react";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles'; import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './corona.png';
import './App.css';
import InputBase from '@material-ui/core/InputBase';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import StatsPage from "./StatsPage";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: 'transparent',
        boxShadow: 'none',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {

        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {

        width: drawerWidth,
        background: '#D3D3D3',
    },
    drawerHeader: {

        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    linkStyle: {
        fontSize: 20,
    },
    labelStyle: {
        fontSize: 15,
    },
    footer: {
        marginLeft: 20,
        fontSize: 17,
    },
    appBar2: {
        top: 'auto',
        bottom: 0,
        marginLeft: drawerWidth,
        background: 'transparent',
        boxShadow: 'none',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: -1,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function App() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        WebApps Final
                    </Typography>
                </Toolbar>
            </AppBar>
            <Router>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
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
                <div className={classes.drawerHeader} />
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
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>COVID-19 Information</p>
                    <SubmitForm />
                </header>
            </div>
            <Footer />
        </main>);
}

function Stats() {
    //need a query for zipcode
    const classes = useStyles();
    return (<StatsPage classN={classes.content} />);
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
            url: '/',
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const url = "/stats";
        const test = encodeURI(event.target.value);
        const finalURL = url + test;
        this.setState({
            value: event.target.value,
            url: url
        });
    }

    handleSubmit(event) {
        if (this.state.value !== '') {
            this.setState({ redirect: true });
        }
    }

    render() {
        const { redirect, url } = this.state;
        if (redirect) {
            return <Redirect push to={url} />
        }
        return (
            <form>
                <div className="formInput">
                    <InputBase
                        placeholder="Enter Zipcode"
                        inputProps={{ 'aria-label': 'Enter Zipcode' }}
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{ padding: "10px" }}
                    />
                    <button className="updateButton" onClick={this.handleSubmit} >
                        Search
                     </button>

                </div>
            </form>
        );
    }
}


// Styles and imports were ommited
function Footer() {
    const classes = useStyles();
    return (
        <AppBar position='fixed' className={classes.appBar2}>
            <Typography variant='h6' className={classes.footer}>
                © Copyright 2020
        </Typography>
        </AppBar>
    );
}