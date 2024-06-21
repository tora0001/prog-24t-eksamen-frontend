import { useEffect, useState } from 'react';
import CreateResult from "./CreateResult.tsx";

interface Resultat {
    id: number;
    date: string;
    resultvalue: number;
    deltager: string;
    disciplin: string;
}

interface Deltager {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
    disciplin: string;
}

const ResultsList = () => {
    const [results, setResults] = useState<Resultat[]>([]);
    const [participants, setParticipants] = useState<Deltager[]>([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            const response = await fetch('http://localhost:8080/deltagere');
            const data: Deltager[] = await response.json();
            setParticipants(data);
        };

        const fetchResults = async () => {
            const response = await fetch('http://localhost:8080/resultater');
            const data: Resultat[] = await response.json();
            setResults(data);
        };

        fetchResults();
        fetchParticipants();
    }, []);

    return (
        <div>
            <h1>Resultater</h1>
            <ul>
                {results.map(resultat => (
                    <li key={resultat.id}>
                        {resultat.date}, {resultat.resultvalue}, {resultat.deltager}, {resultat.disciplin}
                    </li>
                ))}
            </ul>
            <CreateResult participants={participants} />
        </div>
    );
};

export default ResultsList;
