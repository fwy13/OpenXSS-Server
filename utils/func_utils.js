function openssl_random_pseudo_bytes(len) {
    return crypto.getRandomValues(new Uint8Array(len));
}

function bin2hex(array) {
    return Array.from(array)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
function generate_state_param() {
    return bin2hex(openssl_random_pseudo_bytes(4));
}
export default generate_state_param;

