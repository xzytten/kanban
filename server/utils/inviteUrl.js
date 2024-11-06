import crypto from 'crypto';


const secretKey = 'jD241dfoHJSBehHDhj38kjJsd43bdsDf'; 
const algorithm = 'aes-256-cbc'; 
const ivLength = 16; 

 
export const encrypt = (text) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex'); 

    return iv.toString('hex') + ':' + encrypted; 
};

 
export const decrypt = (encryptedText) => {
    const textParts = encryptedText.split(':');  
    const iv = Buffer.from(textParts.shift(), 'hex');  
    const encrypted = textParts.join(':');  

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');  
    decrypted += decipher.final('utf8');  

    return decrypted;  
};