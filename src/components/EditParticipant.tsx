import React, { useState } from 'react';

interface Deltager {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
}

interface EditParticipantProps {
    deltager: Deltager;
}

const EditParticipant = ({ deltager }: EditParticipantProps) => {
    const [name, setName] = useState(deltager.name);
    const [gender, setGender] = useState(deltager.gender);
    const [age, setAge] = useState(deltager.age);
    const [club, setClub] = useState(deltager.club);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedDeltager = { ...deltager, name, gender, age, club };
        const response = await fetch(`http://localhost:8080/deltagere/${deltager.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDeltager),
        });
        if (response.ok) {
            alert('Deltager opdateret!');
        } else {
            alert('Der opstod en fejl ved opdateringen.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Navn:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Køn:</label>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
            <div>
                <label>Alder:</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <div>
                <label>Klub:</label>
                <input type="text" value={club} onChange={(e) => setClub(e.target.value)} />
            </div>
            <button type="submit">Opdater Deltager</button>
        </form>
    );
};

export default EditParticipant;
