import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';
import { IPokemonsSearchParams } from '@/modules/apis/pokeapi/types';

export const usePokemons = (basePokemonId: number, searchParams: IPokemonsSearchParams) => {
  return useQuery({
    queryKey: ['pokemons', { basePokemonId, searchParams }],
    queryFn: () => pokemonApi.getPokemons(basePokemonId, searchParams).then(res => res.data),
    placeholderData: (previousData) => previousData,
    enabled: !!basePokemonId
  });
};
