import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Home, Search, PlusCircle, UserCircle } from 'lucide-react-native'; // Using lucide-react-native

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Home>['name']; // Use a valid icon name type
  color: string;
  lucideIcon: React.ElementType; // Pass the Lucide icon component
}) {
  const IconComponent = props.lucideIcon;
  return <IconComponent size={26} style={{ marginBottom: -3 }} color={props.color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'dark'; // Default to dark

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].primary, // Use primary for active tint
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].surface,
          borderTopColor: Colors[colorScheme].border,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme].surface,
        },
        headerTintColor: Colors[colorScheme].text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} lucideIcon={Home} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} lucideIcon={Search} />,
        }}
      />
      <Tabs.Screen
        name="add-vehicle"
        options={{
          title: 'List Car',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} lucideIcon={PlusCircle} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} lucideIcon={UserCircle} />,
        }}
      />
    </Tabs>
  );
}
