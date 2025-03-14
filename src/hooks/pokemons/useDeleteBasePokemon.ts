import { useMutation } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';

export const useDeleteBasePokemon = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      pokemonApi.deleteBasePokemon(id).then(res => res.data),
  });
};
