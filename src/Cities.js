import { getCitiesArray } from './envProperties';
import './content/styles/main_styles.css'
import React from 'react';

function Cities() {
	let cities = getCitiesArray().map(city => <li key={city.City}><a href={`https://${city.URLs[0]}`} target="_blank" rel="noopener noreferrer" >{city.City}</a></li>);
	return (
		<div className="cities cities_list" id="text">
		<h1>Active Sites</h1>
		<ul>
			{cities}
		</ul>
		</div>
	)
}
export default Cities;