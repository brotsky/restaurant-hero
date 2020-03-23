import { getCitiesArray } from './envProperties';

import React from 'react';
function Cities() {
	let cities = getCitiesArray().map(city => <li key={city.City}><a href={`https://${city.URLs[0]}`} target="_blank" rel="noopener noreferrer" >{city.City}</a></li>);
	return (
		<div className="cities">
		<h1>Cities</h1>
		<ul>
			{cities}
		</ul>
		</div>
	)
}
export default Cities;