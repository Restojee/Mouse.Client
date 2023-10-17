import { LoaderIcon } from '@/svg/loader/LoaderIcon';
import { StyledBox } from '@/ui/Box';

type BoxLoaderPropsType = {
    isLoading: boolean
}
export const BoxLoader = (props: BoxLoaderPropsType) => {

    if (!props.isLoading) {
        return null;
    }

    return (
        <StyledBox
            align={'center'}
            justify={'center'}
            bgColor={'rgba(255, 255, 255, 0.2)'}
            width={'100%'}
            height={'100%'}
            position={'absolute'}
            zIndex={5}
        >
            <LoaderIcon/>
        </StyledBox>
    );
};

