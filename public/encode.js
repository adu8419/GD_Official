
function Encrypt(d){var a=CryptoJS.enc.Utf8.parse("093ea2cd94b24dbb");var c=CryptoJS.enc.Utf8.parse(d);var b=CryptoJS.AES.encrypt(c,a,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});return b.toString()}; 
