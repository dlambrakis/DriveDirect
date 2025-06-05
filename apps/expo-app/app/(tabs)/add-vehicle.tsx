import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { PlusCircle, Car, DollarSign, CalendarDays, Palette, Gauge, Settings2, FileText, UploadCloud } from 'lucide-react-native';
// import { supabase } from '@directdrive/supabase-client'; // Assuming setup
// import { useAuth } from '@/hooks/useAuth'; // Assuming auth hook

export default function AddVehicleScreen() {
  const colorScheme = 'dark'; // Assuming dark mode
  // const { user } = useAuth(); // Get authenticated user
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!make || !model || !year || !price || !description) {
      Alert.alert("Missing Fields", "Please fill in all required vehicle details.");
      return;
    }
    // if (!user) {
    //   Alert.alert("Not Authenticated", "You need to be logged in to list a vehicle.");
    //   return;
    // }

    setIsSubmitting(true);
    try {
      // const { data, error } = await supabase.from('vehicles').insert([{
      //   make, model, year: parseInt(year), price: parseFloat(price), description,
      //   seller_id: user.id, 
      //   // ... other fields like mileage, color, transmission, image_urls
      // }]);
      // if (error) throw error;
      
      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert("Success", "Vehicle listed successfully!");
      // Clear form or navigate away
      setMake(''); setModel(''); setYear(''); setPrice(''); setDescription('');
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to list vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const InputRow = ({ label, icon: Icon, value, onChangeText, placeholder, keyboardType = 'default' }: any) => (
    <View style={styles.inputRow}>
      <Icon size={20} color={Colors[colorScheme].accent} style={styles.inputIcon} />
      <Text style={[styles.label, {color: Colors[colorScheme].textSecondary}]}>{label}</Text>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border, backgroundColor: Colors[colorScheme].surface }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme].textSecondary}
        keyboardType={keyboardType as any}
      />
    </View>
  );


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      <Text type="title" style={[styles.title, {color: Colors[colorScheme].text}]}>List Your Vehicle</Text>
      <Text type="caption" style={{color: Colors[colorScheme].textSecondary, textAlign: 'center', marginBottom: Layout.spacing.lg}}>
        Fill in the details below to put your car on the market.
      </Text>

      <InputRow label="Make" icon={Car} value={make} onChangeText={setMake} placeholder="e.g., Toyota" />
      <InputRow label="Model" icon={Car} value={model} onChangeText={setModel} placeholder="e.g., Corolla" />
      <InputRow label="Year" icon={CalendarDays} value={year} onChangeText={setYear} placeholder="e.g., 2020" keyboardType="numeric" />
      <InputRow label="Price (ZAR)" icon={DollarSign} value={price} onChangeText={setPrice} placeholder="e.g., 250000" keyboardType="numeric" />
      {/* Add more fields like Mileage, Color, Transmission, Engine Type using InputRow or custom components */}
      
      <View style={styles.inputRow}>
        <FileText size={20} color={Colors[colorScheme].accent} style={styles.inputIcon} />
        <Text style={[styles.label, {color: Colors[colorScheme].textSecondary}]}>Description</Text>
        <TextInput
          style={[styles.textArea, { color: Colors[colorScheme].text, borderColor: Colors[colorScheme].border, backgroundColor: Colors[colorScheme].surface }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your vehicle, its condition, features..."
          placeholderTextColor={Colors[colorScheme].textSecondary}
          multiline
          numberOfLines={4}
        />
      </View>

      <Pressable style={[styles.uploadButton, {borderColor: Colors[colorScheme].primary}]}>
        <UploadCloud size={24} color={Colors[colorScheme].primary} />
        <Text style={[styles.uploadButtonText, {color: Colors[colorScheme].primary}]}>Upload Photos (Max 10)</Text>
      </Pressable>
      <Text type="caption" style={{color: Colors[colorScheme].textSecondary, textAlign: 'center', marginVertical: Layout.spacing.sm}}>
        High-quality photos attract more buyers!
      </Text>

      <Pressable 
        onPress={handleSubmit} 
        disabled={isSubmitting}
        style={({ pressed }) => [
          styles.submitButton, 
          { backgroundColor: Colors[colorScheme].primary, opacity: pressed || isSubmitting ? 0.7 : 1 }
        ]}
      >
        <PlusCircle size={22} color={Colors[colorScheme].background} />
        <Text style={[styles.submitButtonText, {color: Colors[colorScheme].background}]}>
          {isSubmitting ? "Listing..." : "List My Vehicle"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: Layout.spacing.md,
    paddingBottom: Layout.spacing.xl * 2, // Extra padding for submit button
  },
  title: {
    textAlign: 'center',
    marginBottom: Layout.spacing.sm,
  },
  inputRow: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontSize: 14,
    marginBottom: Layout.spacing.xs,
    marginLeft: Layout.spacing.sm + 20 + Layout.spacing.xs, // Align with input text
  },
  inputIcon: {
    position: 'absolute',
    left: Layout.spacing.sm,
    top: 38, // Adjust based on label and input height
    zIndex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: Layout.borderRadius.md, // Rounded
    paddingLeft: Layout.spacing.sm + 20 + Layout.spacing.md, // Space for icon
    paddingRight: Layout.spacing.sm,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    borderWidth: 1,
    borderRadius: Layout.borderRadius.md, // Rounded
    paddingLeft: Layout.spacing.sm + 20 + Layout.spacing.md, // Space for icon
    paddingRight: Layout.spacing.sm,
    paddingTop: Layout.spacing.sm,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: Layout.borderRadius.md, // Rounded
    marginVertical: Layout.spacing.lg,
  },
  uploadButtonText: {
    marginLeft: Layout.spacing.sm,
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg, // Rounded
    marginTop: Layout.spacing.lg,
  },
  submitButtonText: {
    marginLeft: Layout.spacing.sm,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
