import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Header from './Header'; 
import { AuthProvider } from '../Auth/AuthContext';

describe('Header Component', () => {
  it('renders the component without errors', () => {
    render(
      <AuthProvider>
        <Router>
          <Header />
        </Router>
      </AuthProvider>
    );
  });

  it('displays navigation links', () => {
    const { getByText } = render(
      <AuthProvider>
        <Router>
          <Header />
        </Router>
      </AuthProvider>
    );
    
    const linkTexts = ['shiok jobs - test pipeline','Search Job', 'Company Reviews', 'Career Guide', 'Employer', 'Login'];
    
    linkTexts.forEach((text) => {
      const link = getByText(text);
      expect(link).toBeInTheDocument();
    });
  });
});