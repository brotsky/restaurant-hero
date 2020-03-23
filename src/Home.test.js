import React from 'react';	
import { render, queryAllByAltText } from '@testing-library/react';	
import App from './Home';	

test('renders Log Angeles Restaurant Hero and contains Submit Button', () => {	
  const { getByText, container } = render(<App />);	
  const linkElement = getByText(/Submit a Restaurant/i);
  const img = queryAllByAltText(container,"Restaurant Hero Logo");
  expect(img[0].getAttribute("src")).toBe("/restaurant-hero-logo.svg")
  expect(linkElement).toBeInTheDocument();
});
