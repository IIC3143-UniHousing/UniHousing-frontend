import React from 'react';
const HousingCard = ({ title, owner, price, comuna, rooms, imageUrl }) => {
    return (
      <div className='bg-white shadow-md rounded-2xl overflow-hidden flex flex-col sm:flex-row'>
        <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
            <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
            <p className="text-gray-600 text-sm mt-1">Propietario: {owner}</p>
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