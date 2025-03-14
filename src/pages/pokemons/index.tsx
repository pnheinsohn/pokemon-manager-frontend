import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { usePokemon, useBasePokemons, useDeletePokemon, useDeleteBasePokemon } from '@/hooks/pokemons';
import { LoadingRow } from '@/components/LoadingRow/LoadingRow';

const PAGE_LIMIT = 10;

function PokemonsPage(): React.ReactNode {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const basePokemonId = searchParams.get('basePokemonId');

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedNickname, setDebouncedNickname] = useState('');
  const offset = (page - 1) * PAGE_LIMIT;

  const { data: basePokemons, isLoading: isLoadingBase, refetch: refetchBase } = useBasePokemons();
  const {
    data: pokemon,
    isPending: isLoadingPokemon,
    refetch: refetchPokemon,
  } = usePokemon(Number(basePokemonId), {
    limit: PAGE_LIMIT,
    offset,
    nickname: debouncedNickname
  });

  const { mutate: deletePokemon } = useDeletePokemon();
  const { mutate: deleteBasePokemon } = useDeleteBasePokemon();

  useEffect(() => {
    if (!basePokemonId && basePokemons?.items.length) {
      setSearchParams({ basePokemonId: basePokemons.items[0]?.id.toString() || '' });
    }
  }, [basePokemonId, basePokemons, setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNickname(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const selectedBasePokemon = basePokemons?.items.find(pokemon => pokemon.id === Number(basePokemonId));

  const handleCreatePokemon = () => {
    navigate(`/pokemons/create?basePokemonId=${basePokemonId}`);
  };

  const handleDeletePokemon = (pokemonId: number) => {
    deletePokemon({ pokemonId }, {
      onSuccess: ({ success, error }) => {
        if (success) {
          toast.success('Pokemon deleted successfully');
          refetchPokemon();
        } else {
          toast.error(`Failed to delete Pokemon: ${error}`);
        }
      },
      onError: () => {
        toast.error('Failed to delete Pokemon: Unknown error');
      }
    });
  };

  const handleDeleteBasePokemon = () => {
    if (!basePokemonId) return;

    deleteBasePokemon({ id: Number(basePokemonId) }, {
      onSuccess: ({ success, error }) => {
        if (success) {
          toast.success('Base Pokemon deleted successfully');
          refetchBase();

          if (basePokemons?.items.length) {
            const nextPokemon = basePokemons.items.find(p => p.id !== Number(basePokemonId));
          if (nextPokemon) {
            setSearchParams({ basePokemonId: nextPokemon.id.toString() });
            }
          }
        } else {
          toast.error(`Failed to delete Base Pokemon: ${error}`);
        }
      },
      onError: () => {
        toast.error('Failed to delete Base Pokemon: Unknown error');
      }
    });
  };

  const handleBasePokemonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ basePokemonId: event.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const totalPages = Math.ceil((pokemon?.count || 0) / PAGE_LIMIT);

  if (isLoadingBase && isLoadingPokemon) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!basePokemons?.items.length) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Base Pokemon Found</h2>
          <p className="text-gray-500">Please add some base Pokemon first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-6xl">
        {/* Base Pokemon Info Card */}
        {isLoadingBase ? (
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : basePokemons?.items && (
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div className="mb-6 flex justify-between items-center gap-8">
              <div className="w-[400px]">
                <select
                  value={basePokemonId || ''}
                  onChange={handleBasePokemonChange}
                  className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                  style={{ width: '100%' }}
                >
                  {basePokemons.items.map((pokemon) => (
                    <option key={pokemon.id} value={pokemon.id}>
                      {pokemon.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleDeleteBasePokemon}
                className="bg-red-600 text-white hover:bg-red-800 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
            {selectedBasePokemon && (
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600">Pokedex #{selectedBasePokemon.pokedexNumber}</p>
                  <p className="text-gray-600 mt-2">{selectedBasePokemon.types.map((type) => type.name).join(', ')}</p>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Base HP</p>
                      <p className="text-lg font-semibold">{selectedBasePokemon.baseHp}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Base Attack</p>
                      <p className="text-lg font-semibold">{selectedBasePokemon.baseAttack}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Base Defense</p>
                      <p className="text-lg font-semibold">{selectedBasePokemon.baseDefense}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Base Sp. Attack</p>
                      <p className="text-lg font-semibold">{selectedBasePokemon.baseSpecialAttack}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Base Sp. Defense</p>
                      <p className="text-lg font-semibold">{selectedBasePokemon.baseSpecialDefense}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Base Speed</p>
                      <p className="text-lg font-semibold">{selectedBasePokemon.baseSpeed}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search and Create Section */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search Pokemons..."
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
            onClick={handleCreatePokemon}
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
            <span>Pokemon</span>
          </button>
        </div>

        {/* Pokemon Table */}
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-background-primary text-text-primary">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nickname</th>
              <th className="px-6 py-3 text-left">Level</th>
              <th className="px-6 py-3 text-left">HP</th>
              <th className="px-6 py-3 text-left">Attack</th>
              <th className="px-6 py-3 text-left">Defense</th>
              <th className="px-6 py-3 text-left">Sp. Attack</th>
              <th className="px-6 py-3 text-left">Sp. Defense</th>
              <th className="px-6 py-3 text-left">Speed</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingPokemon && !pokemon ? (
              <LoadingRow colSpan={10} />
            ) : !pokemon?.items.length ? (
              <tr>
                <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                  <p className="font-medium mb-1">No Pokemon instances found</p>
                  <p className="text-sm">Click the button above to add your first Pokemon instance</p>
                </td>
              </tr>
            ) : (
              pokemon.items.map((pokemon) => (
                <tr
                  key={pokemon.id}
                  className={`hover:bg-gray-50 ${isLoadingPokemon ? 'opacity-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.nickname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.level.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.hp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.attack}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.defense}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.specialAttack}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.specialDefense}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pokemon.speed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeletePokemon(pokemon.id)}
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

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {pokemon?.items.length || 0} of {pokemon?.count || 0} Pokemon instances
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

export default PokemonsPage;
