import React from "react";
import ResidenceCard from "../HousingCard/HousingCard";

const HousingList = ({ properties }) => {
    return (
        <div className="space-y-6">
            {properties.map((residence, index) => (
                <ResidenceCard key={index} {...residence}/>
             ))}
        </div>
    );
};
export default HousingList;