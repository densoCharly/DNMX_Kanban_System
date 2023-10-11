import React, { useEffect, useState } from 'react';
import EscPosEncoder from 'esc-pos-encoder';
import QRCode from 'qrcode';

const PrinterComponent = () => {
    const [port, setPort] = useState(null);
    const encode = new EscPosEncoder();

    
    // Función para conectarse con la impresora
    const connectToPrinter = async () => {
        try {
            const usbFilter = { usbVendorId: 'VID_04B8'}; // Reemplaza 0x04B8 con el ID de Vendor de tu impresora
            const serialPort = await navigator.serial.requestPort({ filters: [usbFilter] });
            await serialPort.open({ baudRate: 9600 }); // Ajusta la velocidad según tu impresora

            setPort(serialPort);
        } catch (error) {
            console.error('Error al conectar con la impresora:', error);
        }
    };

    // Función para imprimir texto vertical y el código QR
    const printVerticalTextAndQR = async () => {
        if (!port) {
            console.error('La impresora no está conectada.');
            return;
        }

        const encoder = new TextEncoder();

        // Comando para activar el modo de impresión vertical
        const verticalCommand = '\x1b\x28\x6b\x03\x00\x31\x73\x0F';

        // Texto que se imprimirá verticalmente
        const text = 'Hello, World!';

        // Comando para desactivar el modo de impresión vertical
        const resetCommand = '\x1b\x28\x6b\x03\x00\x30\x73\x0F';

        // Generar el código QR
        const qrCodeData = 'https://tenor.com/view/parrot-party-gif-22113017'; // URL o datos que deseas codificar en el código QR
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        // Comando para imprimir el código QR en la impresora
        const qrCodeCommand = `\x1b\x64\x33\x00`; // Posiciona el código QR en el centro de la impresión
        const qrCodeImageBuffer = Buffer.from(qrCodeImage.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        const qrCodeImageCommand = qrCodeCommand + qrCodeImageBuffer;

        // Combinar todos los comandos
        const command = encode(verticalCommand + text + resetCommand + qrCodeImageCommand, 'latin1');
        await port.write(encoder.encode(command));
    };

    useEffect(() => {
        if (navigator.serial) {
        // La API Web Serial es compatible con el navegador, no conectamos automáticamente
        } else {
            console.error('La API Web Serial no es compatible con este navegador.');
        }
    }, []);

    return (
        <div>
            <button onClick={connectToPrinter}>Conectar con la Impresora</button>
            <button onClick={printVerticalTextAndQR}>Imprimir Texto Vertical y Código QR</button>
        </div>
    );
};

export default PrinterComponent;