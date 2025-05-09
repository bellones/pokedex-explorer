// Basic Pokemon interface for the list view
export interface Pokemon {
    id: string;
    name: string;
    url: string;
    image: string;
  }
  
  // Response from the PokeAPI list endpoint
  export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  }
  
  // Detailed Pokemon information for the detail view
  export interface PokemonDetail {
    id: number;
    name: string;
    height: number; // in meters
    weight: number; // in kilograms
    types: string[];
    image: string;
    stats: PokemonStat[];
  }
  
  // Pokemon stats for the detail view
  export interface PokemonStat {
    name: string;
    value: number;
  }