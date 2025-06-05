// Example: Shared type for a User
export interface UserProfile {
  id: string;
  username?: string;
  avatar_url?: string;
  // Add other user-related fields
}

// Example: Shared type for a Vehicle
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description?: string;
  image_urls?: string[];
  seller_id: string;
  // Add other vehicle-related fields
}

// Add more shared types as needed
