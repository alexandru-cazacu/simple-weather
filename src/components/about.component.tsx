import * as React from 'react';

export class About extends React.Component<any, any> {
    render() {
        return (
            <div className="content-section about scroll-target">
                <div className="wrapper">
                    <div>
                        <img className="photo" src="./images/profile.png" />
                    </div>
                    <div className="text">
                        <h1>Qualcosa su di me</h1>
                        <p>Sono Alexandru Cazacu, studente di Informatica presso l'IIS Castelli di Brescia.</p><br />
                        <p>Sono appasionato di tutto quello che riguarda la tecnologia ed il mondo digitale. Oltre che alla programmazione con vecchi e nuovi linguaggi ed allo sviluppo web ed Android sono interessato anche al mondo del design (UI/UX Design) e alle scoperte in ambito informatico, come le reti neurali.</p>
                        <p>Ho sviluppato alcuni prototipi in Unity5 usando C#, oltre ad un piccolo endless clicker per Android.</p>
                        <p>Al momento sono alla ricerca disperata di un argomento per la mia Tesi.</p><br />
                        <p>Se avete dubbi non esitate a contattarmi o visitate il mio blog per aggiornamenti sulle ultime novità.</p>
                    </div>
                </div>
            </div>
        );
    }
}