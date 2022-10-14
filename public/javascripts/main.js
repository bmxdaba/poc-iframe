console.log('IFRAME SCRIPTS');

const LOCAL_STORAGE_KEY = 'auth-iframe-test';

const domains = [
    'http://1-poc-iframe-consumer.test',
    'http://2-poc-iframe-consumer.test',
];

(async () => {

    window.addEventListener('message', messageHandler, false);

    let authCredentials = getAuthCredentials();

    if (!authCredentials) {
        console.log('MISSING AUTH CREDENTIALS');
        const res = await fetch('/auth');

        if (!res.ok) {
            throw new Error('ISSUE WITH GETTING CREDENTIALS BY IFRAME');
        }

        const data = await res.json();
        console.log(data);

        authCredentials = data;
        setAuthCredentials(JSON.stringify(data));
    } else {
        console.log('CREDENTIALS FOUND');
        authCredentials = JSON.parse(authCredentials);
        console.log(authCredentials);
    }

    // setCookie(LOCAL_STORAGE_KEY, JSON.stringify(authCredentials), 7);
    window.sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authCredentials));

})();

function messageHandler(event) {
    console.log(event);
    if (!domains.includes(event.origin)) {
        return;
    }

    const {action, value} = event.data;


    if (action === 'getLocalStorageData') {
        return event.source.postMessage({
            action: 'returnLocalStorageData',
            data: JSON.parse(getAuthCredentials()),
        }, '*');
    }

    if (action === 'getSessionStorageData') {
        return event.source.postMessage({
            action: 'returnSessionStorageData',
            data: JSON.parse(window.sessionStorage.getItem(LOCAL_STORAGE_KEY)),
        }, '*');
    }

    if (action === 'getCookieData') {
        return event.source.postMessage({
            action: 'returnCookieData',
            data: getCookie(LOCAL_STORAGE_KEY),
        }, '*');
    }


    if (action === 'save') {
        setAuthCredentials(JSON.stringify(value));
        window.sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
        // setCookie(LOCAL_STORAGE_KEY, JSON.stringify(value), 7);
    }
}

function getAuthCredentials() {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

function setAuthCredentials(value) {
    return window.localStorage.setItem(LOCAL_STORAGE_KEY, value);
}

// function setCookie(name, value, days) {
//     console.log('SET COOKIE');
//     let expires = "";
//
//     if (days) {
//         let date = new Date();
//         date.setTime(date.getTime() + (days*24*60*60*1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//
//     console.log('SET COOKIE 2');
//     document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value) || ''}${expires};SameSite=None; Secure; path=/;`;
//     console.log('SET COOKIE 3');
// }

function getCookie(name) {
    let nameEQ = `${encodeURIComponent(name)}=`;

    console.log(document.cookie);
    let ca = document.cookie.split(';');

    for (let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

// function eraseCookie(name) {
//     document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
// }
