import * as React from "react";
import { Chart } from 'chart.js';

interface TemperatureChartProps {
    labels: any[],
    numbers: any[]
}

export class TemperatureChart extends React.Component<TemperatureChartProps, any> {

    componentDidMount() {
        var canvas: any = document.getElementById('temperature-chart');
        var ctx = canvas.getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',

            // The data for our dataset
            data: {
                // labels: ["January", "February", "March", "April", "May", "June", "July"],
                labels: this.props.labels,
                datasets: [{
                    label: "Temperatures",
                    // backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    backgroundColor: 'rgba(255, 206, 86, 0)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    // data: [0, 10, 5, 2, 20, 30, 45]
                    data: this.props.numbers
                }]
            },

            // Configuration options go here
            options: {
                elements: {
                    point: {
                        radius: 0
                    }//,
                    // line: {
                    //     tension: 0
                    // }
                },
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
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }],
                    ticks: {
                        min: 0
                    }
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
                                if (index != 0 || index != 7) {
                                    ctx.fillText(data, bar._model.x, bar._model.y - 8);
                                }
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
            <div className="section">
                <h2 className="section-title">Every 4 hours</h2>
                <canvas id="temperature-chart" height="160px"></canvas>
            </div>
        );
    }
}

