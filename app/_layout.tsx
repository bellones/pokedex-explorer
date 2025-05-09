import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { colors } from '../src/theme';


export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={colors.primaryDark} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Pokédex Explorer',
          }}
        />
        <Stack.Screen
          name="pokemon/[id]"
          options={{
            title: 'Pokémon Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </Provider>
  );
}