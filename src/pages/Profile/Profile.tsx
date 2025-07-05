import React, { useEffect, useState } from 'react';
import { getUserData, updateUserData } from '../../utils/auth/userdata';
import studentImg from '../../imgs/student.png';
import landlordImg from '../../imgs/landlord.png';
import defaultImg from '../../imgs/user.png';

function Profile() {
  const [user, setUser] = useState<{ name: string; email: string; type?: string } | null>(null);
  const [originalUser, setOriginalUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    getUserData()
      .then(data => {
        const userData = { name: data.name, email: data.email, type: data.type };
        setUser(userData);
        setOriginalUser({ name: data.name, email: data.email });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
        setError('No se pudo cargar el perfil');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!user) return;
    try {
      await updateUserData(user);
      setOriginalUser({ name: user.name, email: user.email });
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch {
      alert('Error al actualizar perfil');
    }
  };

  const hasChanges = user && originalUser && (
    user.name !== originalUser.name || user.email !== originalUser.email
  );

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl flex gap-10 items-center relative">
        {updateSuccess && (
          <div className="absolute top-2 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-md shadow-sm text-sm">
            Cambios guardados correctamente
          </div>
        )}
        <div className="flex flex-col items-center">
          <div className="w-44 h-44 rounded-full overflow-hidden border border-gray-300 bg-white flex items-center justify-center">
            <img
              src={
                user?.type === "estudiante"
                  ? studentImg
                  : user?.type === "propietario"
                  ? landlordImg
                  : defaultImg
              }
              alt="Foto de perfil"
              className={`w-full h-full object-contain object-center 
                ${user?.type === "propietario" ? "scale-70" : ""}
                ${user?.type === "estudiante" ? "scale-90" : ""}
              `}
            />
          </div>
          {user?.type && (
            <span className="mt-4 text-sm font-semibold bg-blue-600 text-white px-3 py-1 rounded-full capitalize">
              {user.type}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Nombre</span>
              <input
                type="text"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={user?.name || ''}
                onChange={e => setUser(prev => prev ? { ...prev, name: e.target.value } : null)}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium">Correo</span>
              <input
                type="email"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={user?.email || ''}
                onChange={e => setUser(prev => prev ? { ...prev, email: e.target.value } : null)}
              />
            </label>
            <button
              onClick={handleSubmit}
              disabled={!hasChanges}
              className={`mt-4 py-2 px-4 rounded-lg transition font-medium ${
                hasChanges
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Actualizar perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
