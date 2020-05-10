import React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles'; import CssBaseline from '@material-ui/core/CssBaseline';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    Redirect,
    NavLink
} from "react-router-dom";


class StatsWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: props.classes,
            zip: this.props.zip
        };
    }

    getZipData(){
        var zipUrl = "https://data.cityofchicago.org/resource/yhhz-zm2v.json";

        fetch(zipUrl).then((resonse) =>{
            return resonse.json();
        }).then((data) => {
            console.log(data)
        });
    }


    render() {
        return (
            <main className={this.state.classes.content}>
                <div className="App">
                    <header className="App-header">
                        <p>Stats {this.state.zip}</p>
                    </header>
                </div>
            </main>
        );
    }
}

export default function StatsPage(props) {
    let query = useQuery();
    return (<StatsWindow classes={props.classes} zip={query.get("zip")} />);
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
