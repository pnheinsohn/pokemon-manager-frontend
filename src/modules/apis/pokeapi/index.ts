import { pokemonsApiInstance } from '@/modules/apis/axios';
import type { ICreateResponse, IDeleteResponse, IPaginatedResponse } from '@/modules/apis/axios/types';
import type {
  IBasePokemon,
  IPokemon,
  ICreatePokemonParams,
  IBasePokemonType,
  ICreateBasePokemonParams,
  IBasePokemonsSearchParams,
  IBasePokemonTypesSearchParams,
  IPokemonsSearchParams,
  ICreateBasePokemonTypeParams,
} from './types';

export const pokemonApi = {
  createBasePokemon: (basePokemonParams: ICreateBasePokemonParams) =>
    pokemonsApiInstance.post<ICreateResponse>('/base-pokemons', basePokemonParams),

  createBasePokemonType: (basePokemonTypeParams: ICreateBasePokemonTypeParams) =>
    pokemonsApiInstance.post<ICreateResponse>('/base-pokemon-types', basePokemonTypeParams),

  createPokemon: (basePokemonId: number, pokemonParams: ICreatePokemonParams) =>
    pokemonsApiInstance.post<ICreateResponse>(`/base-pokemons/${basePokemonId}`, pokemonParams),

  deleteBasePokemon: (id: number) => pokemonsApiInstance.delete<IDeleteResponse>(`/base-pokemons/${id}`),

  deleteBasePokemonType: (id: number) => pokemonsApiInstance.delete<IDeleteResponse>(`/base-pokemon-types/${id}`),

  deletePokemon: (pokemonId: number) => pokemonsApiInstance.delete<IDeleteResponse>(`/pokemons/${pokemonId}`),

  getBasePokemons: (searchParams?: IBasePokemonsSearchParams) =>
    pokemonsApiInstance.get<IPaginatedResponse<IBasePokemon>>(`/base-pokemons`, {
      params: searchParams
    }),

  getBasePokemonTypes: (searchParams?: IBasePokemonTypesSearchParams) =>
    pokemonsApiInstance.get<IPaginatedResponse<IBasePokemonType>>('/base-pokemon-types', {
      params: searchParams
    }),

  getPokemon: (basePokemonId: number, searchParams: IPokemonsSearchParams) =>
    pokemonsApiInstance.get<IPaginatedResponse<IPokemon>>(
      `/base-pokemons/${basePokemonId}`,
      { params: searchParams }
    ),
};
