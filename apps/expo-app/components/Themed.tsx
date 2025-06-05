import { Text as DefaultText, View as DefaultView, useColorScheme, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export type TextProps = DefaultText['props'] & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'link' | 'caption';
};

export type ViewProps = DefaultView['props'] & {
  lightColor?: string;
  darkColor?: string;
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, type = 'default', ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  let textStyle;
  switch (type) {
    case 'title':
      textStyle = styles.title;
      break;
    case 'subtitle':
      textStyle = styles.subtitle;
      break;
    case 'link':
      textStyle = styles.link;
      break;
    case 'caption':
      textStyle = styles.caption;
      break;
    default:
      textStyle = styles.default;
  }

  return <DefaultText style={[{ color }, textStyle, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System', // Default system font
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: 'System',
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.primary, // Use primary color for links
    fontFamily: 'System',
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.dark.textSecondary,
    fontFamily: 'System',
  }
});
