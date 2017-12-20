import * as React from 'react';

interface SpinnerProps {
    visible: boolean;
}

export class Spinner extends React.Component<SpinnerProps, any> {

    /**
     * Life Cycle method that is called after a component state or props change.
     */
    // ----------------------------------------------------------------------------------------------------
    render() {
        if (this.props.visible) {
            return <div className="spinner fa fa-circle-o-notch"></div>;
        }
        else {
            return null;
        }
    }
}