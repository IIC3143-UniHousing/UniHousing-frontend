import ResidenceCard from "../HousingCard/HousingCard";

const HousingList = ({ properties }: { properties: any }) => {
    return (
        <div className="space-y-6">
            {properties.map((residence: any, index: any) => (
                <ResidenceCard key={index} {...residence}/>
             ))}
        </div>
    );
};
export default HousingList;