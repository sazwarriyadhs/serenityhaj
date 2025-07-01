'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactDOMServer from 'react-dom/server';
import React from 'react';

// FIX for default icon path issue with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// This is a common fix for Leaflet in React environments.
// It ensures that the default icon paths are correctly set up.
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface Pilgrim {
    id: number;
    name: string;
    position: [number, number];
    image: string;
    hint: string;
}

interface LiveMapProps {
    pilgrims: Pilgrim[];
}

// Move icon creation outside the component to prevent re-creation on render
const createPilgrimIcon = (pilgrim: Pilgrim) => {
    return L.divIcon({
        html: ReactDOMServer.renderToString(
             <Avatar className="h-10 w-10 border-2 border-primary shadow-lg bg-white">
                <AvatarImage src={pilgrim.image} alt={pilgrim.name} data-ai-hint={pilgrim.hint} />
                <AvatarFallback>{pilgrim.name.charAt(0)}</AvatarFallback>
            </Avatar>
        ),
        className: 'bg-transparent border-none',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
};

export default function LiveMap({ pilgrims }: LiveMapProps) {
    const mapCenter: [number, number] = [21.484, 39.647];
    const mapZoom = 9;

    return (
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} className="w-full aspect-video rounded-lg overflow-hidden border">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pilgrims.map(pilgrim => (
                <Marker key={pilgrim.id} position={pilgrim.position} icon={createPilgrimIcon(pilgrim)}>
                    <Popup>
                        {pilgrim.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
