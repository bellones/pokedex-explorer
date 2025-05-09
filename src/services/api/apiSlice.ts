import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonDetail, PokemonListResponse } from '../../features/pokemon/types';
// Base API configuration with RTK Query
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit: number; offset: number }>({
      query: ({ limit = 20, offset = 0 }) => `pokemon?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ name }: { name: string }) => ({ type: 'Pokemon' as const, id: name })),
              { type: 'Pokemon', id: 'LIST' },
            ]
          : [{ type: 'Pokemon', id: 'LIST' }],
      transformResponse: async (response: PokemonListResponse, _, { limit, offset }) => {
        const enhancedResults = response.results.map((pokemon: { name: string; url: string; }) => {
          const urlParts = pokemon.url.split('/');
          const id = urlParts[urlParts.length - 2];
          
          return {
            ...pokemon,
            name: pokemon.name,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });

        return {
          ...response,
          results: enhancedResults,
        };
      },
    }),
    
    // Get detailed information about a specific Pokemon
    getPokemonDetail: builder.query<PokemonDetail, string>({
      query: (id) => `pokemon/${id}`,
      providesTags: (_, __, id) => [{ type: 'Pokemon', id }],
      transformResponse: (response: any): PokemonDetail => {
        return {
          id: response.id,
          name: response.name,
          height: response.height / 10, // Convert to meters
          weight: response.weight / 10, // Convert to kilograms
          types: response.types.map((t: any) => t.type.name),
          image: response.sprites.other['official-artwork'].front_default,
          stats: response.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        };
      },
    }),
    
    // Search Pokemon by name (for bonus feature)
    searchPokemon: builder.query<Pokemon[], string>({
      query: (name) => `pokemon?limit=100`,
      transformResponse: async (response: PokemonListResponse, _, searchTerm) => {
        const results = response.results
          .filter((pokemon) => pokemon.name.includes(searchTerm.toLowerCase()))
          .map((pokemon) => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts[urlParts.length - 2];
            
            return {
              ...pokemon,
              id,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          });
          
        return results;
      },
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useSearchPokemonQuery,
  useLazySearchPokemonQuery,
} = apiSlice;