import React from 'react';
import RatesSearchBar from '../RatesSearchBar';
import './RatesTable.css';

function RatesTable() {
  return (
    <div className="rates-table">
      <RatesSearchBar />
      {/* Tabela exibindo as taxas de câmbio. */}
    </div>
  );
}
export default RatesTable;