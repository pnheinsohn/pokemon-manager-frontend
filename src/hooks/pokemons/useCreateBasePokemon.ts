import { useMutation } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';
import { ICreateBasePokemonParams } from '@/modules/apis/pokeapi/types';

export const useCreateBasePokemon = () => {
  return useMutation({
    mutationFn: (createBasePokemonParams: ICreateBasePokemonParams) =>
      pokemonApi.createBasePokemon(createBasePokemonParams).then(res => res.data),
  });
};
