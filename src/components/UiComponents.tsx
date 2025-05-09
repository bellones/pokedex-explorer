import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

// Loading Indicator Component
export const LoadingIndicator: React.FC = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color={colors.primary} testID="loading-spinner" />
    <Text style={styles.loadingText}>Loading Pokémon...</Text>
  </View>
);

// Error Display Component
interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>{message}</Text>
    {onRetry && (
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Search Bar Component
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search Pokémon...',
}) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      autoCapitalize="none"
    />
    {value.length > 0 && (
      <TouchableOpacity 
        style={styles.clearButton} 
        onPress={onClear}
        testID="search-clear-button"
      >
        <Text style={styles.clearButtonText}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Type Badge Component
interface TypeBadgeProps {
  type: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const backgroundColor = colors.typeColors[type as keyof typeof colors.typeColors] || colors.gray;
  
  return (
    <View 
      style={[styles.badge, { backgroundColor }]} 
      testID={`type-badge-${type}`}
    >
      <Text style={styles.badgeText}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    marginTop: spacing.md,
    color: colors.gray,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  retryText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: spacing.md,
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    ...typography.body,
    flex: 1,
    paddingVertical: spacing.md,
  },
  clearButton: {
    padding: spacing.xs,
  },
  clearButtonText: {
    ...typography.body,
    color: colors.gray,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default {
  LoadingIndicator,
  ErrorDisplay,
  SearchBar,
  TypeBadge,
};