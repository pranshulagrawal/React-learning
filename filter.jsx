import React, { useState } from 'react';

const AgeFilterHeader = (props) => {
  const [ageType, setAgeType] = useState('everyone');

  const onAgeFilterChange = (e) => {
    const value = e.target.value;
    setAgeType(value);

    // Notify grid that the filter has changed
    props.api.onFilterChanged();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {/* Radio Buttons for Age Filter */}
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          name="ageFilter"
          value="everyone"
          checked={ageType === 'everyone'}
          onChange={onAgeFilterChange}
        /> Everyone
      </label>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          name="ageFilter"
          value="below25"
          checked={ageType === 'below25'}
          onChange={onAgeFilterChange}
        /> Below 25
      </label>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          name="ageFilter"
          value="between25and50"
          checked={ageType === 'between25and50'}
          onChange={onAgeFilterChange}
        /> Between 25 and 50
      </label>
    </div>
  );
};

export default AgeFilterHeader;