export function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {

    return (object[key]);

}