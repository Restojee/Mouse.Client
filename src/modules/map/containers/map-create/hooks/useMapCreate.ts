import { Map } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    createMapThunk,
    selectMapImage,
    selectMapName,
    selectMapTags,
    setMapImage,
    setMapName,
    setMapTags,
} from '@/modules/map/containers/map-create/slice';
import { useCallback, useMemo } from 'react';

export const useMapCreate = () => {
    const dispatch = useAppDispatch();
    const name = useAppSelector(selectMapName);
    const image = useAppSelector(selectMapImage);
    const tags = useAppSelector(selectMapTags);

    const onTagsChange = useCallback((tags: Map['tags']): void => {
        dispatch(setMapTags(tags));
    }, []);

    const onImageChange = useCallback((image: string): void => {
        dispatch(setMapImage(image));
    }, []);

    const onNameChange = useCallback((name: Map['name']): void => {
        dispatch(setMapName(name));
    }, []);

    const onMapCreate = useCallback(async (): Promise<void> => {
        dispatch(createMapThunk());
    }, []);

    const isValid = useMemo((): boolean => {
        return name ? name.trim().length > 1 : false;
    }, [name]);

    return {
        name,
        image,
        tags,
        setName: onNameChange,
        setImage: onImageChange,
        setTags: onTagsChange,
        onMapCreate,
        isValid,
    };
};

