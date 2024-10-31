import { MiddlewareType } from '@/types';
import { adminRoutes } from './admin';
import { managerRoutes } from './manager';
import { storeRoutes } from './store';

export type RouteProps = {
    name: string,
    path: string,
    private: boolean,
}

export const middleware = {
    'auth:admin': adminRoutes,
    'auth:manager': managerRoutes,
    'auth:customer': storeRoutes,
}

export const getMiddlewareRoutes = (middlewareName: MiddlewareType) => {
    return middleware[middlewareName]
}

export * from './manager';
export * from './admin';
