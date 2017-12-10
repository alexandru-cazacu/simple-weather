import * as React from 'react';

export class Skills extends React.Component<any, any> {
    render() {
        return (
            <div className="skills content-section">
                <div className="wrapper">
                    <h1 className="center">Le mie Skill</h1>
                    <div className="pure-g">
                        <div className="pure-u-1 pure-u-md-1 pure-u-lg-1-2">
                            <div className="left">
                                <h3>C</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-30 primary">
                                    </div>
                                </div>
                                <h3>Java</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-50 primary">
                                    </div>
                                </div>
                                <h3>Unity/C#</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-60 primary">
                                    </div>
                                </div>
                                <h3>HTML</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-80 primary">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pure-u-1 pure-u-md-1 pure-u-lg-1-2">
                            <div className="right">
                                <h3>CSS</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-60 primary">
                                    </div>
                                </div>
                                <h3>JavaScript</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-20 primary">
                                    </div>
                                </div>
                                <h3>PHP</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-10 primary">
                                    </div>
                                </div>
                                <h3>React</h3>
                                <div className="bar primary-dark">
                                    <div className="bar bar-50 primary">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}