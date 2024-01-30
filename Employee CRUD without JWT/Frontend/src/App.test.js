import { MemoryRouter, useNavigate } from "react-router-dom";
import Details from "./Pages/Details.js";
import {render, screen } from '@testing-library/react'

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

test('should go to add user page',()=>{
  
  render(
    <MemoryRouter>
      <Details/>
    </MemoryRouter>
  );
  expect(screen.getByText('Enter Details')).toBeInTheDocument();
  expect(screen.getByText('Email:')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your Email')).toBeInTheDocument();
  expect(screen.getByText('First Name:')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your First Name')).toBeInTheDocument();
  expect(screen.getByText('Last Name:')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your Last Name')).toBeInTheDocument();
  expect(screen.getByText('Mobile:')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter phone number')).toBeInTheDocument();
  expect(screen.getByText('Address:')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter your Address')).toBeInTheDocument();
  expect(screen.getByText('CREATE')).toBeInTheDocument();
  expect(screen.getByText('GO BACK')).toBeInTheDocument();
})