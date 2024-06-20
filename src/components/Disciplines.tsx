import { useEffect, useState } from 'react';

interface Disciplin {
    id: number;
    name: string;
    resulttype: 'TIME' | 'DISTANCE';
}

const DisciplinList = () => {
    const [discipliner, setDiscipliner] = useState<Disciplin[]>([]);

    useEffect(() => {
        const fetchDisciplines = async () => {
            const response = await fetch('http://localhost:8080/discipliner');
            const data: Disciplin[] = await response.json();
            setDiscipliner(data);
        };

        fetchDisciplines();
    }, []);

    return (
        <div>
            <h1>Discipliner</h1>
            <ul>
                {discipliner.map(disciplin => (
                    <li key={disciplin.id}>
                        {disciplin.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisciplinList;
