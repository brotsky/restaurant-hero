import React from 'react';	
import { render } from '@testing-library/react';	
import App from './Home';	

test('renders learn react link', () => {	
  const { getByText } = render(<App />);	
  const linkElement = getByText(/Submit a Restaurant/i);

  expect(linkElement).toBeInTheDocument();
});
