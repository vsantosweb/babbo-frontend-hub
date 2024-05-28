import { MiddlewareType } from '@/types';
import { adminRoutes } from './admin';
import { managerRoutes } from './manager';

export type RouteProps = {
    name: string,
    path: string,
    private: boolean,
}

const middleware = {
    'auth:admin': adminRoutes,
    'auth:manager': managerRoutes,
}

export const getMiddlewareRoutes = (middlewareName: MiddlewareType) => {
    return middleware[middlewareName]
}

export * from './manager';
export * from './admin';
