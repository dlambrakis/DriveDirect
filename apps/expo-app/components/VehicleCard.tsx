import React from 'react';
import { StyleSheet, Image, Pressable, Platform } from 'react-native'; // Added Platform
import { Text, View } from './Themed';
import { Vehicle } from '@directdrive/core-types';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { Car } from 'lucide-react-native'; // Using lucide-react-native
import { useRouter } from 'expo-router';

type VehicleCardProps = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter();
  const colorScheme = 'dark'; // Assuming dark mode from user_provided_design

  const handlePress = () => {
    router.push(`/vehicle/${vehicle.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: Colors[colorScheme].surface, borderColor: Colors[colorScheme].border }]}>
        <Image 
          source={{ uri: vehicle.image_urls?.[0] || 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=300' }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={[styles.content, { backgroundColor: Colors[colorScheme].surface }]}>
          <Text type="subtitle" style={{ color: Colors[colorScheme].text }}>{vehicle.make} {vehicle.model}</Text>
          <Text style={[styles.price, { color: Colors[colorScheme].primary }]}>
            R {vehicle.price.toLocaleString()}
          </Text>
          <Text type="caption" style={{ color: Colors[colorScheme].textSecondary }}>
            {vehicle.year} &bull; {vehicle.mileage?.toLocaleString() || 'N/A'} km
          </Text>
          <View style={[styles.iconRow, { backgroundColor: Colors[colorScheme].surface }]}>
            <Car size={16} color={Colors[colorScheme].textSecondary} />
            <Text type="caption" style={{ marginLeft: Layout.spacing.xs, color: Colors[colorScheme].textSecondary }}>
              {vehicle.transmission || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    marginVertical: Layout.spacing.sm,
    overflow: 'hidden', // Ensures image corners are rounded with card
    // Platform-specific shadow styles
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
      web: {
        // format: offsetX offsetY blurRadius color
        // Using values from iOS: 0px 1px 2px rgba(0,0,0,0.2)
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: Layout.spacing.md,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: Layout.spacing.xs,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.sm,
  },
});
