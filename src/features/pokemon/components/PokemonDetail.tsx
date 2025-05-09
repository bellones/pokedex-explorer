import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TypeBadge } from '@/components/UiComponents';
import { colors, spacing, typography } from '../../../theme';
import { PokemonDetail as PokemonDetailType } from '../types';

interface PokemonDetailProps {
  pokemon: PokemonDetailType;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: pokemon.image }} 
          style={styles.image} 
          resizeMode="contain" 
          testID="pokemon-detail-image"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types</Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Height</Text>
              <Text style={styles.infoValue}>{pokemon.height} m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{pokemon.weight} kg</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Base Stats</Text>
          {pokemon.stats.map((stat) => (
            <View key={stat.name} style={styles.statRow}>
              <Text style={styles.statName}>
                {stat.name.replace('-', ' ').split(' ').map(
                  word => word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <View style={styles.statBarContainer}>
                <View 
                  style={[
                    styles.statBar, 
                    { 
                      width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                      backgroundColor: getStatColor(stat.value)
                    }
                  ]} 
                  testID={`stat-bar-${stat.name}`}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Helper function to determine stat bar color based on value
const getStatColor = (value: number): string => {
  if (value < 50) return colors.error;
  if (value < 90) return '#FFA726'; // Orange
  return '#66BB6A'; // Green
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    height: 240,
  },
  image: {
    width: 200,
    height: 200,
  },
  infoContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  name: {
    ...typography.heading,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  id: {
    ...typography.subheading,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subheading,
    marginBottom: spacing.sm,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  infoLabel: {
    ...typography.caption,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  infoValue: {
    ...typography.body,
    fontWeight: 'bold',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statName: {
    ...typography.body,
    width: 120,
  },
  statValue: {
    ...typography.body,
    width: 40,
    textAlign: 'right',
    marginRight: spacing.md,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default PokemonDetail;