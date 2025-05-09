# Pokédex Explorer

A React Native mobile application built with Expo that allows users to browse and search for Pokémon using the [PokeAPI](https://pokeapi.co/).

## 📱 Features

- View a list of Pokémon in a responsive 2-column grid layout
- See detailed information about each Pokémon including stats, types, height, and weight
- Search for Pokémon by name
- Load more Pokémon on scroll (pagination)
- Pull-to-refresh to update the Pokémon list
- Clean, modern UI with smooth transitions

## 🛠️ Technologies Used

- [React Native](https://reactnative.dev/) - Mobile app framework
- [Expo SDK 52](https://docs.expo.dev/) - React Native toolchain
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - Data fetching and caching
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [PokeAPI](https://pokeapi.co/) - Pokémon data source

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bellones/pokedex-explorer.git
   cd pokedex-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on a device or simulator:
   - Press `i` to open in iOS Simulator
   - Press `a` to open in Android Emulator
   - Scan the QR code with the Expo Go app on your physical device

### Running Tests

The application includes a comprehensive test suite covering components, screens, and API functionality:

1. Run all tests:
   ```bash
   npm test
   # or
   yarn test
   ```

2. Run tests with watch mode (for development):
   ```bash
   npm run test:watch
   # or
   yarn test:watch
   ```

3. Run tests with coverage report:
   ```bash
   npm run test:coverage
   # or
   yarn test:coverage
   ```

## 🏗️ Project Structure

```
pokedex-explorer/
├── app/                         # Expo Router screens
│   ├── index.tsx                # Home/List screen
│   ├── pokemon/[id].tsx         # Detail screen with dynamic route
│   └── _layout.tsx              # Root layout with navigation config
├── src/
│   ├── components/              # Reusable UI components
│   ├── features/                # Feature-based organization
│   │   └── pokemon/             # Pokemon feature
│   ├── services/                # API services
│   ├── store/                   # Redux store configuration
│   ├── theme/                   # Styling constants
│   └── utils/                   # Utility functions
└── ...                          # Config files
```

## 🤔 Assumptions and Trade-offs

- **API Data Transformation**: I transform the API data to extract the image URLs and format them for better display, which adds a small processing overhead but improves the user experience.
- **Pagination**: The app loads 20 Pokémon at a time to balance between network usage and smooth scrolling.
- **Image Loading**: Official artwork is used for better visual quality, but this requires additional network bandwidth.
- **Local Search**: The search is implemented to work with a pre-loaded set of Pokémon for a faster user experience, trading off exhaustiveness for speed.

## 🚀 Areas for Improvement

With more time, I would:

1. Add unit and integration tests for components and Redux slices
2. Implement more advanced filtering options (by type, generation, etc.)
3. Add favorites functionality with persistent storage
4. Implement offline support with data caching
5. Add animations for smoother transitions
6. Optimize image loading with placeholder/blurs
7. Add dark mode support
8. Implement internationalization
9. Add tests

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
