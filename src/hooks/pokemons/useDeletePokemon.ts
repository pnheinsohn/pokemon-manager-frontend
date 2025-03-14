import { useMutation } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';

export const useDeletePokemon = () => {
  return useMutation({
    mutationFn: ({ pokemonId }: { pokemonId: number }) =>
      pokemonApi.deletePokemon(pokemonId).then(res => res.data),
  });
};
