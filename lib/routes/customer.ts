import { RouteProps } from ".";

export const customerRoutes: Array<RouteProps> = [
    { name: 'Babbo - Minhas Compras', path: `${process.env.NEXT_PUBLIC_CLIENT_URL}/minhas-compras`, private: true },
    { name: 'Babbo Store', path: '/payment', private: true },
]
