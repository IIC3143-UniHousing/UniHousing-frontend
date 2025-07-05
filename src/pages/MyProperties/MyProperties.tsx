import React, { useState, useEffect, useMemo } from 'react';
import { useUser } from '../../context/UserContext';
import { getAllHousings } from '../../utils/Housing/getAllHousings';
import { updateAvailableHousing } from '../../utils/Housing/updateAvailableHousing';
import type { HousingData } from '../../types';
import { useNavigate, Link } from 'react-router';

const MyPropertiesPage = () => {
  const [allHousings, setAllHousings] = useState<HousingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.type !== 'propietario') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchHousings = async () => {
      try {
        setIsLoading(true);
        const data = await getAllHousings(false);
        setAllHousings(data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar las propiedades.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHousings();
  }, []);

  const myHousings = useMemo(() => {
    if (!user) return [];
    return allHousings.filter(housing => housing.ownerId === user.id);
  }, [allHousings, user]);

  const handleToggleAvailability = async (housingToToggle: HousingData) => {
    if (!user) return;

    setAllHousings(currentHousings =>
      currentHousings.map(h =>
        h.id === housingToToggle.id ? { ...h, available: !h.available } : h
      )
    );

    try {
      await updateAvailableHousing(housingToToggle, !housingToToggle.available);
    } catch (error) {
      alert('Error: No se pudo actualizar la propiedad. Reintentando...');
      setAllHousings(currentHousings =>
        currentHousings.map(h =>
          h.id === housingToToggle.id ? { ...h, available: housingToToggle.available } : h
        )
      );
    }
  };

  if (isLoading) {
    return <div className="text-center p-10 font-semibold text-xl">Cargando tus propiedades...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600 font-semibold text-xl">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mis Propiedades</h1>
      <div className="max-w-4xl mx-auto">
        {myHousings.length > 0 ? (
          <div className="space-y-6">
            {myHousings.map(housing => (
              <div key={housing.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-6">
                <img
                  src={housing.images[0] || 'https://via.placeholder.com/150'}
                  alt={housing.title}
                  className="w-40 h-32 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-700">{housing.title}</h2>
                  <p className="text-gray-500 mt-1">{housing.address}</p>
                </div>

                <div>

                  <div className="flex flex-col items-center justify-center w-40 flex-shrink-0 space-y-2">
                    <label htmlFor={`toggle-${housing.id}`} className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          id={`toggle-${housing.id}`}
                          type="checkbox"
                          className="sr-only peer"
                          checked={housing.available}
                          readOnly
                          onClick={() => handleToggleAvailability(housing)}
                        />
                        <div className="block w-14 h-8 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition"></div>
                        <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
                      </div>
                    </label>
                    <span className={`font-medium text-sm ${housing.available ? 'text-blue-600' : 'text-gray-500'}`}>
                      {housing.available ? 'Disponible' : 'No Disponible'}
                    </span>
                  </div>

                  <Link to={`/housing/${housing.id}/edit`} className="block w-full text-center mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-md font-medium">
                    Editar
                  </Link>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Aún no has creado ninguna propiedad.</p>
        )}
      </div>
    </div>
  );
};

export default MyPropertiesPage;