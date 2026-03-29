import './app/env';
import app from './app';
import { AppDataSource } from './app/data-source';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Conexión a la base de datos establecida.');

    app.listen(PORT, () => {
      console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Error al conectarse a la base de datos. Error:', err?.message ?? err);
    console.log('\n-------------------------------------------');
    console.log('Iniciar el servidor sin base de datos');
    console.log('\n-------------------------------------------');
    app.listen(PORT, () => {
      console.log(`Servidor de respaldo ejecutándose en el puerto ${PORT}`);
    });
  });
