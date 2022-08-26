export const isValid = (data: any) => {
    if (data === '' || data === undefined || data === null) {
        return true;
    }
    return false;
};
