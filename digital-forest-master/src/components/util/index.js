/**
 * 字符压缩
 * @return {{encode: ((function(*): (string))|*), decode: (function(*): number)}}
 */
const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const base62Zip = {
    encode: function encode(int) {
        if (int === 0) {
            return CHARSET[0];
        }
        let temp = int;
        let res = "";
        while (temp > 0) {
            res = CHARSET[temp % 62] + res;
            temp = Math.floor(temp / 62);
        }
        return res;
    },
    decode: function decode(str) {
        let res = 0;
        const length = str.length;
        let char = "";
        for (let i = 0; i < length; i++) {
            char = str.charCodeAt(i);
            if (char < 58) {
                // 0-9
                char = char - 48;
            } else if (char < 91) {
                // A-Z
                char = char - 29;
            } else {
                // a-z
                char = char - 87;
            }
            res += char * Math.pow(62, length - i - 1);
        }
        return res;
    },
};

/**
 * 生成要素ID
 * @return {string}
 */
export function getUuid() {
    const time = base62Zip.encode(Date.now());
    const random = base62Zip.encode(Math.random().toString().slice(2));
    return time + random;
}