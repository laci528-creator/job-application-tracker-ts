import { useEffect, useState } from "react";

export function useLocalStorageSync<T>(key: string, value: T): string | null {

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            throw new Error("Test: localStorage saving failed!");
            localStorage.setItem(key, JSON.stringify(value));
            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                console.error(error.message);
            } else {
                console.error("An unknown error occurred while syncing to localStorage.", error);
                setError("An unknown error occurred while syncing to localStorage.");
            }
        }
    }, [key, value]);

    return error;

}