import './App.css';
import DisciplinList from './components/Disciplines';
import ResultsList from "./components/Results.tsx";
import CreateDeltager from "./components/CreatePaticipant.tsx";
import DeltagerDisciplinList from "./components/DeltagerDisciplin.tsx";
import ParticipantsList from "./components/Participants.tsx";

function App() {
    return (
        <div className="App">
            <DisciplinList/>
            <ParticipantsList/>
            <DeltagerDisciplinList/>
            <ResultsList/>
            <CreateDeltager/>
        </div>
);
}

export default App;
