import React from "react";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import Alert from '@material-ui/lab/Alert';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";
import StatsWindow from "./StatsPage";
import NewsPage from "./NewsPage";
import { getZipData } from './ApiModule';

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
        color: 'white',
        background: "#282c34",
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
                        CCNC
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
                            {theme.direction === 'ltr' ? <ChevronLeftIcon aria-label="left drawer" color="primary" /> : <ChevronRightIcon aria-label="right drawer" color="primary" />}
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
                    <h1 style={{ fontSize: "35px" }}>Chicago COVID-19 Number Cruncher</h1>
                    <SubmitForm />
                </header>
            </div>
            <Footer />
        </main>
    );
}

function Stats() {
    const classes = useStyles();
    let query = useQuery();
    return (<div>
        <StatsWindow classes={classes} zip={query.get("zip")} age={query.get("age")} />
        <Footer />
    </div>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function News() {
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
            url: finalURL,
            error: false,
        });
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
    }

    async handleSubmit(event) {
        const response = await getZipData();
        const test = (!isNaN(this.state.age) && parseInt(this.state.age) > 1 && response.map(t => t.zip_code).includes(this.state.zip))
        if (this.state.zip !== '' && this.state.age !== '' && test) {
            this.setState({ redirect: true });
        } else {
            this.setState({
                error: true,
                zip: "",
                age: ""
            });
        }
    }

    render() {
        const { redirect, error } = this.state;
        if (redirect) {
            return <Redirect push to={this.state.url} />
        }
        return (
            <div className="sumbitArea">
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
                    <Button className="updateButton home" style={{ color: "white" }} onClick={this.handleSubmit}>
                        SEARCH
                </Button>
                </form>
                {error ? <Alert severity="error">Incorrect age or zipcode — enter in a valid Chicago zip and age!</Alert>
                    : void 0}
            </div>
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