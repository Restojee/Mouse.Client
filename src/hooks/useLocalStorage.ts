export function useLocalStorage<T>(key: string) {
  const getValue = () => {
    if (typeof window === "undefined") return undefined;
    try {
      const value = window.localStorage.getItem(key);
      return JSON.parse(value!) as T;
    } catch (err) {
      console.log(err);
    }
  };

  const setValue = (value: T | ((val: T) => T)) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return { getValue, setValue };
}

export default useLocalStorage;
