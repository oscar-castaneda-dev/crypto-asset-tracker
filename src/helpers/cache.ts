interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

export const cache = {
  set: <T>(key: string, data: T): void => {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },
  get: <T>(key: string): T | null => {
    try {
      const cachedData = localStorage.getItem(key);
      if (!cachedData) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cachedData);
      const isExpired = Date.now() - cacheItem.timestamp > CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      try {
        localStorage.removeItem(key);
      } catch (e) {}
      return null;
    }
  },
};
