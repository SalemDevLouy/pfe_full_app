'use client';

import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

const API_BASE_URL = '/api/v1';

type ExtendedSession = { backendToken?: string };

export function useApi() {
  const { data: session, status } = useSession();
  const token = (session as ExtendedSession)?.backendToken;

  const fetchWithAuth = useCallback(async (path: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API Error' }));
      throw new Error(error.message || 'API Error');
    }

    return response.json();
  }, [token]);

  const getProducts = useCallback(
    (params: string = '') => fetchWithAuth(`/products?${params}`),
    [fetchWithAuth],
  );

  const getProductBySlug = useCallback(
    (slug: string) => fetchWithAuth(`/products/slug/${slug}`),
    [fetchWithAuth],
  );

  const getRecommendations = useCallback(
    (type: string, params: string = '') => fetchWithAuth(`/user/recommendations/${type}?${params}`),
    [fetchWithAuth],
  );

  const getCart = useCallback(
    () => fetchWithAuth('/user/cart'),
    [fetchWithAuth],
  );

  const addToCart = useCallback(
    (productId: string, quantity: number) =>
      fetchWithAuth('/user/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      }),
    [fetchWithAuth],
  );

  const updateCartItem = useCallback(
    (itemId: string, quantity: number) =>
      fetchWithAuth(`/user/cart/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
      }),
    [fetchWithAuth],
  );

  const removeFromCart = useCallback(
    (itemId: string) =>
      fetchWithAuth(`/user/cart/items/${itemId}`, {
        method: 'DELETE',
      }),
    [fetchWithAuth],
  );

  const getOrders = useCallback(
    () => fetchWithAuth('/user/orders'),
    [fetchWithAuth],
  );

  const createOrder = useCallback(
    (data: any = {}) =>
      fetchWithAuth('/user/cart/checkout', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    [fetchWithAuth],
  );

  return {
    sessionStatus: status,
    getProducts,
    getProductBySlug,
    getRecommendations,
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    getOrders,
    createOrder,
  };
}
