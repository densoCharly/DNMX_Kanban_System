import React, { useEffect, useState } from 'react';
import EscPosEncoder from 'esc-pos-encoder';
import net from 'net';

const PrinterComponent = () => {
    const [ipAddress, setIpAddress] = useState('192.168.192.168'); // Reemplaza con la dirección IP de tu impresora
    const [port, setPort] = useState(9100); // Reemplaza con el puerto de tu impresora (por defecto es 9100)
    const encode = new EscPosEncoder();
  // Función para enviar comandos de impresión a través de Ethernet
  const printTextOverEthernet = () => {
    const client = new net.Socket();

    client.connect(port, ipAddress, () => {
      // Comando para imprimir texto
      const textToPrint = 'Hello, World!\n';

      // Codificar el comando de impresión utilizando 'esc-pos-encoder'
      const command = encode(textToPrint, 'latin1');

      // Enviar el comando a través de la conexión TCP/IP
      client.write(command);

      // Cerrar la conexión después de enviar el comando
      client.end();
    });

    client.on('error', (error) => {
      console.error('Error al conectar con la impresora:', error);
    });
  };

  return (
    <div>
      <button onClick={printTextOverEthernet}>Imprimir a través de Ethernet</button>
    </div>
  );
};

export default PrinterComponent;