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

import StatsPage from "./StatsPage"


export default function Template(props){
    
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
    <div className={props.classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(props.classes.appBar, {
                [props.classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(props.classes.menuButton, open && props.classes.hide)}
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
                className={props.classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: props.classes.drawerPaper,
                }}
            >
                <div className={props.classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
            <Divider />
                <div>
                    <List component="nav">
                        <ListItem>
                            <Link to="/" className={props.classes.linkStyle}>Home</Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/stats" className={props.classes.linkStyle}>Stats</Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/news" className={props.classes.linkStyle}>News</Link>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <div className={props.classes.drawerHeader} />
            <Switch>
                {/* <Route path="/news">
                    <News />
                </Route> */}
                {/* <Route path="/stats">
                    <StatsPage />
                </Route> */}
                {/* <Route path="/">
                    <Hom />
                </Route> */}
            </Switch>
        </Router>
    </div>);
}