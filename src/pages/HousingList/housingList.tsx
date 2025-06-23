import React, { useState, useEffect } from 'react';
import HousingList from '../../components/HousingList/HousingList';
import { getAllHousings } from '../../utils/Housing/getAllHousings';
import type { HousingData } from '../../types';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
const itemsPerPage = 5;

const HousingListPage = () => {
  const [housings, setHousings] = useState<HousingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchHousings = async () => {
      try {
        setIsLoading(true); 
        const data = await getAllHousings();
        setHousings(data);
        setError(null); 
      } catch (err) {
        setError('No se pudieron cargar las propiedades. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchHousings();
  }, []); 

  const totalPages = Math.ceil(housings.length / itemsPerPage);
  const currentHousings = housings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h2 className="text-2xl text-blue-800">Cargando propiedades...</h2>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h2 className="text-2xl text-red-600">{error}</h2>
        </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <SearchFilter/>
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Propiedades disponibles
      </h1>

      <HousingList properties={currentHousings} />

      {housings.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-blue-800 font-semibold">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default HousingListPage;