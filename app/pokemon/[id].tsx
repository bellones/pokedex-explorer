import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ErrorDisplay, LoadingIndicator } from '@/components/UiComponents';
import PokemonDetail from '@/features/pokemon/components/PokemonDetail';
import { useGetPokemonDetailQuery } from '../../src/services/api/apiSlice';
import { colors } from '../../src/theme';

export default function PokemonDetailScreen() {
  // Get the pokemon ID from the route params
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Fetch Pokemon details using RTK Query
  const { data: pokemon, isLoading, error, refetch } = useGetPokemonDetailQuery(id ?? '');

  // Show loading state
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorDisplay 
        message="Failed to load Pokémon details" 
        onRetry={refetch} 
      />
    );
  }

  // Show Pokemon details
  return (
    <View style={styles.container}>
      {pokemon && <PokemonDetail pokemon={pokemon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});