import { useEffect, useState } from 'react';

interface Resultat {
    id: number;
    date: string;
    resultvalue: number;
    deltager: {
        name: string;
    };
    disciplin: {
        name: string;
    };
}

const ResultsList = () => {
    const [results, setResults] = useState<Resultat[]>([]);

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch('http://localhost:8080/resultater');
            const data: Resultat[] = await response.json();
            setResults(data);
        };

        fetchResults();
    }, []);

    return (
        <div>
            <h1>Resultater</h1>
            <ul>
                {results.map(resultat => (
                    <li key={resultat.id}>
                        {resultat.date}, {resultat.resultvalue}, {resultat.deltager.name}, {resultat.disciplin.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsList;
