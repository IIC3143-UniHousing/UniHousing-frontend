import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface Props {
    lat: number;
    lon: number;
    address: string;
}

const OpenStreetMap = ({ lat, lon, address }: Props) => {
    return (
        <MapContainer center={[lat, lon]} zoom={17} style={{ height: "400px", width: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={markerIcon}>
            <Popup>{address}</Popup>
        </Marker>
        </MapContainer>
    );
};

export default OpenStreetMap;
