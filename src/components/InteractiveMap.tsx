'use client';

import { useRef, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface InteractiveMapProps {
  locale: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 23.6145,
  lng: 58.5453,
};

const projects = [
  { lat: 23.6145, lng: 58.5453, name: 'مشروع الخوير' },
  { lat: 23.6702, lng: 58.1891, name: 'مشروع السيب' },
  { lat: 23.5318, lng: 58.3892, name: 'مشروع بوشر' },
];

export default function InteractiveMap({ locale }: InteractiveMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            {locale === 'ar' 
              ? 'يرجى إضافة مفتاح Google Maps API'
              : 'Please add Google Maps API key'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'توزيع مشاريعنا' : 'Our Projects Distribution'}
          </h2>
          <p className="text-xl text-gray-600">
            {locale === 'ar' 
              ? 'استكشف مواقع مشاريعنا على الخريطة'
              : 'Explore our project locations on the map'}
          </p>
        </div>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={11}
            options={{
              styles: [
                {
                  featureType: 'all',
                  elementType: 'geometry',
                  stylers: [{ color: '#f5f5f5' }],
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{ color: '#c9c9c9' }],
                },
              ],
            }}
          >
            {projects.map((project, index) => (
              <Marker
                key={index}
                position={{ lat: project.lat, lng: project.lng }}
                title={project.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </section>
  );
}

