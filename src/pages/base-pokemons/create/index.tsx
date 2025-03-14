import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCreateBasePokemon, useBasePokemonTypes } from '@/hooks/pokemons';

interface BasePokemonFormData {
  name: string;
  pokedexNumber: number;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpecialAttack: number;
  baseSpecialDefense: number;
  baseSpeed: number;
  typeIds: number[];
}

function CreateBasePokemonPage(): React.ReactNode {
  const navigate = useNavigate();
  const { data: types } = useBasePokemonTypes();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [formData, setFormData] = useState<BasePokemonFormData>({
    name: '',
    pokedexNumber: 1,
    baseHp: 1,
    baseAttack: 1,
    baseDefense: 1,
    baseSpecialAttack: 1,
    baseSpecialDefense: 1,
    baseSpeed: 1,
    typeIds: []
  });

  const { mutate: createBasePokemon } = useCreateBasePokemon();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createBasePokemon(formData, {
      onSuccess: ({ success, error }) => {
        if (success) {
          toast.success('Base Pokemon created successfully');
          navigate('/base-pokemons');
        } else {
          toast.error(error);
        }
      },
      onError: () => {
        toast.error('Failed to create Base Pokemon: Unknown error');
      }
    });
  };

  const handleTypeChange = (typeId: number) => {
    setFormData(prev => {
      const newTypeIds = prev.typeIds.includes(typeId)
        ? prev.typeIds.filter(id => id !== typeId)
        : [...prev.typeIds, typeId];
      return { ...prev, typeIds: newTypeIds };
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex mb-6">
        <h1 className="text-2xl font-bold">Create Base Pokemon</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            ref={inputRef}
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pokedexNumber" className="block text-sm font-medium">
            Pokedex Number
          </label>
          <input
            id="pokedexNumber"
            type="number"
            value={formData.pokedexNumber}
            onChange={(e) => setFormData({ ...formData, pokedexNumber: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium">Types</label>
          <div className="flex flex-wrap gap-2">
            {types?.items.map(type => (
              <label
                key={type.id}
                className={`cursor-pointer px-4 py-2 rounded-lg border ${
                  formData.typeIds.includes(type.id)
                    ? 'bg-background-primary text-text-primary'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.typeIds.includes(type.id)}
                  onChange={() => handleTypeChange(type.id)}
                />
                {type.name}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="baseHp" className="block text-sm font-medium">
              Base HP
            </label>
            <input
              id="baseHp"
              type="number"
              value={formData.baseHp}
              onChange={(e) => setFormData({ ...formData, baseHp: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="baseAttack" className="block text-sm font-medium">
              Base Attack
            </label>
            <input
              id="baseAttack"
              type="number"
              value={formData.baseAttack}
              onChange={(e) => setFormData({ ...formData, baseAttack: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="baseDefense" className="block text-sm font-medium">
              Base Defense
            </label>
            <input
              id="baseDefense"
              type="number"
              value={formData.baseDefense}
              onChange={(e) => setFormData({ ...formData, baseDefense: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="baseSpecialAttack" className="block text-sm font-medium">
              Base Special Attack
            </label>
            <input
              id="baseSpecialAttack"
              type="number"
              value={formData.baseSpecialAttack}
              onChange={(e) => setFormData({ ...formData, baseSpecialAttack: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="baseSpecialDefense" className="block text-sm font-medium">
              Base Special Defense
            </label>
            <input
              id="baseSpecialDefense"
              type="number"
              value={formData.baseSpecialDefense}
              onChange={(e) => setFormData({ ...formData, baseSpecialDefense: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="baseSpeed" className="block text-sm font-medium">
              Base Speed
            </label>
            <input
              id="baseSpeed"
              type="number"
              value={formData.baseSpeed}
              onChange={(e) => setFormData({ ...formData, baseSpeed: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/base-pokemons')}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-background-primary text-text-primary hover:bg-background-hover transition-colors"
          >
            Create Base Pokemon
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBasePokemonPage;
