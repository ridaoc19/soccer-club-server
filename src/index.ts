import './dotenv';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a la base de datos establecida.');

    app.listen(PORT, () => {
      console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(
      'Error al conectarse a la base de datos. Asegúrate de que PostgreSQL se esté ejecutando en el puerto configurado y de que la base de datos exista.. Error:',
      err?.message ?? err,
    );
    console.log('\n-------------------------------------------');
    // Iniciar el servidor sin base de datos para la vista previa del frontend en caso de que la base de datos falle localmente
    console.log(
      'Iniciar el servidor sin base de datos solo para permitir que las API front-end respondan (stub en memoria).',
    );
    console.log('\n-------------------------------------------');
    app.listen(PORT, () => {
      console.log(`Servidor de respaldo ejecutándose en el puerto ${PORT}`);
    });
  });
