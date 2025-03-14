import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useBasePokemons, useDeleteBasePokemon } from '@/hooks/pokemons';
import { LoadingRow } from '@/components/LoadingRow/LoadingRow';

const PAGE_LIMIT = 10;

function BasePokemonsPage(): React.ReactNode {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedName, setDebouncedName] = useState('');

  const offset = (page - 1) * PAGE_LIMIT;

  const { data: basePokemons, isPending, refetch } = useBasePokemons({
    offset,
    limit: PAGE_LIMIT,
    name: debouncedName
  });
  const { mutate: deleteBasePokemon } = useDeleteBasePokemon();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleDeletePokemon = (e: React.MouseEvent, pokemonId: number) => {
    e.stopPropagation();

    deleteBasePokemon({ id: pokemonId }, {
      onSuccess: ({ success, error }) => {
        if (success) {
          toast.success('Base Pokemon deleted successfully');
          void refetch();
        } else {
          toast.error(`Failed to delete Base Pokemon: ${error}`);
        }
      },
      onError: () => {
        toast.error('Failed to delete Base Pokemon: Unknown error');
      }
    });
  };

  const totalPages = Math.ceil((basePokemons?.count ?? 0) / PAGE_LIMIT);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-6xl">
        <div className="mb-6 flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search Base Pokemons..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => void navigate('/base-pokemons/create')}
            className="px-4 py-2.5 bg-background-primary text-text-primary rounded-lg shadow-sm hover:bg-background-primary/80 transition-colors flex items-center gap-2"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Base Pokemon</span>
          </button>
        </div>

        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-background-primary text-text-primary">
            <tr>
              <th className="px-6 py-3 text-left">Pokedex #</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Base HP</th>
              <th className="px-6 py-3 text-left">Base Attack</th>
              <th className="px-6 py-3 text-left">Base Defense</th>
              <th className="px-6 py-3 text-left">Base Sp. Attack</th>
              <th className="px-6 py-3 text-left">Base Sp. Defense</th>
              <th className="px-6 py-3 text-left">Base Speed</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isPending && !basePokemons ? (
              <LoadingRow colSpan={10} />
            ) : !basePokemons?.items.length ? (
              <tr>
                <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                  <p className="font-medium mb-1">No base Pokemon found</p>
                  <p className="text-sm">Click the button above to create your first base Pokemon</p>
                </td>
              </tr>
            ) : (
              basePokemons?.items.map((pokemon) => (
                <tr
                  key={pokemon.id}
                  className={`hover:bg-gray-50 cursor-pointer ${isPending ? 'opacity-50' : ''}`}
                  onClick={() => void navigate(`/pokemons?basePokemonId=${pokemon.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.pokedexNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.types.map(type => type.name).join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.baseHp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.baseAttack}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.baseDefense}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.baseSpecialAttack}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.baseSpecialDefense}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.baseSpeed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => handleDeletePokemon(e, pokemon.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {basePokemons?.items.length ?? 0} of {basePokemons?.count ?? 0} base Pokemons
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={`px-3 py-1 rounded ${
                page >= totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasePokemonsPage;
