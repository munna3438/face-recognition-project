import { useState, useEffect } from "react";

export type UseStorageType<T> = {
    storedValue: T | null;
    setData: (value: T) => void;
    remove: () => void;
    hasData: () => boolean;
    clear: () => void;
};

function useStorage<T>(key: string, initialValue: T | null = null) {
    const [storedValue, setStoredValue] = useState<T | null>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setData = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    const remove = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(null);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };

    const hasData = (): boolean => {
        return localStorage.getItem(key) !== null;
    };

    const clear = () => {
        try {
            localStorage.clear();
            setStoredValue(null);
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setStoredValue(
                    event.newValue ? JSON.parse(event.newValue) : null
                );
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    return { storedValue, setData, remove, hasData, clear };
}

export default useStorage;