import * as React from 'react';

export class Timeline extends React.Component<any, any> {
    render() {
        return (
            <div className="skills content-section">
                <div className="wrapper">
                    <h1 className="center">La mia storia</h1>
                    <div className="timeline">
                        <div className="event">
                            <div className="first line"></div>
                            <div className="point">
                                <div className="info">
                                    <p className="title">Stage Fluidmec spa</p>
                                    <p className="date">2017</p>
                                </div>
                            </div>
                        </div>
                        <div className="event">
                            <div className="line"></div>
                            <div className="point">
                                <div className="info">
                                    <p className="title">Stage Xeos srl</p>
                                    <p className="date">2016</p>
                                </div>
                            </div>
                        </div>
                        <div className="event">
                            <div className="line"></div>
                            <div className="point">
                                <div className="info">
                                    <p className="title">Stage Fluidmec spa</p>
                                    <p className="date">2016</p>
                                </div>
                            </div>
                        </div>
                        <div className="event">
                            <div className="line"></div>
                            <div className="point">
                                <div className="info">
                                    <p className="title">IIS Castelli</p>
                                    <p className="date">2013</p>
                                </div>
                            </div>
                        </div>
                        <div className="event">
                            <div className="line"></div>
                            <div className="point">
                                <div className="info">
                                    <p className="title">A. Venturelli</p>
                                    <p className="date">2010</p>
                                </div>
                            </div>
                        </div>
                        <div className="event">
                            <div className="last line"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}