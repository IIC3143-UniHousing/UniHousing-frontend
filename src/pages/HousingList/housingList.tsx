import React, { useState, useEffect } from 'react';
import HousingList from '../../components/HousingList/HousingList';
import { getAllHousings } from '../../utils/Housing/getAllHousings';
import type { HousingData, Filter } from '../../types';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import { filterHousing } from '../../utils/Housing/getFilteredHousings';
const itemsPerPage = 5;

const HousingListPage = () => {
  const [housings, setHousings] = useState<HousingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filter>({});

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
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredHousings = filterHousing(housings, filters);

  const totalPages = Math.ceil(filteredHousings.length / itemsPerPage);
  const currentHousings = filteredHousings.slice(
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
    <div className="grid grid-cols-1 md:grid-cols-4 bg-blue-50 md:min-h-screen p-6 gap-6">
      <div className="col-span-1 md:sticky md:top-6 h-fit bg-white shadow-lg p-4 rounded-xl">
        <SearchFilter filters={filters} setFilters={setFilters}/>
      </div>
      <div className="col-span-3 flex flex-col">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 mt-4 text-left">
          Propiedades disponibles
        </h1>

        <HousingList properties={currentHousings} />

        {filteredHousings.length > 0 && totalPages > 1 && (
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
        {filteredHousings.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 p-6 bg-white rounded-lg shadow-md">
            <svg
              className="w-16 h-16 mb-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-6h6v6M3 12l3 3 6-6"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">
              No encontramos residencias que coincidan con tu búsqueda.
            </h2>
            <p className="mt-2 text-gray-500 text-center">
              Intenta ajustar los filtros para ver más resultados.
            </p>
            <button
              onClick={() => setFilters({})}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
            >
                Limpiar Filtros
            </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default HousingListPage;