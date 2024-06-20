import { useState } from 'react';

interface Resultat {
    disciplin: string;
    date: string;
    resultvalue: number;
    deltager: string;
}

interface Deltager {
    id: number;
    name: string;
}

interface CreateResultProps {
    participants: Deltager[];
}

const CreateResult = ({ participants }: CreateResultProps) => {
    const [resultat, setResultat] = useState<Resultat>({ disciplin: '', date: '', resultvalue: 0, deltager: '' });
    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setResultat({ ...resultat, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/resultater', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resultat),
            });

            if (response.ok) {
                setMessage('Resultat oprettet succesfuldt!');
                setResultat({ disciplin: '', date: '', resultvalue: 0, deltager: '' });
            } else {
                setMessage('Der opstod en fejl ved oprettelsen af resultatet.');
            }
        } catch (error) {
            setMessage('Der opstod en fejl ved oprettelsen af resultatet.');
        }
    };

    return (
        <div>
            <h2>Opret Ny Resultat</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="deltager">Deltager:</label>
                    <select id="deltager" name="deltager" value={resultat.deltager} onChange={handleChange} required>
                        <option value="">Vælg deltager</option>
                        {participants.map(participant => (
                            <option key={participant.id} value={participant.name}>
                                {participant.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Disciplin:</label>
                    <select id="disciplin" name="disciplin" value={resultat.disciplin} onChange={handleChange} required>
                        <option value="">Vælg disciplin</option>
                        <option value="100 meter løb">100 meter løb</option>
                        <option value="Spydkast">Spydkast</option>
                        <option value="Højdespring">Højdespring</option>
                        <option value="Maratonløb">Maratonløb</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Dato:</label>
                    <input type="date" id="date" name="date" value={resultat.date} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="resultvalue">Resultatværdi:</label>
                    <input type="number" id="resultvalue" name="resultvalue" value={resultat.resultvalue} onChange={handleChange} required />
                </div>
                <button type="submit">Opret Resultat</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateResult;
