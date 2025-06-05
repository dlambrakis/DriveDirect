import React from 'react';
import { StyleSheet, Image, Pressable, ScrollView, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { UserCircle, Edit3, Settings, Car, LogOut, ShieldCheck } from 'lucide-react-native';
// import { useAuth } from '@/hooks/useAuth'; // Assuming auth hook
// import { supabase } from '@directdrive/supabase-client';

// Mock user data - replace with actual data from auth/Supabase
const mockUser = {
  fullName: 'Alex Johnson',
  email: 'alex.j@example.com',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  memberSince: 'January 2024',
  listingsCount: 2,
};

export default function ProfileScreen() {
  const colorScheme = 'dark'; // Assuming dark mode
  // const { user, signOut } = useAuth(); // Use actual auth state
  // const displayUser = user ? { fullName: user.user_metadata?.full_name || 'User', email: user.email, ... } : mockUser;
  const displayUser = mockUser; // Using mock for now

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: async () => {
        // await signOut();
        // Navigate to login or home screen after sign out
        Alert.alert("Signed Out", "You have been signed out successfully.");
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, {backgroundColor: Colors[colorScheme].surface}]}>
        {displayUser.avatarUrl ? (
          <Image source={{ uri: displayUser.avatarUrl }} style={styles.avatar} />
        ) : (
          <UserCircle size={80} color={Colors[colorScheme].primary} />
        )}
        <Text type="title" style={[styles.userName, {color: Colors[colorScheme].text}]}>{displayUser.fullName}</Text>
        <Text type="caption" style={{color: Colors[colorScheme].textSecondary}}>{displayUser.email}</Text>
        <Text type="caption" style={{color: Colors[colorScheme].textSecondary, marginTop: Layout.spacing.xs}}>
          Member since: {displayUser.memberSince}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <ProfileButton icon={Edit3} text="Edit Profile" onPress={() => Alert.alert("Edit Profile", "Navigation to edit profile screen.")} />
        <ProfileButton icon={Settings} text="Account Settings" onPress={() => Alert.alert("Settings", "Navigation to settings screen.")} />
        <ProfileButton icon={Car} text={`My Listings (${displayUser.listingsCount})`} onPress={() => Alert.alert("My Listings", "Navigation to user's listings.")} />
        <ProfileButton icon={ShieldCheck} text="Verification Center" onPress={() => Alert.alert("Verification", "Navigation to verification center.")} />
      </View>
      
      <Pressable 
        onPress={handleSignOut} 
        style={({ pressed }) => [
          styles.signOutButton, 
          { backgroundColor: Colors[colorScheme].accent, opacity: pressed ? 0.7 : 1 }
        ]}
      >
        <LogOut size={20} color={Colors[colorScheme].background} />
        <Text style={[styles.signOutButtonText, {color: Colors[colorScheme].background}]}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const ProfileButton = ({ icon: Icon, text, onPress }: {icon: React.ElementType, text: string, onPress: () => void}) => {
  const colorScheme = 'dark';
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.profileButton, { backgroundColor: Colors[colorScheme].surface, opacity: pressed ? 0.8 : 1 }]}>
      <Icon size={22} color={Colors[colorScheme].primary} />
      <Text style={[styles.profileButtonText, {color: Colors[colorScheme].text}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.md,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Rounded
    marginBottom: Layout.spacing.md,
    borderWidth: 3,
    borderColor: Colors.dark.primary, // Use dark primary for border
  },
  userName: {
    marginBottom: Layout.spacing.xs,
  },
  actionsContainer: {
    padding: Layout.spacing.md,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md, // Rounded
    marginBottom: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dark.border, // Use dark border
  },
  profileButtonText: {
    marginLeft: Layout.spacing.md,
    fontSize: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg, // Rounded
    marginTop: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  signOutButtonText: {
    marginLeft: Layout.spacing.sm,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
