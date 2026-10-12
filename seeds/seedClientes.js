import 'dotenv/config';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import mongoose from 'mongoose';

import Cliente from '../models/Cliente.js';
import Counter from '../models/Counter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rutaSemilla = path.join(
  __dirname,
  '..',
  'documents',
  'clientes.seed.json'
);

async function ejecutar() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida. Revisá tu archivo .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const clientes = JSON.parse(fs.readFileSync(rutaSemilla, 'utf8'));

    // Se parte de cero para que el seed sea idempotente.
    await Cliente.deleteMany({});
    await Counter.findByIdAndUpdate('cliente', { seq: 0 }, { upsert: true });

    // save() uno por uno para que corra el hook que asigna el id numérico.
    for (const datos of clientes) {
      await new Cliente(datos).save();
    }

    console.log(`Semilla cargada: ${clientes.length} clientes`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar la semilla:', error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

ejecutar();
