type SvgIconProps = {
    size: string | number,
    height: string,
    color: string | undefined,
    rotate: string,
    onClick: () => void
}

export type SvgIconPropsType = Partial<SvgIconProps>
