import { useEffect, useState } from 'react';

interface Deltager {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
}

interface Disciplin {
    id: number;
    name: string;
    resulttype: 'TIME' | 'DISTANCE';
}

interface DeltagerDisciplin {
    id: number;
    deltager: Deltager;
    disciplin: Disciplin;
}

const DeltagerDisciplinList = () => {
    const [deltagerDiscipliner, setDeltagerDiscipliner] = useState<DeltagerDisciplin[]>([]);

    useEffect(() => {
        const fetchDeltagerDiscipliner = async () => {
            const response = await fetch('http://localhost:8080/deltagerdisciplin');
            const data: DeltagerDisciplin[] = await response.json();
            setDeltagerDiscipliner(data);
        };

        fetchDeltagerDiscipliner();
    }, []);

    return (
        <div>
            <h1>Deltagere og Discipliner</h1>
            <ul>
                {deltagerDiscipliner.map(dd => (
                    <li key={dd.id}>
                        <strong>Deltager:</strong> {dd.deltager.name}, {dd.deltager.gender}, {dd.deltager.age}, {dd.deltager.club}
                        <br />
                        <strong>Disciplin:</strong> {dd.disciplin.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeltagerDisciplinList;
