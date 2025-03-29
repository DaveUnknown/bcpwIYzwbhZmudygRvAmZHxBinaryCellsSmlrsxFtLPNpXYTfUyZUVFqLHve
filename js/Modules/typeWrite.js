export function typeWrite(element, text, speed=200, callback=null, callbackDelay=300) {
    // const callbacks = callback ? [callback] : [];
    const textArray = text.split('');
    element.innerHTML = '';
    textArray.forEach((letter, i) => {
        setTimeout(() => {
            element.innerHTML += letter;
        }, speed * i)
    });

    setTimeout(() => {
        callback && callback();
    }, callbackDelay * textArray.length);
}
