import { useState } from 'react';
import { getAddress } from 'api/fetchAddress';

import debounce from 'lodash.debounce';
import css from './AutoCompleteInput.module.css';

const DEBOUNCE_DELAY = 300;

export default function AutoCompleteInputLeaflet({
  name,
  title,
  placeholder,
  addEndpoint,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = debounce(query => {
    getAddress(query).then(data => setSuggestions(data));
  }, DEBOUNCE_DELAY);

  const handleSuggestionClick = suggestion => {
    const streetAndNumber = suggestion.address;

    const longitude = suggestion.location.x;
    const latitude = suggestion.location.y;
    const place = suggestion.attributes.City;
    const subregion = suggestion.attributes.Subregion;
    const region = suggestion.attributes.Region;
    const postcode = suggestion.attributes.Postal;
    const country = suggestion.attributes.CntryName;

    const address = {
      streetAndNumber,
      place,
      subregion,
      region,
      postcode,
      country,
      latitude,
      longitude,
    };

    setSearchQuery(suggestion.address);
    addEndpoint({ address: address, name: name });
    setSuggestions([]);
  };

  return (
    <label>
      {title}
      <div className={css.autoCompleteInputContainer}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name={name}
          placeholder={placeholder}
          value={searchQuery}
          onChange={event => {
            setSearchQuery(event.target.value);
            handleInputChange(event.target.value);
          }}
        />
        <ul className={css.addressSuggestions}>
          {suggestions?.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={css.addressSuggestions_item}
            >
              {suggestion.address}
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
}
