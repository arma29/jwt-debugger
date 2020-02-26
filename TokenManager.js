function getTokenObject(token){
    let splittedToken = token.split('.');
    let obj = {
        header : JSON.parse(atob(splittedToken[0])),
        payload : JSON.parse(atob(splittedToken[1])),
        security : splittedToken[2],
    };
    return obj;
}

function isTokenValid(token){
    const splittedToken = token.split('.');
    return isBase64URLEncoded(splittedToken) 
        && isWellFormated(splittedToken);
}

function isWellFormated(splittedToken){
    if(splittedToken.length != 3){
        return false;
    }
    return true;
}

function isBase64URLEncoded(splittedToken){
    let result = true;
    try { 
        atob(toBase64(splittedToken[0]));
        atob(toBase64(splittedToken[1]));
        atob(toBase64(splittedToken[2]));
    } catch (error) {
        result = false;
    }
    return result;
}


function isSignatureValid(token,secret){
    const splittedToken = token.split('.');
    let base64Signature = toBase64(splittedToken[2]);
    let hash = CryptoJS.HmacSHA256(splittedToken[0] + '.' + splittedToken[1], secret);
    let base64Hash = CryptoJS.enc.Base64.stringify(hash);
    return base64Signature === base64Hash;
}

/**
 * Converts Base64UrlEncoded into Base64Encoded
 * @param {*} base64url 
 */
function toBase64(base64url) {
    // Replace non-url compatible chars with base64 standard chars
    base64url = base64url
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    // Pad out with standard base64 required padding characters
    var pad = base64url.length % 4;
    if(pad) {
      if(pad === 1) {
        throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
      }
      base64url += new Array(5-pad).join('=');
    }

    return base64url;
}