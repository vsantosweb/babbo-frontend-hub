import { RouteProps } from ".";

export const adminRoutes: Array<RouteProps> = [
    { name: 'Home', path: '/', private: true },
    { name: 'Events', path: '/events', private: true },
    { name: 'Profile', path: '/account/profile', private: true },
]
