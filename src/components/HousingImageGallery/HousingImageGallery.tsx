import { useState } from "react";
import flechas from "../../imgs/flechas.png";

type ImageGalleryProps = {
  images: string[];
};

export default function HousingImageGallery({ images }: ImageGalleryProps) {
  const [mainIndex, setMainIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4 h-[420px]">
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[420px]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setMainIndex(index)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                index === mainIndex ? "border-blue-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
        <div className="relative flex-1">
          <img
            src={images[mainIndex]}
            alt={`main-${mainIndex}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
            title="Ampliar imagen"
          >
            <img src={flechas} alt="Ampliar" className="w-6 h-6"/>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center px-4">
            <img
              src={images[mainIndex]}
              alt={`expanded-${mainIndex}`}
              className="max-h-[90%] max-w-full object-contain"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
              title="Cerrar"
            >
              ×
            </button>
            <button
              onClick={() =>
                setMainIndex((mainIndex + images.length - 1) % images.length)
              }
              className="absolute left-4 text-white text-4xl"
              title="Anterior"
            >
              ‹
            </button>
            <button
              onClick={() => setMainIndex((mainIndex + 1) % images.length)}
              className="absolute right-4 text-white text-4xl"
              title="Siguiente"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}

