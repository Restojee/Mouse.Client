import { SvgIconPropsType } from '@/svg/common/types';

export const LeftSidebarArrowIcon = (props: SvgIconPropsType) => {

    return (
        <svg
            width={props.size || '24px'}
            height={props.size || '24px'}
            style={{ transform: props.rotate || 'rotate(0)', transition: '0.8s' }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={props.color || '#CCD2E3'}
                d="M16.7074 11.7952L8.25877 5.88114C7.72855 5.50998 7 5.88931 7 6.53652V17.4635C7 18.1107 7.72855 18.49 8.25877 18.1189L16.7074 12.2048C16.8496 12.1053 16.8496 11.8947 16.7074 11.7952Z"
            />
        </svg>
    );
};

