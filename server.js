const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const makeString = require('./src/makeString');
const makeFile = require('./src/makeFile');

const app = express();
const PORT = 7600;

app.use(cors());
app.use(express.json());

const qrisStatis = ""; //wajib isi

const qrisFolder = path.join(__dirname, 'qris');
if (!fs.existsSync(qrisFolder)) {
    fs.mkdirSync(qrisFolder, { recursive: true });
}

app.get('/generate-qris', (req, res) => {
    let nominal = parseInt(req.query.nominal) || 5000; //default 5000
    let taxtype = req.query.taxtype || null;
    let fee = parseInt(req.query.fee) || 0;
    let qrisStatisParam = req.query.qrisStatis || qrisStatis;

    if (taxtype === 'p') {  
        fee = Math.round((nominal * fee) / 100);
    } else if (taxtype === 'r') {  
        fee = fee;
    } else {  
        fee = 0;
    }

    let totalNominal = nominal + fee;

    totalNominal = totalNominal.toString();

    console.log(JSON.stringify({
        nominal, fee, total_nominal: totalNominal, type: typeof totalNominal
    }, null, 2));

    try {        
        const qrisDinamisString = makeString(qrisStatisParam, { nominal: totalNominal });

        const outputPath = path.join(qrisFolder, `qris_${nominal}_${Date.now()}.png`);
        makeFile(qrisStatisParam, { nominal: totalNominal, path: outputPath });

        res.json({
            status: "success",
            nominal: nominal,
            fee: fee,
            total_nominal: totalNominal,
            //qris_string: qrisDinamisString,
            qr_code_url: `https://qris.lunaticsm.web.id/qris/${path.basename(outputPath)}`
        });        
    } catch (error) {
        console.error("Error saat membuat QRIS:", error);
        res.status(500).json({ status: "error", message: "Gagal membuat QRIS", error: error.toString() });
    }
});

app.use('/qris', express.static(qrisFolder));

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server berjalan di http://127.0.0.1:${PORT}`);
});
