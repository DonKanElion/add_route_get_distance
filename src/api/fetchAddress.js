import axios from 'axios';
// import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;

const BASE_URL =
  'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';

export const getAddress = async query => {
  try {
    const response = await axios.get(`${BASE_URL}?SingleLine=${query}`, {
      params: {
        countryCode: 'ua',
        sourceCountry: 'ua',
        category: 'address',
        maxLocations: 40,
        angCode: 'uk',
        outFields: '*',
        forStorage: false,
        f: 'pjson',
        autocomplete: 'true',
        //   outFields: 'PlaceName,Type,City,Country',
      },
    });
    return response.data.candidates;
  } catch (error) {
    console.error('There was an error while fetching places:', error);
  }
};
