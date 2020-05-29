import React from "react";
import {
    Route,
    useLocation,
    Redirect,
    NavLink
} from "react-router-dom";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import moment from "moment";
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';



class StatsWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: props.classes,
            zip: this.props.zip,
            age: this.props.age,
            redirect: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    getZipData() {
        var zipUrl = "https://data.cityofchicago.org/resource/yhhz-zm2v.json";

        fetch(zipUrl)
            .then((resonse) => {
                return resonse.json();
            }).then((data) => {
                this.constructZipData(data);
            });
    }

    getAgeData() {
        var ageUrl = "https://data.cityofchicago.org/resource/naz8-j4nc.json";

        fetch(ageUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.constrcutAgeData(data);
            })
    }

    constrcutAgeData(dataArray) {
        var rawTargetData = dataArray[0];

        var targetLabels = ["cases_age_0_17", "cases_age_18_29", "cases_age_30_39", "cases_age_40_49",
            "cases_age_50_59", "cases_age_60_69", "cases_age_70_79", "cases_age_80_"];

        var targetData = targetLabels.map((sliceString) => {
            return rawTargetData[sliceString];
        });

        var backgroundColors = targetLabels.map((sliceString) => {
            var ageBounds = sliceString.replace("cases_age_", "").split('_');
            if (ageBounds[1] == "") ageBounds[1] = "110";
            if ((parseInt(ageBounds[0]) <= this.state.age) && (this.state.age <= parseInt(ageBounds[1]))) {
                return 'rgba(75, 192, 192, 0.6)'
            }
            else {
                return '#949494';
            }
        });

        var sanitizedLabels = targetLabels.map((sliceString) => {
            var prefixRemoved = sliceString.replace("cases_age_", "");
            var dashRemoved = (prefixRemoved.includes("80")) ? prefixRemoved.replace("_", "+") : prefixRemoved.replace("_", "-");
            return dashRemoved
        })

        var pieDataObject = {
            labels: sanitizedLabels,
            datasets: [
                {
                    data: targetData,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: ['#1b1b5c', '#63206c', '#9f276f', '#d33d66', '#f86356', '#ff9342', '#ffc734', '#fffc45']
                }
            ]
        };

        this.setState({
            pieDataObject: pieDataObject
        });

    }

    constructZipData(dataArray) {
        var targetData = dataArray.filter(element => {
            return element.zip_code == this.state.zip;
        });

        var labels = targetData.map(element => moment.utc(element.week_start).format("MMMM Do"));
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
            zipDataObject: zipDataObject,
        });

    }

    componentDidMount() {
        this.getZipData();
        this.getAgeData();
    }

    handleSubmit(event) {
        this.setState({ redirect: true });
    }

    render() {
        var optionsObjzip = {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                labels: {
                    fontColor: 'white',
                    fontSize: 16
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'white'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white'
                    }
                }]
            }
        };

        var optionsObjpie = {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                labels: {
                    fontColor: 'white',
                    fontSize: 16
                }
            }
        };

        if (this.state.redirect) {
            return (<Redirect push to='/news' />);
        }
        return (
            <main className={this.state.classes.content}>
                <div className="App">
                    <header className="App-header">
                        <Toolbar />
                        <h1 style={{ fontSize: "35px" }}>Test by zip code: {this.state.zip}</h1>
                        <Bar
                            height={110}
                            options={optionsObjzip}
                            data={this.state.zipDataObject}
                        />
                        <canvas
                            id="AccessibleBar"
                            hight="1"
                            aria-label={"Bar chart. x axis, week of. y axis, number of tests."
                                + "week of ____ , ____ test"
                            }
                            role="img"
                        ></canvas>
                        <h1 style={{ fontSize: "35px" }}>Cases by Age: {this.state.age}</h1>
                        <Pie
                            height={50}
                            options={optionsObjpie}
                            data={this.state.pieDataObject}
                        />
                        <canvas
                            id="AccessibleBar"
                            hight="1"
                            aria-label={"Pie chart."
                                + "Ages 0-17, ____ cases"
                            }
                            role="img"
                        ></canvas>
                        <Button className="updateButton" style={{ color: "white" }} onClick={this.handleSubmit}>
                            GET LATEST NEWS
                        </Button>
                        <Toolbar />
                    </header>
                </div >
            </main >
        );
    }
}

export default function StatsPage(props) {
    let query = useQuery();
    return (<StatsWindow classes={props.classes} zip={query.get("zip")} age={query.get("age")} />);
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
