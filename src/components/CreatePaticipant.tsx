import React, { useState } from 'react';

interface Deltager {
    name: string;
    gender: string;
    age: number;
    club: string;
}

const CreateDeltager = () => {
    const [deltager, setDeltager] = useState<Deltager>({ name: '', gender: '', age: 0, club: '' });
    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDeltager({ ...deltager, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/deltagere', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deltager),
            });

            if (response.ok) {
                setMessage('Deltager oprettet succesfuldt!');
                setDeltager({ name: '', gender: '', age: 0, club: '' });
            } else {
                setMessage('Der opstod en fejl ved oprettelsen af deltageren.');
            }
        } catch (error) {
            setMessage('Der opstod en fejl ved oprettelsen af deltageren.');
        }
    };

    return (
        <div>
            <h1>Opret Ny Deltager</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Navn:</label>
                    <input type="text" id="name" name="name" value={deltager.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="gender">Køn:</label>
                    <select id="gender" name="gender" value={deltager.gender} onChange={handleChange} required>
                        <option value="">Vælg køn</option>
                        <option value="Male">Mand</option>
                        <option value="Female">Kvinde</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="age">Alder:</label>
                    <input type="number" id="age" name="age" value={deltager.age} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="club">Klub:</label>
                    <input type="text" id="club" name="club" value={deltager.club} onChange={handleChange} required />
                </div>
                <button type="submit">Opret Deltager</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateDeltager;
