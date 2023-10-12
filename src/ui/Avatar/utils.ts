export const getInitials = (name: string = ''): string => {
    if (name) {
        const words = name.split(' ');

        return words
            .filter((word) => word !== '')
            .map((word) => word[0])
            .join('');
    } else {
        return 'A';
    }
};
