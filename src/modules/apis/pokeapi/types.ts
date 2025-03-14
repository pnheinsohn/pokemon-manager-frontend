import { IPaginatedSearchParams } from "../axios/types";

export interface IBasePokemon {
  id: number;
  name: string;
  pokedexNumber: number;
  types: IBasePokemonType[];
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpecialAttack: number;
  baseSpecialDefense: number;
  baseSpeed: number;
}

export interface IBasePokemonsSearchParams extends IPaginatedSearchParams {
  name: string;
}

export interface IBasePokemonType {
  id: number;
  name: string;
}

export interface IBasePokemonTypesSearchParams extends IPaginatedSearchParams {
  name: string;
}

export interface ICreateBasePokemonParams {
  name: string;
  pokedexNumber: number;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpecialAttack: number;
  baseSpecialDefense: number;
  baseSpeed: number;
  typeIds: number[];
}

export interface ICreateBasePokemonTypeParams {
  name: string;
}

export interface ICreatePokemonParams {
  nickname: string;
  level: number;
}

export interface IPokemon {
  id: number;
  nickname: string;
  level: IPokemonLevel;
  basePokemon: IBasePokemon;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface IPokemonsSearchParams extends IPaginatedSearchParams {
  nickname: string;
}

export interface IPokemonLevel {
  value: number;
  experience: number;
  experienceGoal: number;
}
