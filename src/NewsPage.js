import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardMedia, CardContent, IconButton, Grid } from '@material-ui/core';
import RefreshIcon from "@material-ui/icons/Refresh";
import Typography from '@material-ui/core/Typography';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import moment from 'moment';
import Toolbar from '@material-ui/core/Toolbar';
import { findByLabelText } from "@testing-library/react";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minWidth: 300,
        fontFamily: 'monospace',
        maxHeight: 800,
        minHeight: 300
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontSize: 15
    },
    button_position: {
        marginBottom: 15,
        marginLeft: 15,
    },
});

function WeatherHolder(props) {
    const cardHolder = useStyles();
    return (
        <a href={props.newsObj.url} style={{ textDecoration: 'none' }}>
            <Card className={cardHolder.root}>
                <CardHeader
                    title={props.newsObj.title}
                    subheader={props.newsObj.published}
                />
                <img src={props.newsObj.image} maxHeight={500} width={400} mode='fit' /> 
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
            url: 'https://newsapi.org/v2/everything?q=COVID-19&from=2020-05-10&sortBy=popularity&apiKey=38aa0595ba1e473aabb6193e9e8940ad',
            listArticles: {},
            objectthing: {},
        };
        this.retrieveNewsData({});
    }

    retrieveNewsData({ target }) {
        //5decfe986025127212ad9ae685327f91
        fetch("https://gnews.io/api/v3/search?q=covid&image=required&token=d657cba9d51565f8988c86dbdc36507c")
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
                    console.log(res.articles[i].url);
                    console.log(res.articles[i].image);

                    newList.push(newsapiobj);
                }
                this.setState({
                    listArticles: newList,
                });

            });
    }


    render() {

        if (this.state.listArticles[0] !== undefined) {
            return (
                <main className={this.state.classes.content}>
                    <div className="App">
                        <header className="App-header">
                            <Toolbar />
                            <p>Articles on COVID-19</p>

                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[0]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[1]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[2]} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[3]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[4]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[5]} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[6]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[7]} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <WeatherHolder newsObj={this.state.listArticles[8]} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </header>
                    </div>
                </main>)
        }
        return (<div>
            WAIT
        </div>)
    }
}

export default function NewsPage(props) {
    return (<NewsWindow classes={props.classes} />);
}
