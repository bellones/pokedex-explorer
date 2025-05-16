import { Pokemon } from "@/features/pokemon/types";
import {
    useGetPokemonListQuery,
    useLazySearchPokemonQuery,
} from "@/services/api/apiSlice";
import { useCallback, useEffect, useRef, useState } from "react";

const useHomeScreen = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isLoadingMore = useRef(false);

  const { data, error, isLoading, isFetching, refetch } =
    useGetPokemonListQuery({
      limit: 20,
      offset,
    });

  const [searchPokemon, { data: searchData, isLoading: searchLoading }] =
    useLazySearchPokemonQuery();

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
    if (
      isLoading ||
      isFetching ||
      searchQuery ||
      !data?.next ||
      isLoadingMore.current
    ) {
      return;
    }

    isLoadingMore.current = true;

    setOffset((prevOffset) => {
      const newOffset = prevOffset + 20;
      console.log("Loading more Pokemon, new offset:", newOffset);
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
    setSearchQuery("");
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setOffset(0);
    refetch().finally(() => setIsRefreshing(false));
  }, [refetch]);

  return {
    allPokemon,
    searchQuery,
    isLoading,
    isFetching,
    error,
    isRefreshing,
    searchLoading,
    handleLoadMore,
    handleSearch,
    handleClearSearch,
    handleRefresh,
    searchData,
    data,
    refetch,
    setSearchQuery,
    setAllPokemon,
    setIsRefreshing,
    setOffset,
    isLoadingMore,
  };
};
export default useHomeScreen;
