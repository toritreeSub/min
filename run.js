function To(data, password){
    const secret_passphrase = CryptoJS.enc.Utf8.parse(password);
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key128Bits500Iterations =
        CryptoJS.PBKDF2(secret_passphrase, salt, {keySize: 128 / 8, iterations: 500 });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const options = {iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7};
    const message_text = CryptoJS.enc.Utf8.parse(data);

    const encrypted = CryptoJS.AES.encrypt(message_text, key128Bits500Iterations, options);
    var binary_data = CryptoJS.enc.Hex.stringify(salt);
    binary_data += (',' + CryptoJS.enc.Hex.stringify(iv));
    binary_data += (',' + encrypted);
    return binary_data;
}

function Ret(data,password){
    const array_rawData = data.split(',');

    const salt = CryptoJS.enc.Hex.parse(array_rawData[0]);
    const iv = CryptoJS.enc.Hex.parse(array_rawData[1]);
    const encrypted_data = CryptoJS.enc.Base64.parse(array_rawData[2]);


    const secret_passphrase = CryptoJS.enc.Utf8.parse(password);
    const key128Bits500Iterations =
    CryptoJS.PBKDF2(secret_passphrase, salt, {keySize: 128 / 8, iterations: 500 });

    const options = {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7};

    const decrypted = CryptoJS.AES.decrypt({ciphertext:encrypted_data}, key128Bits500Iterations, options);

    return decrypted.toString(CryptoJS.enc.Utf8);
}