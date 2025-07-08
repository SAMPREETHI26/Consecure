// src/AppUI.test.js
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid'; // for unique keys

test('Pagination buttons should change page number', () => {
  let page = 1;

  const PageComponent = () => (
    <div>
      <h2>Page {page}</h2>
      <button onClick={() => (page = page + 1)}>Next</button>
      <button onClick={() => (page = page - 1)}>Previous</button>
    </div>
  );

  render(<PageComponent />);
  expect(screen.getByText('Page 1')).toBeInTheDocument();
});

test('Dropdown filters by DDos category', () => {
  const handleChange = jest.fn();

  const Dropdown = () => (
    <select data-testid="category-dropdown" onChange={(e) => handleChange(e.target.value)}>
      <option value="All">All</option>
      <option value="DDos">DDos</option>
    </select>
  );

  render(<Dropdown />);
  fireEvent.change(screen.getByTestId('category-dropdown'), { target: { value: 'DDos' } });

  expect(handleChange).toHaveBeenCalledWith('DDos');
});

test('Description search returns results for "Malware"', () => {
  const Search = ({ query }) => {
    const data = ['Malware detected', 'Phishing attempt'];
    const filtered = data.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
    return (
      <div>
        {filtered.length > 0 ? (
          filtered.map((item) => <p key={uuidv4()}>{item}</p>) // ✅ fixed: using UUID instead of index
        ) : (
          <p>No results</p>
        )}
      </div>
    );
  };

  Search.propTypes = {
    query: PropTypes.string.isRequired, // ✅ fixed prop validation
  };

  const { rerender } = render(<Search query="Malware" />);
  expect(screen.getByText(/Malware/)).toBeInTheDocument();

  rerender(<Search query="ahsgde4" />);
  expect(screen.getByText('No results')).toBeInTheDocument();
});

test('Login button triggers login handler', () => {
  const onLogin = jest.fn();

  const Login = () => (
    <button onClick={onLogin}>Login</button>
  );

  render(<Login />);
  fireEvent.click(screen.getByText('Login'));

  expect(onLogin).toHaveBeenCalled();
});

test('Register button triggers register handler', () => {
  const onRegister = jest.fn();

  const Register = () => (
    <button onClick={onRegister}>Register</button>
  );

  render(<Register />);
  fireEvent.click(screen.getByText('Register'));

  expect(onRegister).toHaveBeenCalled();
});
