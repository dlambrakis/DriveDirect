import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';

export default function ModalScreen() {
  const colorScheme = 'dark';
  return (
    <View style={styles.container}>
      <Text type="title" style={{color: Colors[colorScheme].text}}>Info Modal</Text>
      <View style={[styles.separator, {backgroundColor: Colors[colorScheme].border}]} />
      <Text style={{color: Colors[colorScheme].textSecondary, textAlign: 'center'}}>
        This is an example modal screen. You can put any informational content or specific actions here.
        It's presented on top of the current navigation stack.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.lg,
  },
  separator: {
    marginVertical: Layout.spacing.lg,
    height: 1,
    width: '80%',
  },
});
