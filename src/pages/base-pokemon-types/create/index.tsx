import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCreateBasePokemonType } from '@/hooks/pokemons';

interface BasePokemonTypeFormData {
  name: string;
}

function CreateBasePokemonTypePage(): React.ReactNode {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BasePokemonTypeFormData>({
    name: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { mutate: createBasePokemonType } = useCreateBasePokemonType();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createBasePokemonType({ name: formData.name }, {
      onSuccess: ({ success, error }) => {
        if (success) {
          toast.success('Type created successfully');
          navigate('/base-pokemon-types');
        } else {
          toast.error(error);
        }
      },
      onError: () => {
        toast.error(`Failed to create Base Pokemon Type: Unknown error`);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex mb-6">
        <h1 className="text-2xl font-bold">Create Type</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Type Name
          </label>
          <input
            ref={inputRef}
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background-primary"
            placeholder="Enter type name"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/base-pokemon-types', { replace: true })}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-background-primary text-text-primary hover:bg-background-hover transition-colors"
          >
            Create Type
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBasePokemonTypePage;
