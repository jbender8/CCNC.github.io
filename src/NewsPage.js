import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Grid, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import * as moment from 'moment';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minWidth: 300,
        fontFamily: 'monospace',
        maxHeight: 800,
        minHeight: 300
    },
});

function WeatherHolder(props) {
    const cardHolder = useStyles();
    return (
        <a href={props.newsObj.url} style={{ textDecoration: 'none' }}>
            <Card className={cardHolder.root}>
                <CardHeader
                    title={props.newsObj.title}
                    subheader={moment(props.newsObj.published).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                />
                <img src={props.newsObj.image} alt={props.newsObj.source} maxHeight={500} width={400} mode='fit' />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.newsObj.description}
                    </Typography>
                </CardContent>
            </Card>
        </a>
    );
}


class NewsWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            url: 'https://gnews.io/api/v3/search?q=chicago%20coronavirus&image=required&token=5decfe986025127212ad9ae685327f91',
            listArticles: {},
        };
        this.retrieveNewsData();
    }

    retrieveNewsData() {
        fetch(this.state.url)
            .then(resp => resp.json())
            .then(res => {
                var newList = [];

                for (let i = 0; i < 10; i++) {
                    var newsapiobj = {
                        title: res.articles[i].title,
                        description: res.articles[i].description,
                        url: res.articles[i].url,
                        image: res.articles[i].image,
                        published: res.articles[i].publishedAt,
                        source: res.articles[i].source.name,
                    }
                    newList.push(newsapiobj);
                }
                this.setState({
                    listArticles: newList,
                });

            });
    }


    render() {
        const { classes, listArticles } = this.state;
        if (this.state.listArticles[0] !== undefined) {
            return (
                <main className={classes.content}>
                    <div className="App">
                        <header className="App-header">
                            <Toolbar />
                            <h1 style={{ fontSize: "35px" }}>Articles on COVID-19</h1>

                            <Grid container justify="center" spacing={3}>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[0]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[1]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[2]} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[3]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[4]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[5]} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[6]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[7]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={listArticles[8]} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </header>
                    </div>
                </main>)
        }
        return (<main className={classes.content}>
            <div className="App">
                <header className="App-header">
                    <Toolbar />
                    <CircularProgress />
                </header>
            </div>
        </main>)
    }
}

export default function NewsPage(props) {
    return (<NewsWindow classes={props.classes} />);
}
