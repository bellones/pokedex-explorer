import '@testing-library/jest-native/extend-expect';

// Mock the expo-router module
jest.mock('expo-router', () => ({
  useRouter: jest.fn().mockReturnValue({
    navigate: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useRoute: jest.fn().mockReturnValue({
    params: {},
  }),
  useLocalSearchParams: jest.fn().mockReturnValue({
    id: '1',
  }),
  Link: 'Link',
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
  Stack: {
    Screen: jest.fn(),
  },
}));

// Mock the redux provider and hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn(),
  Provider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: jest.fn().mockReturnValue({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}));

// Mock dimensions for responsive layout testing
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock RTK Query hooks
jest.mock('../src/services/api/apiSlice', () => ({
  useGetPokemonListQuery: jest.fn(),
  useGetPokemonDetailQuery: jest.fn(),
  useLazySearchPokemonQuery: jest.fn(),
  apiSlice: {
    endpoints: {
      getPokemonList: {
        initiate: jest.fn(),
      },
      getPokemonDetail: {
        initiate: jest.fn(),
      },
      searchPokemon: {
        initiate: jest.fn(),
      },
    },
  },
}));