'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactDOMServer from 'react-dom/server';
import React, { useState, useEffect } from 'react';

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

const MapDisplay = ({ pilgrims }: LiveMapProps) => {
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


export default function LiveMap({ pilgrims }: LiveMapProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return <>{isClient && <MapDisplay pilgrims={pilgrims} />}</>;
}
