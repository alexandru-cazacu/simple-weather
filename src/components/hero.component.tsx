import * as React from 'react';

import { Button } from './button.component';
import { ButtonEmpty } from './button.empty.component';

export class Hero extends React.Component<any, any> {
    render() {
        return (
            <div className="hero">
                <h1 className="title">Alex Cazacu</h1>
                <h3 className="subtitle">Coding like a pro...</h3>
                <Button name={"Portfolio"} routerDestination={"portfolio"} />
                <ButtonEmpty name={"Blog"} routerDestination={"blog"} />
                <div></div>
                <img className="scroll-to-target" src="../../images/down-arrow.png" />
            </div>
        );
    }
}