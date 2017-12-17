import * as React from "react";
import { Chart } from 'chart.js';

interface LineChartProps {
    labels: any[],
    numbers: any[]
}

export class LineChart extends React.Component<LineChartProps, any> {

    componentDidMount() {
        var canvas: any = document.getElementById('temperature-chart');
        var ctx = canvas.getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',

            // The data for our dataset
            data: {
                labels: this.props.labels,
                datasets: [{
                    label: "Temperatures",
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    // backgroundColor: 'rgba(255, 206, 86, 0)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    // data: [0, 10, 5, 2, 20, 30, 45]
                    data: this.props.numbers,
                    borderWidth: 1
                }],
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 40,
                        right: 20,
                        bottom: 10,
                        left: 20
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {

                        tension: .2
                    }
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
                            display: false,
                            tickMarkLength: 20
                        }
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
                                ctx.fillText(data, bar._model.x, bar._model.y - 8);
                            });
                        });
                    }
                }
            },
        });
    }

    render() {
        return (
            <div className="section">
                <h2 className="section-title">Every 4 hours</h2>
                <div className="chart-container-relative">
                    <div className="chart-container">
                        <canvas id="temperature-chart" width="600" height="100"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}

