export { randomId };
function randomId() {
    const uint32 = window.crypto.getRandomValues(new BigUint64Array(1))[0];
    return uint32.toString(16);
}
