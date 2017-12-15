import * as React from "react";
import { Chart } from 'chart.js';

export class TemperatureChart extends React.Component<any, any> {

    componentDidMount() {
        var canvas: any = document.getElementById('temperature-chart');
        var ctx = canvas.getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                animation: {
                    onComplete: (data) => {

                        var ctx = data.chart.ctx;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "bottom";

                        console.log(data);

                        // data.datasets.forEach(function (dataset: any) {
                        //     dataset.points.forEach(function (points: any) {
                        //         ctx.fillText(points.value, points.x, points.y - 10);
                        //     });
                        // })
                    }
                }
            },
        });
    }

    render() {
        return (
            <canvas id="temperature-chart"></canvas>
        );
    }
}

