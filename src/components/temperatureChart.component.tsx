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
                    data: [0, 10, 5, 2, 20, 30, 45]
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
                hover: {
                    animationDuration: 0
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false,
                    }]
                },
                animation: {
                    duration: 1,
                    onComplete: function () {

                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = '#333';

                        this.data.datasets.forEach(function (dataset: any, i: number) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar: any, index: any) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });

                        // var ctx = chart.ctx;
                        // ctx.textAlign = "center";
                        // ctx.textBaseline = "bottom";
                        // ctx.font = "8px";
                        // ctx.fillStyle = "#000000";

                        // console.log(chart.data);

                        // for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                        //     console.log(chart.data.datasets[0].data[i]);
                        //     ctx.fillText(chart.data.datasets[0].data[i].toString(), 30 * i, 50);
                        // }
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

