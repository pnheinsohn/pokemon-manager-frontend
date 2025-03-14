import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';
import { IPokemonsSearchParams } from '@/modules/apis/pokeapi/types';

export const usePokemon = (basePokemonId: number, searchParams: IPokemonsSearchParams) => {
  return useQuery({
    queryKey: ['pokemon', { basePokemonId, searchParams }],
    queryFn: () => pokemonApi.getPokemon(basePokemonId, searchParams).then(res => res.data),
    placeholderData: (previousData) => previousData,
    enabled: !!basePokemonId
  });
};
