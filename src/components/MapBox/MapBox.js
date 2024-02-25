import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';
// pk.eyJ1Ijoic2tvcmFzYXVydXMiLCJhIjoiY2s5dmRjbnZpMDVlZzNlcjN3MHowYzVrbSJ9.AcSdcVS034Hhl0RhBHoC2A

const MapBox = ({ coordinates, changeDistance }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(30.5241);
  const [lat, setLat] = useState(50.45);
  const [zoom, setZoom] = useState(9);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      //   attributionControl: true,
      language: 'uk-UA',
      geometries: 'polyline6',
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Directions
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
      alternatives: false,
      language: 'uk-UA',
      controls: false,
      interactive: false,
      flyTo: false,
      // autocomplete: true,
      //   geometries: false,
      //   controls: { instructions: true },
    });

    map.addControl(directions, 'top-left');

    // ✅ SET coordinates
    map.on('load', function () {
      const { origin, destination } = coordinates;

      if (origin && destination) {
        directions.setOrigin(origin);
        directions.setDestination(destination);

        return;
      }
    });

    // ✅ Distance
    directions.on('route', e => {
      
      if (e.route && e.route[0] && e.route[0].distance) {
        const routeDistance = e.route[0].distance;
        setDistance(routeDistance);
        changeDistance(routeDistance);
      }
    });

    return () => map.remove();
  }, [coordinates, distance]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Distance: {distance ? distance / 1000 : ''} {distance ? 'km' : ''}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapBox;
