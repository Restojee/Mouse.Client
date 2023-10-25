import {useCallback, useRef} from "react";

export const useDebounce =(callback: (...args: any[]) => void, delay: number) => {
    const timoutRef = useRef<NodeJS.Timeout>();
    return useCallback((...args: any[]) => {
        if (timoutRef.current) {
            clearTimeout(timoutRef.current)
        }
        timoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback]);
}