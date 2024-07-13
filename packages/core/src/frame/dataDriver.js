import {deepGet} from './util';

function getCookie(name) {
    name = name + '=';

    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            cookie = cookie.substring(name.length, cookie.length);
            try {
                return JSON.parse(cookie);
            } catch (e) {
                return cookie;
            }
        }
    }
    return null;
}

function getLocalStorage(name) {
    const value = localStorage.getItem(name);
    if (value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    return null;
}

export function baseDriver(driver, name) {
    if (!name) {
        return null;
    }
    const split = name.split('.');
    let value = driver(split.shift());

    if (!split.length) {
        return value;
    }
    if (value == null) {
        return null;
    }
    return deepGet(value, split);
}

export function cookieDriver(name) {
    return baseDriver(getCookie, name);
}

export function localStorageDriver(name) {
    return baseDriver(getLocalStorage, name);
}