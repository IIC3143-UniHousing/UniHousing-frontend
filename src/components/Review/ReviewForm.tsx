import { useState } from "react";
import { getAccessToken } from "../../utils/auth/auth";

type Props = {
  userId: number;
  housingId: number;
  onSuccess: (review: any) => void;
};

const StarIcon = ({ fill }: { fill: string }) => (
  <svg
    className={`w-6 h-6 ${fill}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 20"
    fill="currentColor"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.455 8.55l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.545 8.55a1.535 1.535 0 0 0 .379-.925Z" />
  </svg>
);


const ReviewForm = ({ userId, housingId, onSuccess }: Props) => {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [hoverScore, setHoverScore] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, housingId, score, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al enviar la reseña");
        return;
      }

      onSuccess(data.review);
      setScore(5);
      setComment("");

      window.location.reload();

    } catch (err) {
      console.error(err);
      setError("Error de conexión al enviar la reseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-md shadow">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Puntaje:</label>
        <div 
          className="flex items-center"
          onMouseLeave={() => setHoverScore(0)} 
        >
          {[1, 2, 3, 4, 5].map((starValue) => (
            <div
              key={starValue}
              className="cursor-pointer"
              onMouseEnter={() => setHoverScore(starValue)} 
              onClick={() => setScore(starValue)} 
            >
              <StarIcon
                fill={
                  starValue <= (hoverScore || score)
                    ? "text-yellow-400" 
                    : "text-gray-300"  
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Comentario:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Escribe tu opinión sobre el lugar..."
        />
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar Reseña"}
      </button>
    </form>
  );
};

export default ReviewForm;