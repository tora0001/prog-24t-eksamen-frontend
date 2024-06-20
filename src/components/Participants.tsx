import { useEffect, useState } from 'react';
import EditParticipant from './EditParticipant';
import DeleteParticipant from './DeleteParticipant';

interface Deltager {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
}

const ParticipantsList = () => {
    const [participants, setParticipants] = useState<Deltager[]>([]);
    const [selectedDeltager, setSelectedDeltager] = useState<Deltager | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchParticipants = async () => {
            const response = await fetch('http://localhost:8080/deltagere');
            const data: Deltager[] = await response.json();
            setParticipants(data);
        };

        fetchParticipants();
    }, []);

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
            closeDeleteModal();
        }
    };

    return (
        <div>
            <h1>Deltagere</h1>
            <ul>
                {participants.map(deltager => (
                    <li key={deltager.id}>
                        {deltager.name}, {deltager.gender}, {deltager.age}, {deltager.club}
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
