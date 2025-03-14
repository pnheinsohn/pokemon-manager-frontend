import { useMutation } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';

export const useDeleteBasePokemonType = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      pokemonApi.deleteBasePokemonType(id).then(res => res.data),
  });
};
