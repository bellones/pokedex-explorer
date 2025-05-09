import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pokemon } from '../features/pokemon/types';
import { colors, spacing, typography } from '../theme';

interface PokemonCardProps {
  pokemon: Pokemon;
}

// Calculate responsive column width
const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.md * 3) / 2; // 2 columns with spacing

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const handlePress = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress} 
      activeOpacity={0.7}
      testID="pokemon-card-touchable"
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
          resizeMode="contain"
          accessibilityRole="image"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={styles.id}>#{pokemon.id.padStart(3, '0')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    padding: spacing.sm,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    height: cardWidth * 0.8,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  infoContainer: {
    padding: spacing.sm,
  },
  name: {
    ...typography.subheading,
    marginBottom: spacing.xs,
  },
  id: {
    ...typography.caption,
    color: colors.gray,
  },
});

export default PokemonCard;