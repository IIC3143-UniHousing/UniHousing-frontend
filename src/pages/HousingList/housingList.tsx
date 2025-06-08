import React, { useState } from 'react';
import HousingList from '../../components/HousingList/HousingList';

const sampleHousing = [
  {
    title: 'Departamento moderno',
    owner: 'Juan Pérez',
    price: 98000,
    comuna: 'Providencia',
    rooms: 1,
    imageUrl: 'https://via.placeholder.com/400x300',
  }
];
const itemsPerPage = 5;
const  HousingListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleHousing.length / itemsPerPage);
  const currentHousings= sampleHousing.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Propiedades disponibles
      </h1>

      <HousingList properties={currentHousings} />

      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-blue-800 font-semibold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
export default HousingListPage;