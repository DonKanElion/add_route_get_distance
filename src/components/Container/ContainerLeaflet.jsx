import { useState } from 'react';

import AutoCompleteInputLeaflet from 'components/AutoCompleteInput/AutoCompleteInputLeaflet';
import { getDistance } from 'api/fetchDistance';

export const ContainerLeaflet = ({
  distance,
  changeDistance,
  addCoordinates,
  children,
}) => {
  const [route, setRoute] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);

  const setDistanceInLocalStorage = data => {
    localStorage.setItem('route', data);
  };

  const addEndpoint = data => {
    const { name, address } = data;

    switch (name) {
      case 'origin':
        setOrigin(address);
        return;
      case 'destination':
        setDestination(address);
        return;
      default:
        throw new Error(`Unsupported type of ${name}`);
    }
  };

  const handleClick = () => {
    if (!distance) return alert('Enter endpoints');

    console.log('Distance: ', distance?.toFixed(5));
    console.log('Route: ', { ...route, distance });

    const fullRoute = {
      origin,
      destination,
      distance,
    };

    console.log('Full Route: ', fullRoute);

    const saveLocalStorage = JSON.stringify({ ...route, distance: distance });
    setDistanceInLocalStorage(saveLocalStorage);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!origin && !destination) return alert('Enter the address');

    const coordinates = {
      origin: [origin.longitude, origin.latitude],
      destination: [destination.longitude, destination.latitude],
    };
    setRoute(coordinates);
    addCoordinates(coordinates);
    getDistance(coordinates).then(resp => changeDistance(resp));
  };

  return (
    <>
      <div style={{ display: 'block' }}>
        <form
          autoComplete="off"
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '30px',
            outline: '2px solid tomato',
            padding: '10px',
          }}
          onSubmit={handleSubmit}
        >
          <AutoCompleteInputLeaflet
            type="text"
            title="Address #1"
            name="origin"
            placeholder="Address #1"
            addEndpoint={addEndpoint}
          />

          <AutoCompleteInputLeaflet
            type="text"
            title="Address #2"
            name="destination"
            placeholder="Address #2"
            addEndpoint={addEndpoint}
          />
          <button type="submit">Count distance</button>
        </form>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p>
          Distance: {distance} {distance ? 'km' : ''}
        </p>
        <button
          type="button"
          onClick={handleClick}
          style={{ marginLeft: '20px', height: '30px' }}
        >
          Save distance
        </button>
      </div>
      {children}
    </>
  );
};
