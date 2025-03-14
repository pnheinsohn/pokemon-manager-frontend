import { useMutation } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';
import { ICreatePokemonParams } from '@/modules/apis/pokeapi/types';

export const useCreatePokemon  = () => {
  return useMutation({
    mutationFn: ({ basePokemonId, createPokemonParams }: { basePokemonId: number; createPokemonParams: ICreatePokemonParams }) =>
      pokemonApi.createPokemon(basePokemonId, createPokemonParams).then(res => res.data),
  });
};
