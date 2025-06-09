import React from 'react';
import { useNavigate } from 'react-router';

const HousingCard = ({ id, title, owner, price, comuna, rooms, images }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/housing/${id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:shadow-lg transition-shadow"
        >
            <div className="sm:w-1/4 w-full h-32 sm:h-auto">
                <img
                    src={images[0]}
                    alt={`Imagen de ${title}`}
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
                    <p className="text-gray-600 text-sm mt-1">Propietario: {owner.name}</p>
                    <p className="text-blue-600 font-bold text-lg mt-2">
                        ${price.toLocaleString()}
                    </p>
                </div>
                <div className="text-sm text-gray-500 mt-4">
                    <p>Comuna: {comuna}</p>
                    <p>Habitaciones: {rooms}</p>
                </div>
            </div>
        </div>
    );
};

export default HousingCard;