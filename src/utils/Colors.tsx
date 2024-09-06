import { Appearance } from 'react-native';

interface Colors {
    [key: string]: string | undefined
}

// COLORS FOR THE DARK THEME
const darkColorScheme: Colors = {
    textColor: '#ffffff',
    textLight: 'rgba(255, 255, 255, 0.4)',
    modalBackground: 'rgba(0, 0, 0, 0.4)',
    btnText: '#000000',
    btnBackground: '#EAB936',
    btnOutline: '#E6E6E6',
    gray: '#9B9B9A',
    danger: '#dc3545',
    warning: '#ffc107',
    propertyPrice: '#0D263C',
    navigationIcon: '#7484A0',
    navigationBackground: '#063E58',
    darkTheme: '#0D263C',
};

// COLORS FOR THE LIGHT THEME
const lightColorScheme: Colors = {
    textColor: '#ffffff',
    textLight: 'rgba(255, 255, 255, 0.4)',
    modalBackground: 'rgba(0, 0, 0, 0.4)',
    btnText: '#000000',
    btnBackground: '#EAB936',
    btnOutline: '#E6E6E6',
    gray: '#9B9B9A',
    danger: '#dc3545',
    warning: '#ffc107',
    propertyPrice: '#0D263C',
    navigationIcon: '#7484A0',
    navigationBackground: '#063E58',
    darkTheme: '#0D263C',
};

export const Color = (color: string) => {
    // GET USER DEVICE THEME (LIGHT/DARK)
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme === 'dark') {           // IF USER DEVICE THEME IS DARK
        return darkColorScheme[color];
    }else {                                 // IF USER DEVICE THEME IS LIGHT
        return lightColorScheme[color];
    }
};
