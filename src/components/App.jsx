import { useState } from 'react';
import { createPortal } from 'react-dom';

import { ContainerLeaflet } from './Container/ContainerLeaflet';
import MapBox from './MapBox/MapBox';
import { ModalWindow } from './ModalWindow/ModalWindow';

export const App = () => {
  const [newCoordinates, setNewCoordinates] = useState({});
  const [distance, setDistance] = useState(null);
  const [onOpenMap, setOnOpenMap] = useState(false);

  const changeDistance = data => {
    const metersToKilometersConversion = data / 1000;
    setDistance(metersToKilometersConversion);
  };

  const addCoordinates = data => {
    setNewCoordinates(data);
  };

  return (
    <div
      style={{
        marginTop: '40px',
        padding: '0 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <ContainerLeaflet
        style={{ display: 'block' }}
        distance={distance}
        addCoordinates={addCoordinates}
        changeDistance={changeDistance}
      />

      <button type="button" onClick={() => setOnOpenMap(!onOpenMap)}>
        Open map
      </button>

      {onOpenMap &&
        createPortal(
          <ModalWindow>
            <button
              type="button"
              onClick={() => setOnOpenMap(!onOpenMap)}
              style={{ marginLeft: '90%' }}
            >
              Close map
            </button>

            <MapBox
              changeDistance={changeDistance}
              coordinates={newCoordinates}
            />
          </ModalWindow>,
          document.body
        )}
    </div>
  );
};
