import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';
import { IBasePokemonTypesSearchParams } from '@/modules/apis/pokeapi/types';

export const useBasePokemonTypes = (searchParams?: IBasePokemonTypesSearchParams) => {
  return useQuery({
    queryKey: ['basePokemonTypes', searchParams],
    queryFn: () => pokemonApi.getBasePokemonTypes(searchParams).then(res => res.data),
    placeholderData: (previousData) => previousData
  });
};
