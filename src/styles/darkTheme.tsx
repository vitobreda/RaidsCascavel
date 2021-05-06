import {
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

export const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
    },
};