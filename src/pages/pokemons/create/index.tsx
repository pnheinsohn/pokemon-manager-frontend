import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useBasePokemons, useCreatePokemon } from '@/hooks/pokemons';

interface PokemonFormData {
  nickname: string;
  level: number;
  basePokemonId: number;
}

function CreatePokemonPage(): React.ReactNode {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const initialBasePokemonId = Number(searchParams.get('basePokemonId'));

  const { data: basePokemons } = useBasePokemons();

  const [formData, setFormData] = useState<PokemonFormData>({
    nickname: '',
    level: 1,
    basePokemonId: initialBasePokemonId
  });

  const selectedBasePokemon = basePokemons?.items.find(pokemon => pokemon.id === formData.basePokemonId);

  const { mutate: createPokemon } = useCreatePokemon();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPokemon(
      {
        basePokemonId: formData.basePokemonId,
        createPokemonParams: {
          nickname: formData.nickname ?? selectedBasePokemon?.name ?? '',
          level: formData.level,
        },
      },
      {
        onSuccess: ({ success, error }) => {
          if (success) {
            toast.success('Pokemon created successfully');
            void navigate(`/pokemons?basePokemonId=${formData.basePokemonId}`);
          } else {
            toast.error(error);
          }
        },
        onError: () => {
          toast.error('Failed to create Pokemon: Unknown error');
        }
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex mb-6">
        <h1 className="text-2xl font-bold">Create Pokemon</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="basePokemon" className="block text-sm font-medium">
            Base Pokemon
          </label>
          <select
            id="basePokemon"
            value={formData.basePokemonId}
            onChange={(e) => setFormData({ ...formData, basePokemonId: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
            required
          >
            <option value="">Select a Base Pokemon</option>
            {basePokemons?.items.map(pokemon => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name} (#{pokemon.pokedexNumber})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nickname
          </label>
          <input
            ref={inputRef}
            id="name"
            type="text"
            value={formData.nickname}
            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
            placeholder={selectedBasePokemon?.name ?? "Enter nickname"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="level" className="block text-sm font-medium">
            Level
          </label>
          <input
            id="level"
            type="number"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => void navigate(`/pokemons?basePokemonId=${formData.basePokemonId}`, { replace: true })}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-background-primary text-text-primary hover:bg-background-hover transition-colors"
          >
            Create Pokemon
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePokemonPage;
