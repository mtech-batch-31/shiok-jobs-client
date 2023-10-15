import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Header from './Header'; 

describe('Header Component', () => {
  it('renders the component without errors', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
  });

  it('displays navigation links', () => {
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );
    
    // Replace these with your actual link texts
    const linkTexts = ['Search Job', 'Company Reviews', 'Career Guide', 'Job Seeker', 'Login'];
    
    linkTexts.forEach((text) => {
      const link = getByText(text);
      expect(link).toBeInTheDocument();
    });
  });
});