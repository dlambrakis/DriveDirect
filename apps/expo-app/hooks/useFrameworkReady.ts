// From mobile_app_instructions example structure
// This hook can be used to ensure fonts or other async operations are complete
// before rendering parts of the app that depend on them.
// For this project, font loading is handled in _layout.tsx.
// This file is included for completeness based on the example structure.

import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
// You might import specific fonts if you load them here instead of _layout.tsx
// import { Ionicons } from '@expo/vector-icons';

export function useFrameworkReady(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepareFramework() {
      try {
        // Pre-load fonts, make any API calls, or perform other setup.
        // Example: await Font.loadAsync({ ...Ionicons.font });
        // For this project, major font loading is in app/_layout.tsx.
        // This hook can be expanded for other global async setup.
        console.log('Framework ready hook: No specific async tasks configured here.');
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepareFramework();
  }, []);

  return isReady;
}
