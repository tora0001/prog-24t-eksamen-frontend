import { useEffect, useState } from 'react';
import EditParticipant from './EditParticipant';
import DeleteParticipant from './DeleteParticipant';

interface Deltager {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
    disciplin: string;
}

const ParticipantsList = () => {
    const [participants, setParticipants] = useState<Deltager[]>([]);
    const [filteredParticipants, setFilteredParticipants] = useState<Deltager[]>([]);
    const [selectedDeltager, setSelectedDeltager] = useState<Deltager | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedClub, setSelectedClub] = useState('');

    useEffect(() => {
        const fetchParticipants = async () => {
            const response = await fetch('http://localhost:8080/deltagere');
            const data: Deltager[] = await response.json();
            setParticipants(data);
            setFilteredParticipants(data);
        };

        fetchParticipants();
    }, []);

    useEffect(() => {
        setFilteredParticipants(
            participants.filter(deltager =>
                deltager.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedGender === '' || deltager.gender === selectedGender) &&
                (selectedClub === '' || deltager.club === selectedClub)
            )
        );
    }, [searchTerm, selectedGender, selectedClub, participants]);

    const handleEditClick = (deltager: Deltager) => {
        setSelectedDeltager(deltager);
        setShowEditModal(true);
    };

    const handleDeleteClick = (deltager: Deltager) => {
        setSelectedDeltager(deltager);
        setShowDeleteModal(true);
    };

    const closeEditModal = () => {
        setSelectedDeltager(null);
        setShowEditModal(false);
    };

    const closeDeleteModal = () => {
        setSelectedDeltager(null);
        setShowDeleteModal(false);
    };

    const handleDelete = () => {
        if (selectedDeltager) {
            setParticipants(participants.filter(p => p.id !== selectedDeltager.id));
            setFilteredParticipants(filteredParticipants.filter(p => p.id !== selectedDeltager.id));
            closeDeleteModal();
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGender(event.target.value);
    };

    const handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClub(event.target.value);
    };

    return (
        <div>
            <h1>Deltagere</h1>
            <input
                type="text"
                placeholder="Søg efter navn"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={selectedGender} onChange={handleGenderChange}>
                <option value="">Alle køn</option>
                <option value="Male">Mand</option>
                <option value="Female">Kvinde</option>
            </select>
            <select value={selectedClub} onChange={handleClubChange}>
                <option value="">Alle klubber</option>
                {/* Generer klubboptions dynamisk baseret på de eksisterende klubber i dataene */}
                {Array.from(new Set(participants.map(p => p.club))).map(club => (
                    <option key={club} value={club}>{club}</option>
                ))}
            </select>
            <ul>
                {filteredParticipants.map(deltager => (
                    <li key={deltager.id}>
                        {deltager.name}, {deltager.gender}, {deltager.age}, {deltager.club}, {deltager.disciplin}
                        <button onClick={() => handleEditClick(deltager)}>Rediger</button>
                        <button onClick={() => handleDeleteClick(deltager)}>Slet</button>
                    </li>
                ))}
            </ul>

            {showEditModal && selectedDeltager && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <EditParticipant deltager={selectedDeltager} />
                    </div>
                </div>
            )}

            {showDeleteModal && selectedDeltager && (
                <DeleteParticipant
                    deltager={selectedDeltager}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default ParticipantsList;
