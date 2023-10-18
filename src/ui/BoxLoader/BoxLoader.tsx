import { LoaderIcon } from '@/svg/loader/LoaderIcon';
import { StyledBoxLoader } from './styles';

type BoxLoaderPropsType = {
    isLoading: boolean
}
export const BoxLoader = (props: BoxLoaderPropsType) => {

    if (!props.isLoading) {
        return null;
    }

    return (
        <StyledBoxLoader>
            <LoaderIcon/>
        </StyledBoxLoader>
    );
};

