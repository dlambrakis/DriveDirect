import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TextInput, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import VehicleCard from '@/components/VehicleCard';
import { Vehicle } from '@directdrive/core-types';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { Search as SearchIcon, Filter, X } from 'lucide-react-native';

// Mock data - replace with API call
const allVehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Corolla', year: 2020, price: 280000, description: 'Reliable sedan.', image_urls: ['https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user1', mileage: 45000, transmission: 'Automatic' },
  { id: '2', make: 'Ford', model: 'Ranger', year: 2019, price: 450000, description: 'Powerful bakkie.', image_urls: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user2', mileage: 82000, transmission: 'Automatic' },
  { id: '3', make: 'Volkswagen', model: 'Polo', year: 2021, price: 220000, description: 'City car.', image_urls: ['https://images.pexels.com/photos/2127740/pexels-photo-2127740.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user3', mileage: 30000, transmission: 'Manual' },
  { id: '4', make: 'BMW', model: '3 Series', year: 2018, price: 350000, description: 'Luxury sedan.', image_urls: ['https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user1', mileage: 65000, transmission: 'Automatic' },
  { id: '5', make: 'Hyundai', model: 'i20', year: 2022, price: 200000, description: 'Modern hatchback.', image_urls: ['https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user2', mileage: 15000, transmission: 'Manual' },
];

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(allVehicles);
  const colorScheme = 'dark'; // Assuming dark mode

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredVehicles(allVehicles);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      setFilteredVehicles(
        allVehicles.filter(
          v => v.make.toLowerCase().includes(lowerSearchTerm) || v.model.toLowerCase().includes(lowerSearchTerm)
        )
      );
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <View style={[styles.searchBarContainer, { backgroundColor: Colors[colorScheme].surface, borderColor: Colors[colorScheme].border }]}>
        <SearchIcon size={20} color={Colors[colorScheme].textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border }]}
          placeholder="Search by make or model..."
          placeholderTextColor={Colors[colorScheme].textSecondary}
          value={searchTerm}
          onChangeText={setSearchTerm}
          returnKeyType="search"
        />
        {searchTerm ? (
          <Pressable onPress={() => setSearchTerm('')} style={styles.clearButton}>
            <X size={20} color={Colors[colorScheme].textSecondary} />
          </Pressable>
        ) : null}
        <Pressable style={[styles.filterButton, { backgroundColor: Colors[colorScheme].primary }]}>
          <Filter size={20} color={Colors[colorScheme].background} />
        </Pressable>
      </View>

      {filteredVehicles.length > 0 ? (
        <FlatList
          data={filteredVehicles}
          renderItem={({ item }) => <VehicleCard vehicle={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text type="subtitle" style={{color: Colors[colorScheme].textSecondary}}>No vehicles found.</Text>
          <Text type="caption" style={{color: Colors[colorScheme].textSecondary, textAlign: 'center', marginTop: Layout.spacing.sm}}>Try a different search term or adjust your filters.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.lg, // Rounded
    borderWidth: 1,
    marginVertical: Layout.spacing.md,
  },
  searchIcon: {
    marginHorizontal: Layout.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  clearButton: {
    padding: Layout.spacing.sm,
  },
  filterButton: {
    marginLeft: Layout.spacing.sm,
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  listContentContainer: {
    paddingBottom: Layout.spacing.lg,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
