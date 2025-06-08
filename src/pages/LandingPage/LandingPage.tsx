import React from 'react';
import landingBackground from '../../imgs/landing_background.png'; 
import landingPicture from '../../imgs/landing-picture.png';

const LandingPage = () => {
    return (
        <div 
        className="h-[calc(100vh-56px)] bg-cover bg-center" 
        style={{ backgroundImage: `url(${landingBackground})` }}
        >

        <div className="h-full w-full flex items-center justify-center">
            <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-y-8 md:gap-x-16">
            
            <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-6xl font-extrabold text-[#3B82F6] mb-4">
                UniHousing
                </h1>
                <p className="text-xl text-gray-700 font-medium">
                Encuentra la residencia estudiantil perfecta en Santiago de Chile. Explora, compara y contacta directamente con los propietarios. Tu nuevo hogar universitario está a solo un clic de distancia.
                </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
                <img 
                src={landingPicture} 
                alt="Student housing illustration" 
                className="w-full max-w-md rounded-lg shadow-xl"
                />
            </div>

            </div>
        </div>
        </div>
    );
};

export default LandingPage;