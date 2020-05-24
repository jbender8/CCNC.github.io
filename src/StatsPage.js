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



class StatsWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: props.classes,
            zip: this.props.zip,
            age: this.props.age
        };
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

    getAgeData(){
        var ageUrl = "https://data.cityofchicago.org/resource/naz8-j4nc.json";

        fetch(ageUrl)
            .then((response) =>{
                return response.json();
            })
            .then((data)=>{
                this.constrcutAgeData(data);
            })
    }

    constrcutAgeData(dataArray){
        var rawTargetData = dataArray[0];

        var targetLabels = ["cases_age_0_17", "cases_age_18_29", "cases_age_30_39", "cases_age_40_49", 
                            "cases_age_50_59", "cases_age_60_69", "cases_age_70_79", "cases_age_80_"];

        var targetData = targetLabels.map((sliceString) =>{
            return rawTargetData[sliceString];
        });

        var backgroundColors = targetLabels.map((sliceString) =>{
            var ageBounds = sliceString.replace("cases_age_", "").split('_');
            if(ageBounds[1] == "") ageBounds[1] = "110";
            if((parseInt(ageBounds[0]) <= this.state.age) && ( this.state.age <= parseInt(ageBounds[1]))){
                return 'rgba(75, 192, 192, 0.6)'
            }
            else{
                return '#CCC';
            }
        });

        var sanitizedLabels = targetLabels.map((sliceString) =>{
            var prefixRemoved = sliceString.replace("cases_age_", "");
            return prefixRemoved.replace("_", "-");
        })

        var pieDataObject = {
            labels: sanitizedLabels,
            datasets: [
                {
                    data: targetData,
                    backgroundColor: backgroundColors,
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
            zipDataObject: zipDataObject
        });
    }

    componentDidMount() {
        this.getZipData();
        this.getAgeData();
    }


    render() {
        var optionsObj = {
            responsive: true,
            maintainAspectRatio: true
        };

        return (
            <main className={this.state.classes.content}>
                <div className="App">
                    <header className="App-header">
                        <p>Test by zip code: {this.state.zip}</p>
                        <Bar height={40} options={optionsObj} data={this.state.zipDataObject} />
                        <p>Cases by Age: {this.state.age}</p>
                        <Doughnut
                            height={50}
                            options={optionsObj}
                            data={this.state.pieDataObject}
                        />
                        <br></br>
                        <Button className="updateButton" style={{ color: "white" }} onClick={this.handleSubmit}>
                            GET LATEST NEWS
                        </Button>
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
