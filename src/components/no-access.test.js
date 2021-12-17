// vendors
import { render, screen } from '@testing-library/react';

// component
import NoAccess from './no-access.component';

test('renders learn react link', () => {
  render(<NoAccess />);
  const alertElement = screen.getByText('No tienes acceso a este recurso');
  
  expect(alertElement).toBeInTheDocument();
});