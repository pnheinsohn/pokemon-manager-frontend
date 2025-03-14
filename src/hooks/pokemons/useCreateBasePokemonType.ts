import { useMutation } from '@tanstack/react-query';
import { pokemonApi } from '@/modules/apis';
import { ICreateBasePokemonTypeParams } from '@/modules/apis/pokeapi/types';

export const useCreateBasePokemonType = () => {
  return useMutation({
    mutationFn: (createBasePokemonTypeParams: ICreateBasePokemonTypeParams) =>
      pokemonApi.createBasePokemonType(createBasePokemonTypeParams).then(res => res.data),
  });
};
