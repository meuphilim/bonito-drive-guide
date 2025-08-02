import { useState, useEffect } from 'react';
import type { Attraction } from '@/data/attractions';

const API_BASE = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'https://ceea23a8-dfe2-43ad-b181-7e8c53fb474b.preview.emergentagent.com/api';

export interface AttractionFilter {
  category?: string;
  difficulty?: string;
  rating_min?: number;
  rating_max?: number;
  search?: string;
  limit?: number;
  skip?: number;
}

export interface AttractionStats {
  total_attractions: number;
  by_category: Record<string, number>;
  by_difficulty: Record<string, number>;
  average_rating: number;
  most_popular: string[];
}

export const useAttractions = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AttractionStats | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchAttractions = async (filters?: AttractionFilter) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (filters?.category) params.append('category', filters.category);
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.rating_min !== undefined) params.append('rating_min', filters.rating_min.toString());
      if (filters?.rating_max !== undefined) params.append('rating_max', filters.rating_max.toString());
      if (filters?.search) params.append('search', filters.search);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.skip) params.append('skip', filters.skip.toString());

      const url = `${API_BASE}/attractions${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAttractions(data);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch attractions';
      setError(errorMessage);
      console.error('Error fetching attractions:', err);
      
      // Try to load from cache or local data as fallback
      if ('caches' in window) {
        try {
          const cache = await caches.open('bonito-api-v1.0.0');
          const cachedResponse = await cache.match(`${API_BASE}/attractions`);
          if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            setAttractions(cachedData);
            setError('Showing cached data (offline)');
          }
        } catch (cacheErr) {
          console.error('Cache fallback failed:', cacheErr);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAttraction = async (id: string): Promise<Attraction | null> => {
    try {
      const response = await fetch(`${API_BASE}/attractions/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error fetching attraction:', err);
      
      // Try to find in current attractions list as fallback
      const fallback = attractions.find(a => a.id === id);
      return fallback || null;
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/attractions/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStats(data);
      
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Generate basic stats from current attractions as fallback
      if (attractions.length > 0) {
        const categoryCount: Record<string, number> = {};
        const difficultyCount: Record<string, number> = {};
        let totalRating = 0;

        attractions.forEach(attr => {
          categoryCount[attr.category] = (categoryCount[attr.category] || 0) + 1;
          difficultyCount[attr.difficulty] = (difficultyCount[attr.difficulty] || 0) + 1;
          totalRating += attr.rating;
        });

        const fallbackStats: AttractionStats = {
          total_attractions: attractions.length,
          by_category: categoryCount,
          by_difficulty: difficultyCount,
          average_rating: Number((totalRating / attractions.length).toFixed(2)),
          most_popular: attractions
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
            .map(a => a.name)
        };
        
        setStats(fallbackStats);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/attractions/categories`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCategories(data.categories);
      
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Extract categories from current attractions as fallback
      if (attractions.length > 0) {
        const uniqueCategories = [...new Set(attractions.map(a => a.category))];
        setCategories(uniqueCategories);
      }
    }
  };

  const fetchNearbyAttractions = async (lat: number, lon: number, radiusKm = 50) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/attractions/nearby/${lat}/${lon}?radius_km=${radiusKm}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAttractions(data);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch nearby attractions';
      setError(errorMessage);
      console.error('Error fetching nearby attractions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add to favorites (using localStorage for now)
  const addToFavorites = (attractionId: string) => {
    const favorites = JSON.parse(localStorage.getItem('bonito-favorites') || '[]');
    if (!favorites.includes(attractionId)) {
      favorites.push(attractionId);
      localStorage.setItem('bonito-favorites', JSON.stringify(favorites));
    }
  };

  // Remove from favorites
  const removeFromFavorites = (attractionId: string) => {
    const favorites = JSON.parse(localStorage.getItem('bonito-favorites') || '[]');
    const updated = favorites.filter((id: string) => id !== attractionId);
    localStorage.setItem('bonito-favorites', JSON.stringify(updated));
  };

  // Get user favorites
  const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem('bonito-favorites') || '[]');
  };

  // Check if API is available
  const checkAPIHealth = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/health`, { 
        method: 'GET',
        timeout: 5000 
      } as RequestInit);
      return response.ok;
    } catch {
      return false;
    }
  };

  // Initial load
  useEffect(() => {
    fetchAttractions();
  }, []);

  return {
    attractions,
    loading,
    error,
    stats,
    categories,
    fetchAttractions,
    fetchAttraction,
    fetchStats,
    fetchCategories,
    fetchNearbyAttractions,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    checkAPIHealth,
  };
};