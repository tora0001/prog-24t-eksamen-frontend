interface Deltager {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
}

interface DeleteParticipantProps {
    deltager: Deltager;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteParticipant = ({ deltager, onClose, onDelete }: DeleteParticipantProps) => {
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8080/deltagere/${deltager.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            onDelete();
        } else {
            alert('Der opstod en fejl ved sletningen.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Bekræft sletning</h2>
                <p>Er du sikker på, at du vil slette {deltager.name}?</p>
                <button onClick={handleDelete}>Ja, slet</button>
                <button onClick={onClose}>Nej, annuller</button>
            </div>
        </div>
    );
};

export default DeleteParticipant;
