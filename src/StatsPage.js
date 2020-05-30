import React from "react";
import { Redirect } from "react-router-dom";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
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

        var backgroundColors = targetLabels.map((sliceString) => {
            var ageBounds = sliceString.replace("cases_age_", "").split('_');
            if (ageBounds[1] === "") ageBounds[1] = "110";
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
            pieDataObject: pieDataObject,
            piedataget017: pieDataObject['datasets']['0']['data']['0'],
            piedataget1829: pieDataObject['datasets']['0']['data']['1'],
            piedataget3039: pieDataObject['datasets']['0']['data']['2'],
            piedataget4049: pieDataObject['datasets']['0']['data']['3'],
            piedataget5059: pieDataObject['datasets']['0']['data']['4'],
            piedataget6069: pieDataObject['datasets']['0']['data']['5'],
            piedataget7079: pieDataObject['datasets']['0']['data']['6'],
            piedataget80: pieDataObject['datasets']['0']['data']['7']
        });
    }

    constructZipData(dataArray) {
        var targetData = dataArray.filter(element => {
            return element.zip_code === this.state.zip;
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
            zipweek1: zipDataObject["labels"]['0'],
            zipweek2: zipDataObject["labels"]['1'],
            zipweek3: zipDataObject["labels"]['2'],
            zipweek4: zipDataObject["labels"]['3'],
            zipweek5: zipDataObject["labels"]['4'],
            zipweek6: zipDataObject["labels"]['5'],
            zipweek7: zipDataObject["labels"]['6'],
            zipweek8: zipDataObject["labels"]['7'],
            zipweek9: zipDataObject["labels"]['8'],
            zipweek10: zipDataObject["labels"]['9'],
            zipweek11: zipDataObject["labels"]['10'],
            zipweek12: zipDataObject["labels"]['11'],
            zipdataforweek1: zipDataObject['datasets']['0']['data']['0'],
            zipdataforweek2: zipDataObject['datasets']['0']['data']['1'],
            zipdataforweek3: zipDataObject['datasets']['0']['data']['2'],
            zipdataforweek4: zipDataObject['datasets']['0']['data']['3'],
            zipdataforweek5: zipDataObject['datasets']['0']['data']['4'],
            zipdataforweek6: zipDataObject['datasets']['0']['data']['5'],
            zipdataforweek7: zipDataObject['datasets']['0']['data']['6'],
            zipdataforweek8: zipDataObject['datasets']['0']['data']['7'],
            zipdataforweek9: zipDataObject['datasets']['0']['data']['8'],
            zipdataforweek10: zipDataObject['datasets']['0']['data']['9'],
            zipdataforweek11: zipDataObject['datasets']['0']['data']['10'],
            zipdataforweek12: zipDataObject['datasets']['0']['data']['11'],
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
        beginAtZero: true

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
                    ticks: {
                        fontColor: 'white'
                    },
                    scaleLabel: {
                        display: this.props.displayXAxesLabel,
                        labelString: 'Week of',
                        fontColor: 'white',
                        fontSize: 16,
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
        return (
            <main className={this.state.classes.content}>
                <div className="App">
                    <header className="App-header">
                        <Toolbar />
                        <div className="barchart">
                            <h1 style={{ fontSize: "35px" }}>Number of Tests Weekly by Zip Code: {this.state.zip}</h1>
                            <Bar
                                height={700}
                                width={1800}
                                options={optionsObjzip}
                                data={this.state.zipDataObject}
                            />
                            <canvas
                                id="AccessibleBar"
                                hight="1"
                                aria-label={"Bar chart. x axis, week of. y axis, number of tests."
                                    + "week of " + this.state.zipweek1 + "," + this.state.zipdataforweek1 + " tests."
                                    + "week of " + this.state.zipweek2 + "," + this.state.zipdataforweek2 + " tests."
                                    + "week of " + this.state.zipweek3 + "," + this.state.zipdataforweek3 + " tests."
                                    + "week of " + this.state.zipweek4 + "," + this.state.zipdataforweek4 + " tests."
                                    + "week of " + this.state.zipweek5 + "," + this.state.zipdataforweek5 + " tests."
                                    + "week of " + this.state.zipweek6 + "," + this.state.zipdataforweek6 + " tests."
                                    + "week of " + this.state.zipweek7 + "," + this.state.zipdataforweek7 + " tests."
                                    + "week of " + this.state.zipweek8 + "," + this.state.zipdataforweek8 + " tests."
                                    + "week of " + this.state.zipweek9 + "," + this.state.zipdataforweek9 + " tests."
                                    + "week of " + this.state.zipweek10 + "," + this.state.zipdataforweek10 + " tests."
                                    + "week of " + this.state.zipweek11 + "," + this.state.zipdataforweek11 + " tests."
                                    + "week of " + this.state.zipweek12 + "," + this.state.zipdataforweek12 + " tests."
                                }
                            ></canvas>
                        </div>
                        <h1 style={{ fontSize: "35px" }}>Number of Cases by Age: {this.state.age}</h1>
                        <Doughnut
                            height={50}
                            options={optionsObjpie}
                            data={this.state.pieDataObject}
                        />
                        <canvas
                            id="AccessibleBar"
                            hight="1"
                            aria-label={"Pie chart."
                                + "Ages 0 to 17," + this.state.piedataget017 + " cases."
                                + "Ages 18 to 29," + this.state.piedataget1829 + " cases."
                                + "Ages 30 to 39," + this.state.piedataget3039 + " cases."
                                + "Ages 40 to 49," + this.state.piedataget4049 + " cases."
                                + "Ages 50 to 59," + this.state.piedataget5059 + " cases."
                                + "Ages 60 to 69," + this.state.piedataget6069 + " cases."
                                + "Ages 70 to 79," + this.state.piedataget7079 + " cases."
                                + "Ages 80 plus," + this.state.piedataget80 + " cases."
                            }
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


