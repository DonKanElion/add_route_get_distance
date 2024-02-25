import axios from 'axios';

const mode = 'walking'; //driving
const accessToken =
  'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';
// pk.eyJ1Ijoic2tvcmFzYXVydXMiLCJhIjoiY2s5dmRjbnZpMDVlZzNlcjN3MHowYzVrbSJ9.AcSdcVS034Hhl0RhBHoC2A

export const getDistance = async data => {
  const { origin, destination } = data;

  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?`,
      {
        params: {
          annotations: 'distance',
          alternatives: true,
          continue_straight: true,
          geometries: 'polyline6',
          overview: 'full',
          access_token: accessToken,
        },
      }
    );

    if (response.data.code === 'Ok') {
      return response.data.routes[0].distance;
    }
    console.error('ERROR: ', response.data.code);
  } catch (error) {
    console.error('There was an error while fetching places:', error);
  }
};
