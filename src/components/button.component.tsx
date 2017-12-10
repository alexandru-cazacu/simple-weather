import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface ButtonProps {
    name: string,
    routerDestination: string
}

export class Button extends React.Component<ButtonProps, any> {
    render() {
        return (
            <NavLink className="button" to={`/${this.props.routerDestination}`}>
                {this.props.name}
            </NavLink>
        );
    }
}