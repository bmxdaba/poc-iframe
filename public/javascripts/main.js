console.log('Testing script in layout');
const LOCAL_STORAGE_KEY = 'auth-iframe-test';

(async () => {

    window.addEventListener('DOMContentLoaded', async () => {

        let authCredentials = getAuthCredentials();

        if (!authCredentials) {
            console.log('MISSING AUTH CREDENTIALS');
            const res = await fetch('/auth');

            if (!res.ok) {
                throw new Error('ISSUE WITH GETTING CREDENTIALS BY IFRAME');
            }

            const data = await res.json();
            console.log(data);

            setAuthCredentials(JSON.stringify(data));
        } else {
            console.log('CREDENTIALS FOUND');
            console.log(JSON.parse(getAuthCredentials()));
        }

    });
})();



function getAuthCredentials() {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

function setAuthCredentials(value) {
    return window.localStorage.setItem(LOCAL_STORAGE_KEY, value);
}
