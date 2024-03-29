import { Map, Tag } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    createMapThunk, selectCompletedMapImage,
    selectMapImage,
    selectMapName,
    selectMapTags, setCompletedMapImage,
    setMapImage,
    setMapName,
    setMapTagIds,
} from '@/modules/map/containers/map-create/slice';
import { useCallback, useMemo } from 'react';

export const useMapCreate = () => {
    const dispatch = useAppDispatch();
    const name = useAppSelector(selectMapName);
    const image = useAppSelector(selectMapImage);
    const completedMapImage = useAppSelector(selectCompletedMapImage);
    const tags = useAppSelector(selectMapTags);

    const onTagsChange = useCallback((tags: Tag['id'][]): void => {
        dispatch(setMapTagIds(tags));
    }, []);

    const onImageChange = useCallback((image: string): void => {
        dispatch(setMapImage(image));
    }, []);

    const onCompletedMapImageChange = useCallback((image: string): void => {
        dispatch(setCompletedMapImage(image));
    }, []);

    const onNameChange = useCallback((name: Map['name']): void => {
        dispatch(setMapName(name));
    }, []);

    const onMapCreate = useCallback(async (): Promise<void> => {
        const nameLength = name?.trim().length
        if (nameLength && nameLength < 10) {
            dispatch(createMapThunk());
            dispatch(setMapImage(''));
            dispatch(setCompletedMapImage(''));
            dispatch(setMapName(''));
            dispatch(setMapTagIds([]));
        } else {
            dispatch(setAppMessage({severity: 'error', text: 'Некорректный номер карты'}))
        }
    }, [name]);

    const isValid = useMemo((): boolean => {
        return name ? name.trim().length > 1 : false;
    }, [name]);

    return {
        name,
        image,
        completedMapImage,
        tags,
        setName: onNameChange,
        setImage: onImageChange,
        setTags: onTagsChange,
        setCompletedMapImage: onCompletedMapImageChange,
        onMapCreate,
        isValid,
    };
};

