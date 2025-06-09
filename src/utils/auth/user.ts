const USER_KEY = 'user';

export const setUser = (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): any | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
};

export const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};