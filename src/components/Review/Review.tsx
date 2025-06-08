type ReviewProps = {
  puntaje: number;
  comentario: string;
  fecha: string;
  nombreUsuario: string;
};

const Review = ({ puntaje, comentario, fecha, nombreUsuario }: ReviewProps) => {
  const renderEstrellas = (p: number) => "★".repeat(p) + "☆".repeat(5 - p);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full">
      <p className="text-yellow-500 text-lg mb-2">{renderEstrellas(puntaje)}</p>
      <p className="text-gray-800 italic mb-3">“{comentario}”</p>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-semibold">{nombreUsuario}</span>
        <span>{fecha}</span>
      </div>
    </div>
  );
};

export default Review;

