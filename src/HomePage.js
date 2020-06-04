
import { getZipData } from './ApiModule';
import React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './corona.png';
import './App.css';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';
import {
    Redirect,
} from "react-router-dom";

class HomeWindow extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            classes: props.classes,
        };
    }
    render() {
        const { classes } = this.state;
        return (<main className={classes.content}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="Covid-19 logo" />
                    <Typography variant='h5'>Chicago COVID-19 Number Cruncher</Typography>
                    <SubmitForm />
                    <div className="about">
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={4}>
                                <Typography variant='h5' color="primary">What is CCNC?</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h5' color="primary">Where can I find more information?</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h5' color="primary">How can I help Chicago recover?</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={4}>
                                <Typography variant='h6'>
                                    Chicago COVID-19 Number Cruncher provides testing statistics based on a Chicago Zipcode.
                                    In addition, you can see how many cases surround people in your age gap.
                            </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>
                                    Check out the news page to view articles surrounding COVID-19 in Chicago. This page will render
                                    most popular articles at the point in which you access.
                            </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>
                                    There are many places in need of donations to support the Chicago community. We encourage you to visit Chicago's COVID-19 <a href="https://www.chicagocovid19responsefund.org/">response fund</a>.
                            </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Toolbar />
                </header>
            </div>
        </main>);
    }
}

class SubmitForm extends React.Component {

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

    async handleSubmit() {
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
        const { redirect, error, zip, age } = this.state;
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
                            value={zip}
                            onChange={this.handleZipChange}
                            style={{ padding: "10px" }}
                        />
                    </div>
                    <div className="formInput">
                        <InputBase
                            placeholder="Enter your age"
                            inputProps={{ 'aria-label': 'Enter your Age' }}
                            value={age}
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


export default function HomePage(props) {
    return (<HomeWindow classes={props.classes} />);
}
