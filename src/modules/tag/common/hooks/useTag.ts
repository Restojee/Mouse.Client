import { useCallback } from 'react';

export const useTag = () => {
    const onTagAdd = useCallback((name: string): void => {
        if(name.trim()) {
            alert('добавление тега пока не работает')
        }
    }, [])

    return {
        onTagAdd
    };
};

