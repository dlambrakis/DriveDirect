import { StyleSheet, FlatList, Pressable, Image, Platform } from 'react-native'; // Added Platform
import { Text, View } from '@/components/Themed';
import VehicleCard from '@/components/VehicleCard';
import { Vehicle } from '@directdrive/core-types';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Car, Search as SearchIcon } from 'lucide-react-native';

// Mock data - replace with API call
const featuredVehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Corolla', year: 2020, price: 280000, description: 'Reliable sedan.', image_urls: ['https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user1', mileage: 45000, transmission: 'Automatic' },
  { id: '2', make: 'Ford', model: 'Ranger', year: 2019, price: 450000, description: 'Powerful bakkie.', image_urls: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user2', mileage: 82000, transmission: 'Automatic' },
  { id: '3', make: 'Volkswagen', model: 'Polo', year: 2021, price: 220000, description: 'City car.', image_urls: ['https://images.pexels.com/photos/2127740/pexels-photo-2127740.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user3', mileage: 30000, transmission: 'Manual' },
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = 'dark'; // Assuming dark mode

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: Colors[colorScheme].surface, borderColor: Colors[colorScheme].border }]}>
        <Car size={32} color={Colors[colorScheme].primary} />
        <Text type="title" style={{ color: Colors[colorScheme].text, marginLeft: Layout.spacing.sm }}>DriveDirect</Text>
      </View>

      {/* Hero/Search Call to Action */}
      <View style={[styles.heroSection, { backgroundColor: Colors[colorScheme].primary }]}>
        <Text type="title" style={{ color: Colors[colorScheme].background, textAlign: 'center', marginBottom: Layout.spacing.sm }}>
          Find Your Next Ride
        </Text>
        <Text style={{ color: Colors[colorScheme].background, textAlign: 'center', marginBottom: Layout.spacing.md }}>
          Browse thousands of P2P car listings.
        </Text>
        <Pressable onPress={() => router.push('/(tabs)/search')} style={[styles.searchButton, { backgroundColor: Colors[colorScheme].background }]}>
          <SearchIcon size={20} color={Colors[colorScheme].primary} />
          <Text style={[styles.searchButtonText, { color: Colors[colorScheme].primary }]}>Search Cars</Text>
        </Pressable>
      </View>
      
      <View style={styles.contentContainer}>
        <Text type="subtitle" style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>Featured Listings</Text>
        <FlatList
          data={featuredVehicles}
          renderItem={({ item }) => <VehicleCard vehicle={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Layout.spacing.lg }}
        />
      </View>
       <Link href="/modal" asChild>
        <Pressable style={({ pressed }) => [styles.infoButton, { opacity: pressed ? 0.7 : 1, backgroundColor: Colors[colorScheme].accent }]}>
          <Text style={{color: Colors[colorScheme].background, fontWeight: 'bold'}}>Show Info Modal</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    // Assuming header might need a subtle shadow too, adding for completeness based on design principles
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  heroSection: {
    padding: Layout.spacing.lg,
    alignItems: 'center',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg, // Rounded
  },
  searchButtonText: {
    marginLeft: Layout.spacing.sm,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  sectionTitle: {
    marginVertical: Layout.spacing.md,
  },
  infoButton: {
    position: 'absolute',
    bottom: Layout.spacing.lg,
    right: Layout.spacing.lg,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0px 2px 2.62px rgba(0,0,0,0.23)',
      },
    }),
  }
});
