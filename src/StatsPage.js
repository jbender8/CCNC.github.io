import React from "react";
import {
    Route,
    useLocation,
    Redirect,
    NavLink
} from "react-router-dom";
import { Bar } from "react-chartjs-2";
import moment from "moment";


class StatsWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: props.classes,
            zip: this.props.zip
        };
    }

    getZipData() {
        var zipUrl = "https://data.cityofchicago.org/resource/yhhz-zm2v.json";

        fetch(zipUrl)
            .then((resonse) => {
                return resonse.json();
            }).then((data) => {
                console.log(data);
                this.constructZipData(data);
            });
    }

    constructZipData(dataArray) {
        var targetData = dataArray.filter(element => {
            return element.zip_code == this.state.zip;
        });

        var labels = targetData.map(element => moment.utc(element.week_start).format("MMMM Do") );
        var deathsData = targetData.map(element => element.tests_weekly);

        var zipDataObject = {
            labels: labels,
            datasets: [
                {
                    label: 'Tests Per Week',
                    data: deathsData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }
            ]
        };

        this.setState({
            zipDataObject: zipDataObject
        });
    }

    componentDidMount(){
        this.getZipData();
    }


    render() {
        var optionsObj = {
            height: "300",
            responsive: true,
            maintainAspectRatio: true
        };

        return (
            <main className={this.state.classes.content}>
                <div className="App">
                    <header className="App-header">
                        <p>Stats for zip code: {this.state.zip}</p>
                        <Bar options={optionsObj} data={this.state.zipDataObject} />
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
