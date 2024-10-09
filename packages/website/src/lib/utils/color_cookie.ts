export const DEFAULT_COLOR = '#ff0000';

export function setCookieColor(color: string) {
    document.cookie = `color=${color}`;
}

export function getCookieColor(): string {
    return document.cookie.split('; ').find(row => row.startsWith('color='))?.split('=')[1] || DEFAULT_COLOR;
}