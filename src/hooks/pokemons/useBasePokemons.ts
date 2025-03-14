import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';
import { IBasePokemonsSearchParams } from '@/modules/apis/pokeapi/types';

export const useBasePokemons = (searchParams?: IBasePokemonsSearchParams) => {
  return useQuery({
    queryKey: ['basePokemons', searchParams],
    queryFn: () => pokemonApi.getBasePokemons(searchParams).then(res => res.data),
    placeholderData: (previousData) => previousData
  });
};
