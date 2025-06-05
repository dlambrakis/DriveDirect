import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Vehicle } from '@directdrive/core-types';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { Car, DollarSign, CalendarDays, Palette, Gauge, Settings2, MessageSquare, Phone, UserCircle, MapPin } from 'lucide-react-native';

// Mock data - replace with API call
const mockVehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Corolla', year: 2020, price: 280000, description: 'Immaculate condition Toyota Corolla 1.8 XS CVT. Full service history with agents. Low mileage for its year. Features include reverse camera, cruise control, Apple CarPlay/Android Auto, and alloy wheels.', image_urls: ['https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], seller_id: 'user1', mileage: 45000, color: 'Silver', engine_type: 'Petrol', transmission: 'Automatic' },
  { id: '2', make: 'Ford', model: 'Ranger', year: 2019, price: 450000, description: 'Ford Ranger 2.0SiT Double Cab Hi-Rider XLT FX4. This bakkie is a beast, ready for any adventure.', image_urls: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], seller_id: 'user2', mileage: 82000, color: 'Blue', engine_type: 'Diesel', transmission: 'Automatic' },
];
const mockSeller = { id: 'user1', name: 'Sarah Miller', avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300', location: 'Cape Town' };


export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = 'dark';

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundVehicle = mockVehicles.find(v => v.id === id);
      if (foundVehicle) {
        setVehicle(foundVehicle);
        // Simulate fetching seller
        if (foundVehicle.seller_id === mockSeller.id) {
          setSeller(mockSeller);
        }
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={Colors[colorScheme].primary} /></View>;
  }

  if (!vehicle) {
    return <View style={styles.centered}><Text>Vehicle not found.</Text></View>;
  }

  const DetailItem = ({ icon: Icon, label, value }: {icon: React.ElementType, label: string, value: string | number | undefined}) => (
    <View style={styles.detailItem}>
      <Icon size={18} color={Colors[colorScheme].accent} style={{marginRight: Layout.spacing.sm}} />
      <Text style={{color: Colors[colorScheme].textSecondary, flexShrink: 1}}>{label}: <Text style={{fontWeight: '600', color: Colors[colorScheme].text}}>{value || 'N/A'}</Text></Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: `${vehicle.make} ${vehicle.model}` }} />
      
      {vehicle.image_urls && vehicle.image_urls.length > 0 && (
        <Image source={{ uri: vehicle.image_urls[0] }} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.content}>
        <Text type="title" style={[styles.titleText, {color: Colors[colorScheme].text}]}>{vehicle.make} {vehicle.model}</Text>
        <Text style={[styles.priceText, {color: Colors[colorScheme].primary}]}>R {vehicle.price.toLocaleString()}</Text>
        
        <View style={styles.detailsGrid}>
          <DetailItem icon={CalendarDays} label="Year" value={vehicle.year} />
          <DetailItem icon={Gauge} label="Mileage" value={`${vehicle.mileage?.toLocaleString()} km`} />
          <DetailItem icon={Palette} label="Color" value={vehicle.color} />
          <DetailItem icon={Settings2} label="Engine" value={vehicle.engine_type} />
          <DetailItem icon={Car} label="Transmission" value={vehicle.transmission} />
          {seller && <DetailItem icon={MapPin} label="Location" value={seller.location} />}
        </View>

        <Text type="subtitle" style={[styles.sectionTitle, {color: Colors[colorScheme].text}]}>Description</Text>
        <Text style={[styles.descriptionText, {color: Colors[colorScheme].textSecondary}]}>{vehicle.description}</Text>

        {seller && (
          <>
            <Text type="subtitle" style={[styles.sectionTitle, {color: Colors[colorScheme].text, marginTop: Layout.spacing.lg}]}>Seller Information</Text>
            <View style={[styles.sellerCard, {backgroundColor: Colors[colorScheme].surface, borderColor: Colors[colorScheme].border}]}>
              {seller.avatarUrl ? (
                <Image source={{uri: seller.avatarUrl}} style={styles.sellerAvatar} />
              ) : (
                <UserCircle size={50} color={Colors[colorScheme].textSecondary} style={{marginRight: Layout.spacing.md}}/>
              )}
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors[colorScheme].text}}>{seller.name}</Text>
                <Text style={{color: Colors[colorScheme].textSecondary}}>Member since {mockUser.memberSince}</Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.actionsContainer}>
          <Pressable style={({pressed}) => [styles.actionButton, {backgroundColor: Colors[colorScheme].primary, opacity: pressed ? 0.8 : 1}]}>
            <MessageSquare size={20} color={Colors[colorScheme].background} />
            <Text style={[styles.actionButtonText, {color: Colors[colorScheme].background}]}>Contact Seller</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.actionButton, {backgroundColor: Colors[colorScheme].secondary, opacity: pressed ? 0.8 : 1, marginTop: Layout.spacing.sm}]}>
            <Phone size={20} color={Colors[colorScheme].background} />
            <Text style={[styles.actionButtonText, {color: Colors[colorScheme].background}]}>Show Phone (XXX)</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: Layout.window.width * 0.75, // Aspect ratio 4:3
  },
  content: {
    padding: Layout.spacing.md,
  },
  titleText: {
    marginBottom: Layout.spacing.xs,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.md,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%', // Two items per row
    marginBottom: Layout.spacing.sm,
    paddingRight: Layout.spacing.sm, // for spacing between items
  },
  sectionTitle: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    marginTop: Layout.spacing.sm,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Layout.spacing.md,
  },
  actionsContainer: {
    marginTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
  },
  actionButtonText: {
    marginLeft: Layout.spacing.sm,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
