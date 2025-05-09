import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Pokemon } from '../features/pokemon/types';
import { colors, spacing } from '../theme';

import PokemonCard from './PokemonCard';
import { ErrorDisplay } from './UiComponents';

interface PokemonGridProps {
  data: Pokemon[];
  loading: boolean;
  error: any;
  onEndReached?: () => void;
  onRetry?: () => void;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  data,
  loading,
  error,
  onEndReached,
  onRetry,
}) => {
  // Show error state if needed
  if (error && !loading && data.length === 0) {
    return <ErrorDisplay message="Failed to load Pokémon" onRetry={onRetry} />;
  }

  // Render function for each Pokemon card
  const renderItem = ({ item }: { item: Pokemon }) => <PokemonCard pokemon={item} />;

  // Key extractor using Pokemon ID
  const keyExtractor = (item: Pokemon) => item.id;

  return (
    <FlatList
      testID="pokemon-grid-flatlist"
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      onEndReached={onEndReached}
      onEndReachedThreshold={1} // Adjust this value to trigger earlier/later
      ListFooterComponent={
        loading ? (
          <View style={styles.loaderContainer} testID="loading-indicator">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : null
      }
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  row: {
    justifyContent: 'space-between',
  },
  loaderContainer: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
});

export default PokemonGrid;