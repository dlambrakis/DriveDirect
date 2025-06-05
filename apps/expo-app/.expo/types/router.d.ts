/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/add-vehicle` | `/(tabs)/profile` | `/(tabs)/search` | `/_sitemap` | `/add-vehicle` | `/modal` | `/profile` | `/search`;
      DynamicRoutes: `/vehicle/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/vehicle/[id]`;
    }
  }
}
