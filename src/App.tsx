import './App.css';
import ParticipantsList from "./components/Participants.tsx";
import ResultsList from "./components/Results.tsx";
import { useState } from 'react';

function App() {
    const [activeComponent, setActiveComponent] = useState(<ParticipantsList />);

    return (
        <div className="App">
            <nav>
                <button onClick={() => setActiveComponent(<ParticipantsList/>)}>Deltagere</button>
                <button onClick={() => setActiveComponent(<ResultsList/>)}>Resultater</button>
            </nav>
            <div className="content">
                {activeComponent}
            </div>
        </div>
    );
}
export default App;