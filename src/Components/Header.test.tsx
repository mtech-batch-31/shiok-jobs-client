import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router for NavLink
import Header from './Header';

describe('Header Component', () => {
  it('renders the component without errors', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
  });

  it('displays the logo', () => {
    const { getByAltText } = render(
      <Router>
        <Header />
      </Router>
    );
    const logo = getByAltText('logo'); // Make sure to use the alt text of your logo
    expect(logo).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );
    
    // Replace these with your actual link texts
    const linkTexts = ['Search Job', 'Company Reviews', 'Career Guide', 'Employer', 'Login'];
    
    linkTexts.forEach((text) => {
      const link = getByText(text);
      expect(link).toBeInTheDocument();
    });
  });

  // Add more specific tests based on your component's behavior and requirements.
});