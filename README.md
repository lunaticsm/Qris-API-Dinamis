# How to run?
Install all and then
Set data qris on server.js

```bash
node server.js
```

Get Url example
```
https://127.0.0.1:{port}/generate-qris?nominal=1000&taxtype=p&fee=5
```
Get Url example using different qris data
```
https://127.0.0.1:{port}/generate-qris?nominal=10000&taxtype=p&fee=5&qrisStatis=00020101021126570011ID.DANA.WWW011893600915334652057802093465205780303UMI51440014ID.CO.QRIS.WWW0215ID10222245683710303UMI5204549953033605802ID5913Lala%27s%20Store%206011Kab.%20Bekasi61051732063045A8A00020101021126570011ID.DANA.WWW011893600915334652057802093465205780303UMI51440014ID.CO.QRIS.WWW0215ID10222245683710303UMI5204549953033605802ID5913Lala%27s%20Store%206011Kab.%20Bekasi61051732063045A8A
```


# Qris Static to Qris Dynamic
Make static QRIS to dynamic QRIS

## Instalation
```bash
npm i qris-dinamis
```

## Import Module
```javascript
// CommonJS
const qrisDinamis = require('qris-dinamis');

// ES Modules
import qrisDinamis from 'qris-dinamis'

```

## Usage
### Output String
```javascript
const qris = '00020101021126570011ID........';
const result = qrisDinamis.makeString(qris, { nominal: '5000' });
```
### Ouput File
```javascript
const qris = '00020101021126570011ID........';
const result = qrisDinamis.makeFile(qris, { nominal: '5000' });
// or base64
const result = qrisDinamis.makeFile(qris, { nominal: '5000', base64: true });
// custom path
const result = qrisDinamis.makeFile(qris, { nominal: '5000', path: 'output/qris.jpg' });
```

## Parameter List
| Param    | Required | Description                                                                 |
|----------|----------|-----------------------------------------------------------------------------|
| `nominal` | true     | The nominal amount that will be made into dynamic Qris.                      |
| `taxtype` | false    | There are 2 types of taxtypes: `r` for rupiah and `p` for percent.            |
| `fee`     | false    | The amount of fee tax to be included in nominal. If percent, it will be multiplied by the value percent. |
| `base64`  | false    | Output a base64 string from a dynamic Qris image file. Only works in `makeFile`. |
| `path`    | false    | Custom output path resulting from dynamic Qris image generation. Only works in `makeFile`. |

## Author
[Rachma Azis](https://razisek.com)