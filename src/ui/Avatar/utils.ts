export const getInitials = (name: string = ''): string => {
    const words = name.split(' ');

    return words
        .filter((word) => word !== '')
        .map((word) => word[0])
        .join('');
};
