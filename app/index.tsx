import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonGrid from '../src/components/PokemonGrid';

import { ErrorDisplay, LoadingIndicator, SearchBar } from '@/components/UiComponents';
import { Pokemon } from '../src/features/pokemon/types';
import { useGetPokemonListQuery, useLazySearchPokemonQuery } from '../src/services/api/apiSlice';
import { colors } from '../src/theme';

export default function HomeScreen() {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isLoadingMore = useRef(false);

  const { data, error, isLoading, isFetching, refetch } = useGetPokemonListQuery({
    limit: 20,
    offset,
  });

  const [searchPokemon, { data: searchData, isLoading: searchLoading }] = useLazySearchPokemonQuery();

  useEffect(() => {
    if (data && !searchQuery) {
      if (offset === 0) {
        setAllPokemon(data.results);
      } else {
        // Deduplicate by name to avoid repeat entries
        setAllPokemon((prev) => {
          const names = new Set(prev.map((p) => p.name));
          const newUnique = data.results.filter((p) => !names.has(p.name));
          return [...prev, ...newUnique];
        });
      }
      isLoadingMore.current = false;
    }
  }, [data, offset, searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (isLoading || isFetching || searchQuery || !data?.next || isLoadingMore.current) {
      return;
    }

    isLoadingMore.current = true;

    setOffset((prevOffset) => {
      const newOffset = prevOffset + 20;
      console.log('Loading more Pokemon, new offset:', newOffset);
      return newOffset;
    });
  }, [isLoading, isFetching, searchQuery, data?.next]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (text.length >= 2) {
        searchPokemon(text);
      }
    },
    [searchPokemon]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setOffset(0);
    refetch().finally(() => setIsRefreshing(false));
  }, [refetch]);

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
