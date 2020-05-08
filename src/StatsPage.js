import React from "react";
import Toolbar from '@material-ui/core/Toolbar';

export default class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classN: props.classN
        }
    }
    render() {
        return (
            <main className={this.state.classN}>
                <Toolbar />
                <p>Stats Pagetetete</p>
            </main>
        )
    }
}