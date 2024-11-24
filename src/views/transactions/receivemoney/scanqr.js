import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, Button, Container, Card } from 'react-bootstrap';


const ScanQR = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [scanner, setScanner] = useState(null);

    useEffect(() => {
        const qrScanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 10,
        });

        setScanner(qrScanner);

        return () => {
            if (scanner) {
                scanner.clear();
            }
        };
    }, []);

    const startScan = () => {
        if (scanner) {
            scanner.render(onScanSuccess, onScanError);
        }
    };

    const stopScan = () => {
        if (scanner) {
            scanner.clear();
            setScanResult(null);
            setError(null);
        }
    };

    const onScanSuccess = (decodedText, decodedResult) => {
        setScanResult(decodedText);
        if (scanner) {
            scanner.clear();
        }
    };

    const onScanError = (errorMessage) => {
        setError(`Erreur de scan: ${errorMessage}`);
    };


    return (
        <div className="min-vh-100 bg-gradient" style={{ background: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' }}>
            <Container className="d-flex align-items-center justify-content-center h-100 py-5">
                <Card className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                    <Card.Body>
                        <h1 className="text-center mb-4">Qapital QR Scanner</h1>

                        {error && (
                            <Alert variant="danger" className="mb-3">
                                <AlertCircle className="me-2" size={20} />
                                {error}
                            </Alert>
                        )}

                        <div id="reader" className="mb-3"></div>

                        {!scanResult ? (
                            <Button
                                variant="primary"
                                onClick={startScan}
                                className="w-100 d-flex align-items-center justify-content-center mb-3"
                            >
                                <Camera className="me-2" />
                                Commencer le scan
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                onClick={stopScan}
                                className="w-100 mb-3"
                            >
                                Réinitialiser le scan
                            </Button>
                        )}

                        {scanResult && (
                            <Card className="mt-4 bg-light">
                                <Card.Body>
                                    <h5 className="d-flex align-items-center">
                                        <CheckCircle className="me-2 text-success" />
                                        Résultat du scan :
                                    </h5>
                                    <p className="text-break">{scanResult}</p>
                                </Card.Body>
                            </Card>
                        )}

                        <div className="mt-4 text-center text-muted small">
                            <p>© 2024 Qapital. Tous droits réservés.</p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ScanQR;