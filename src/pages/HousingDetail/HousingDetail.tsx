import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getHousingById } from "../../utils/Housing/getHousingById";
import HousingImageGallery from "../../components/HousingImageGallery/HousingImageGallery";
import { useNavigate } from "react-router";
import bano from "../../imgs/bano.png";
import cama from "../../imgs/cama.png";
import tamano from "../../imgs/tamano.png";
import direccion from "../../imgs/direccion.png";
import calidad from "../../imgs/calidad.png";
import mapa from "../../imgs/mapa.jpg";
import correo from "../../imgs/correo.png";
import Review from "../../components/Review/Review";
import type { HousingData } from '../../types';

function HousingDetail(){
    const { id } = useParams();
    const [data, setData] = useState<HousingData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHousingData = async () => {
            if (!id) {
            setError("ID de propiedad no especificado.");
            setLoading(false);
            return;
            }
            
            setLoading(true);
            setError(null);

            try {
            const housingData = await getHousingById(id);
            setData(housingData);
            } catch (e) {
            console.error(e);
            setError("Error al cargar la propiedad. Es posible que no exista.");
            } finally {
            setLoading(false);
            }
        };

        fetchHousingData();
    }, [id]);

    if (loading) return <p className="text-center">Cargando propiedad...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!data) return null;

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="container mx-auto px-1 py-6 space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 max-w-full">
                    <div className="flex-1 min-w-0 mr-0 sm:mr-6 mb-2 sm:mb-0">
                        <div className="text-left text-2xl sm:text-3xl md:text-5xl font-bold break-words mb-4">
                            {data.title}
                        </div>
                    </div>
                    <div className="flex items-center text-sm sm:text-lg text-gray-500 mt-1">
                        <img src={calidad} alt="calidad" className="w-12 h-12 mr-1" />
                        <span className="text-black text-3xl font-bold">5/5</span>
                    </div>
                </div>
                {/* Sección galería + info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="col-span-3">
                        <HousingImageGallery images={data.images}/>
                    </div>
                    <div className="col-span-1 space-y-3">
                        <div className="p-4 rounded-lg shadow bg-blue-100 space-y-7 w-full max-w-full">
                            <h2 className="text-2xl font-semibold text-center">Características</h2>
                            <div className="flex items-center gap-2">
                                <img src={direccion} alt="direccion" className="w-10 h-10" />
                                <span className="text-gray-800 w-full font-semibold text-xl break-words overflow-hidden">{data.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={cama} alt="dormitorios" className="w-10 h-10" />
                                <span className="text-gray-800 font-semibold text-xl">{data.rooms} dormitorios</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={bano} alt="baños" className="w-10 h-10" />
                                <span className="text-gray-800 font-semibold text-xl">{data.bathrooms} baños</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={tamano} alt="tamaño" className="w-10 h-10" />
                                <span className="text-gray-800 font-semibold text-xl">{data.size} m<sup>2</sup></span>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg shadow bg-green-200">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center">
                                    <span className="text-gray-800 text-4xl font-bold leading-none mr-1">
                                        {new Intl.NumberFormat("es-CL", {
                                                style: "currency",
                                                currency: "CLP",
                                                minimumFractionDigits: 0,
                                            }).format(data.price)}</span>
                                    <span className="text-gray-800">mensuales</span>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sección + info */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-3 space-y-6">
                        {/* Sección descripción */}
                        <div className="p-4 rounded-lg shadow bg-blue-100">
                            <p className="text-2xl text-black font-medium mb-2">Descripción</p>
                            <p className="text-gray-700">{data.description}</p>
                        </div>
                        {/* Sección mapa */}
                        <div className="p-4 rounded-lg">
                            <p className="text-2xl text-black font-medium mb-2">Mapa</p>
                            <div className="w-full h-0.5 bg-blue-500 mt-1 mb-3"></div>
                            <img src={mapa} className="w-full h-full object-cover"></img>
                        </div>
                        {/* Sección reseñas */}
                        <div className="p-4 rounded-lg w-full">
                            <p className="text-2xl text-black font-medium mb-2">Reseñas</p>
                            <div className="w-full h-0.5 bg-blue-500 mt-1 mb-3"></div>
                            <div className="w-full">
                                <Review puntaje={5}
                                        comentario="¡Excelente lugar! Muy cómodo y limpio. Juan fue muy amable y siempre estuvo atento a cualquier cosa que necesitáramos."
                                        fecha="2025-06-07"
                                        nombreUsuario="Camila Olivares" />
                            </div>
                        </div>
                    </div>
                    {/* Tarjeta contacto */}
                    <div className="col-span-1 flex justify-center items-start">
                        <div className="sticky top-6 w-full">
                            <div className="p-4 rounded-lg shadow bg-blue-300 animate-bounce">
                                <p className="text-xl text-center font-semibold text-black mb-1">Contacta a:</p>
                                <p className="text-xl text-center font-bold text-black mb-2">{data.owner.name}</p>
                                    <div className="flex justify-center items-start gap-2">
                                        <div className=" w-8 h-8 bg-white rounded-full p-2 shadow-md">
                                            <img src={correo} alt="Ampliar" className="w-4 h-4"/>
                                        </div>
                                        <span className="text-white font-semibold text-xl">{data.owner.email}</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    )
}
export default HousingDetail;