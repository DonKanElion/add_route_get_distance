import { useState } from 'react';
import { getAddress } from 'api/fetchAddress';

import css from './AutoCompleteInput.module.css';

export default function AutoCompleteInputLeaflet({
  name,
  title,
  placeholder,
  addEndpoint,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
    handleInputChange(event.target.value);
  };

  const handleInputChange = async query => {
    const data = await getAddress(query);
    setSuggestions(data);
  };

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

    setValue(suggestion.address);
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
          value={value}
          onChange={handleChange}
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
