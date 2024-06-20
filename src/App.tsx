import './App.css';
import ParticipantsList from "./components/Participants.tsx";
import DisciplinList from './components/Disciplines';
import ResultsList from "./components/Results.tsx";
import CreateDeltager from "./components/CreatePaticipant.tsx";
import DeltagerDisciplinList from "./components/DeltagerDisciplin.tsx";
import { useState } from 'react';

function App() {
    const [activeComponent, setActiveComponent] = useState(<ParticipantsList />);

    return (
        <div className="App">
            <nav>
                <button onClick={() => setActiveComponent(<ParticipantsList />)}>Deltagere</button>
                <button onClick={() => setActiveComponent(<DeltagerDisciplinList />)}>Deltagere og Discipliner</button>
                <button onClick={() => setActiveComponent(<DisciplinList />)}>Discipliner</button>
                <button onClick={() => setActiveComponent(<ResultsList />)}>Resultater</button>
                <button onClick={() => setActiveComponent(<CreateDeltager />)}>Opret deltager</button>
            </nav>
            <div className="content">
                {activeComponent}
            </div>
        </div>
    );
}

export default App;
