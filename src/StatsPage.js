import React from "react";
import { Redirect } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import moment from "moment";
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { getZipData, getAgeData } from './ApiModule';

export default class StatsWindow extends React.Component {
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

    constrcutAgeData(dataArray) {
        var rawTargetData = dataArray[0];

        var targetLabels = ["cases_age_0_17", "cases_age_18_29", "cases_age_30_39", "cases_age_40_49",
            "cases_age_50_59", "cases_age_60_69", "cases_age_70_79", "cases_age_80_"];

        var targetData = targetLabels.map((sliceString) => {
            return rawTargetData[sliceString];
        });

        var targetLabeldate = ["lab_report_date"];

        var targetDatadate = targetLabeldate.map((sliceString) => {
            return rawTargetData[sliceString];
        });

        var backgroundColors = targetLabels.map((sliceString) => {
            var ageBounds = sliceString.replace("cases_age_", "").split('_');
            if (ageBounds[1] === "") ageBounds[1] = "110";
            return ((parseInt(ageBounds[0]) <= this.state.age) && (this.state.age <= parseInt(ageBounds[1]))) 
                    ? 'rgb(29, 39, 94)'
                    : '#949494';
        });

        var sanitizedLabels = targetLabels.map((sliceString) => {
            var prefixRemoved = sliceString.replace("cases_age_", "");
            return (prefixRemoved.includes("80")) ? prefixRemoved.replace("_", "+") : prefixRemoved.replace("_", "-");
        });

        var pieDataObject = {
            labels: sanitizedLabels,
            datasets: [
                {
                    data: targetData,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: ['#B7D9E4', '#63206c', '#9f276f', '#d33d66', '#f86356', '#ff9342', '#ffc734', '#fffc45']
                }
            ]
        };

        this.setState({
            pieDataObject: pieDataObject,
            piedate: moment(targetDatadate, 'YYYY-MM-DDTHH:mm:ssZ').format("MMMM Do YYYY")
        });
    }

    constructZipData(dataArray) {
        var targetData = dataArray.filter(element => {
            return element.zip_code === this.state.zip;
        });

        var sortedData = targetData.sort((ele1, ele2) => {
            return ele1.week_number < ele2.week_number ? -1 : 1;
        });

        var labels = sortedData.map(element => moment.utc(element.week_start).format("MMMM Do"));
        var deathsData = sortedData.map(element => element.tests_weekly);

        var zipDataObject = {
            labels: labels,
            datasets: [
                {
                    label: 'Tests Per Week',
                    data: deathsData,
                    backgroundColor: 'rgb(110, 7, 114)',
                }
            ]
        };

        this.setState({
            zipDataObject: zipDataObject,
        });
    }

    async componentDidMount() {
        var zipData = await getZipData()
        var ageData = await getAgeData();
        this.constructZipData(zipData);
        this.constrcutAgeData(ageData);
    }

    handleSubmit(event) {
        this.setState({ redirect: true });
    }
    static defaultProps = {
        displayLegend: true,
        legendPosition: 'top',
        displayXAxesLabel: true,
        displayYAxesLabel: true,
        responsive: true,
        maintainAspectRatio: true,
        beginAtZero: true,
        displayYAxes: true,
        displayXAxes: true,
        displayYAxesGridlines: true,
        displayXAxesGridlines: true,
    }

    render() {
        if (this.state.redirectHome)
            return <Redirect push to="/home" />


        var optionsObjzip = {
            responsive: this.props.responsive,
            maintainAspectRatio: this.props.maintainAspectRatio,
            legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                    fontColor: 'white',
                    fontSize: 16,
                }
            },
            scales: {
                yAxes: [{
                    display: this.props.displayYAxes,
                    gridLines: {
                        display: this.props.displayYAxesGridlines,
                        color: "#0d0d0d"
                    },
                    ticks: {
                        beginAtZero: this.props.beginAtZero,
                        fontColor: 'white',
                    },
                    scaleLabel: {
                        display: this.props.displayYAxesLabel,
                        labelString: 'Number of Tests',
                        fontColor: 'white',
                        fontSize: 16,
                    }

                }],
                xAxes: [{
                    display: this.props.displayXAxes,
                    gridLines: {
                        display: this.props.displayXAxesGridlines,
                        color: "#0d0d0d"
                    },
                    ticks: {
                        fontColor: 'white'
                    },
                    scaleLabel: {
                        display: this.props.displayXAxesLabel,
                        labelString: 'Week of',
                        fontColor: 'white',
                        fontSize: 18,
                    }
                }]
            }
        };

        var optionsObjpie = {
            responsive: this.props.responsive,
            maintainAspectRatio: this.props.maintainAspectRatio,
            legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                    fontColor: 'white',
                    fontSize: 16
                }
            }
        };

        if (this.state.redirect) {
            return (<Redirect push to='/news' />);
        }

        var zipAriaLabel = "Bar chart. x axis, week of. y axis, number of tests.";
        if (this.state.zipDataObject) {
            this.state.zipDataObject.datasets[0].data.forEach((numTests, index) => {
                zipAriaLabel += ` Week of ${this.state.zipDataObject.labels[index]}, ${numTests} tests.`;
            });
        }

        var ageAriaLabel = "Doughnut chart. ";
        if (this.state.pieDataObject) {
            this.state.pieDataObject.datasets[0].data.forEach((numCases, index) => {
                var ageRange = this.state.pieDataObject.labels[index];
                ageAriaLabel +=
                    (!ageRange.includes("80")) ? `Ages ${ageRange.split('-')[0]} to ${ageRange.split('-')[1]}, ${numCases} cases. `
                        : `Ages ${ageRange.split('+')[0]} plus, ${numCases} cases. `;
            });
        }

        return (
            <main className={this.state.classes.content}>
                <div className="App">
                    <header className="App-header">
                        <Toolbar />
                        <h1 style={{ fontSize: "35px" }}>Number of Tests Weekly by Zip Code: {this.state.zip}</h1>
                        <Bar
                            height={110}
                            options={optionsObjzip}
                            data={this.state.zipDataObject}
                        />
                        <canvas
                            id="AccessibleBar"
                            hight="1"
                            aria-label={zipAriaLabel}
                        ></canvas>
                        <h1 style={{ fontSize: "35px" }}>Number of Cases In Chicago by Age: {this.state.age}</h1>
                        <h2 style={{ fontSize: "23px" }}>As of: {this.state.piedate}</h2>
                        <Doughnut
                            height={50}
                            options={optionsObjpie}
                            data={this.state.pieDataObject}
                        />
                        <canvas
                            id="AccessibleBar"
                            hight="1"
                            aria-label={ageAriaLabel}
                        ></canvas>
                        <Button className="updateButton stat" style={{ color: "white" }} onClick={this.handleSubmit}>
                            GET LATEST NEWS
                        </Button>
                        <Toolbar />
                    </header>
                </div >
            </main >
        );
    }
}


