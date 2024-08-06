import React, { useState, memo } from 'react';
// import QrReader from 'react-qr-reader';

const ScanQR = memo(() => {
    const [data, setData] = useState('Aucune donnée QR');

    const handleScan = (data) => {
        if (data) {
            setData(data);
        }
    }

    const handleError = (err) => {
        console.error(err);
    }

    return (
        <div>
            {/* <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <p>{data}</p> */}
        </div>
    );
})

export default ScanQR;
