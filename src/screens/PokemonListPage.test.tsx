import React from 'react';
import { act, fireEvent, render } from 'src/test-utils';
import { PokemonListPage } from './PokemonListPage';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

jest.mock('src/hooks/useGetPokemons', () => ({
  useGetPokemons: jest.fn().mockReturnValue({
    data: [
      { id: '1', name: 'Bulbasaur' },
      { id: '4', name: 'Charmander' },
    ],
    loading: false,
  }),
  useGetPokemonDetails: jest
    .fn()
    .mockReturnValue({ data: undefined, loading: false, error: undefined }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PokemonListPage', () => {
  test('it renders', async () => {
    const { getByText } = await act(async () => render(<PokemonListPage />));
    getByText('Bulbasaur');
  });
  test('clicking on a pokemon calls navigate', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const { getByText, user } = await act(async () => render(<PokemonListPage />));

    await act(async () => {
      await user.click(getByText('Bulbasaur'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1');
  });
  test('typing in the search bar filters the results', async () => {
    await act(async () => render(<PokemonListPage />));

    await screen.findByText('Bulbasaur');
    await screen.findByText('Charmander');

    const inputBox = screen.getByTestId('search-input-box');

    await userEvent.type(inputBox, 'Charmander');

    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
  });
});
