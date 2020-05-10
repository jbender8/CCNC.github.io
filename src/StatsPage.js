import React from "react";
import {
    Route,
    useLocation,
    Redirect,
    NavLink
} from "react-router-dom";
import {Bar} from "react-chartjs-2";


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
        var dataObject = {
          labels:  [ "yellow","orange","green","blue","purple","pink"],
          datasets: [
                {
                label: 'Total',
                data: [
                    1324755, 347485, 565738, 457839, 583958, 684938
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',

                }
            ]
        };

        var optionsObj = {
            height: "300",
            responsive: true,
            maintainAspectRatio: true
        };

        return (
            <main className={this.state.classes.content}>
                <div className="App">
                    <header className="App-header">
                        <p>Stats {this.state.zip}</p>
                        <button onClick={this.getZipData} >Populate Graph</button>
                        <Bar options={optionsObj} data={dataObject} />
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
