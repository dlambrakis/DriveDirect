// Using the user_provided_design palette
const tintColorLight = '#9E7FFF'; // primary
const tintColorDark = '#FFFFFF'; // text

export default {
  light: {
    text: '#171717', // background (for contrast on light bg)
    background: '#FFFFFF', // text (as light mode background)
    tint: tintColorLight,
    tabIconDefault: '#A3A3A3', // textSecondary
    tabIconSelected: tintColorLight,
    // Custom user colors for light theme (inverted or adjusted)
    primary: '#9E7FFF',
    secondary: '#38bdf8',
    accent: '#f472b6',
    surface: '#E5E5E5', // Lighter surface
    border: '#D1D1D1', // Lighter border
    textSecondary: '#525252', // Darker secondary text
  },
  dark: { // This will be the default based on user_provided_design
    text: '#FFFFFF', // user_text
    background: '#171717', // user_background
    tint: tintColorDark, // user_text (as primary interactive color on dark)
    tabIconDefault: '#A3A3A3', // user_textSecondary
    tabIconSelected: '#9E7FFF', // user_primary (for selected tabs)
    // Custom user colors for dark theme (direct mapping)
    primary: '#9E7FFF',
    secondary: '#38bdf8',
    accent: '#f472b6',
    surface: '#262626', // user_surface
    border: '#2F2F2F', // user_border
    textSecondary: '#A3A3A3', // user_textSecondary
  },
};
