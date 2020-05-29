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
import Button from '@material-ui/core/Button';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import StatsPage from "./StatsPage";
import NewsPage from "./NewsPage";
import Template from "./Template"
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
        background: "#282c34",
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
        background: "linear-gradient(135deg, rgb(29, 39, 94) 30%, rgb(110, 7, 114) 90%)"
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
        color: 'white',
        background: "#282c34"

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
                        <IconButton onClick={handleDrawerClose} aria-label="close drawer">
                            {theme.direction === 'ltr' ? <ChevronLeftIcon aria-label="open drawer" color="primary" /> : <ChevronRightIcon aria-label="open drawer" color="primary" />}
                        </IconButton>
                    </div>
                    <Divider />
                    <div>
                        <List component="nav">
                            <ListItem button component="a" href="/">
                                <h1 className="textDrawer">Home</h1>
                            </ListItem>
                            <ListItem button component="a" href="/news">
                                <h1 className="textDrawer">News</h1>
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
                    <img src={logo} className="App-logo" alt="Covid-19 logo" />
                    <h1 style={{ fontSize: "35px" }}>COVID-19 Information</h1>
                    <SubmitForm />
                </header>
            </div>
            <Footer />
        </main>);
}

function Stats() {
    //need a query for zipcode
    const classes = useStyles();
    return (
        <div>
            <StatsPage classes={classes} />
            <Footer />
        </div>

    );
}

function News() {
    //Key word search ? Maybe add a query if needed
    const classes = useStyles();
    return (
        <div>
            <NewsPage classes={classes} />
            <Footer />
        </div>

    );

}

/* form work for Home Page */
class SubmitForm extends React.Component {
    /*
    *  Home page to submit the zip code and direct to Stats page
    */
    constructor(props) {
        super(props);
        this.state = {
            zip: '',
            age: '',
            url: '/stats?zip=',
            redirect: false
        };
        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleZipChange(event) {
        const url = "/stats?zip=";
        const zip = encodeURI(event.target.value);
        const age = "&age=" + this.state.age;
        const finalURL = url + zip + age;
        this.setState({
            zip: event.target.value,
            url: finalURL
        });
        console.log(this.state);
    }

    handleAgeChange(event) {
        const url = "/stats?zip=";
        const age = "&age=" + encodeURI(event.target.value);
        const zip = this.state.zip;
        const finalURL = url + zip + age;
        this.setState({
            age: event.target.value,
            url: finalURL
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        if (this.state.zip !== '' && this.state.age !== '') {
            this.setState({ redirect: true });
        }
    }

    render() {
        const { redirect, url } = this.state;
        // var targetUrl = this.state.url + "?zip=" + this.state.value;
        if (redirect) {
            return <Redirect push to={this.state.url} />
        }
        return (
            <form>
                <div className="formInput">
                    <InputBase
                        placeholder="Enter Chicago Zipcode"
                        inputProps={{ 'aria-label': 'Enter Chicago Zipcode' }}
                        value={this.state.zip}
                        onChange={this.handleZipChange}
                        style={{ padding: "10px" }}
                    />
                </div>
                <div className="formInput">
                    <InputBase
                        placeholder="Enter your age"
                        inputProps={{ 'aria-label': 'Enter your Age' }}
                        value={this.state.age}
                        onChange={this.handleAgeChange}
                        style={{ padding: "10px" }}
                    />
                </div>
                <Button className="updateButton" style={{ color: "white" }} onClick={this.handleSubmit}>
                    SEARCH
                </Button>

            </form>
        );
    }
}


// Styles and imports were ommited
function Footer() {
    const classes = useStyles();
    return (
        <AppBar position='fixed' className={classes.appBar2}>
            <Typography variant='h2' className={classes.footer} >
                © Copyright 2020
        </Typography>
        </AppBar>
    );
}