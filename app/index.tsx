import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonGrid from '../src/components/PokemonGrid';

import { ErrorDisplay, LoadingIndicator, SearchBar } from '@/components/UiComponents';
import useHomeScreen from '@/presentation/useHomeScreen';
import { colors } from '../src/theme';

export default function HomeScreen() {


  const {
     allPokemon,
      searchQuery,
      isLoading,
      isFetching,
      error,
      searchLoading,
      handleClearSearch,
      handleLoadMore,
      handleSearch,
      searchData,
      data,
      refetch
  } = useHomeScreen();
 
  if (isLoading && !data && !searchQuery) {
    return <LoadingIndicator />;
  }

  if (error && !isLoading && allPokemon.length === 0 && !searchQuery) {
    return <ErrorDisplay message="Failed to load Pokémon" onRetry={refetch} />;
  }

  const displayData = searchQuery && searchData ? searchData : allPokemon;

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search Pokémon by name..."
        />
        <PokemonGrid
          data={displayData}
          loading={isLoading || isFetching || searchLoading}
          error={error}
          onEndReached={handleLoadMore}
          onRetry={refetch}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
