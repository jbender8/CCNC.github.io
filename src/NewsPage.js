import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Grid, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import * as moment from 'moment';
import './news.css';

const useStyles = makeStyles({
    root: {
        width: 400,
        fontFamily: 'monospace',
        height: 600
    },
});

function NewsHolder(props) {
    const cardHolder = useStyles();
    return (
        <div className="grid-card">
            <a href={props.newsObj.url} style={{ textDecoration: 'none' }}>
                <Card className={cardHolder.root}>
                    <CardHeader className="card-title"
                        title={props.newsObj.title}
                        subheader={moment(props.newsObj.published).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                    />
                    <img className="news-img" src={props.newsObj.image} alt={props.newsObj.source}  mode='fit' />
                    <CardContent className="card-content">
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.newsObj.description}
                        </Typography>
                    </CardContent>
                </Card>
            </a>
        </div>
        
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
                                <Grid container  item xs={12} spacing={3}>
                                    <Grid  className="grid-card" item xs={4}>
                                        <NewsHolder newsObj={listArticles[0]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[1]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[2]} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[3]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[4]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[5]} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[6]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[7]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NewsHolder newsObj={listArticles[8]} />
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
