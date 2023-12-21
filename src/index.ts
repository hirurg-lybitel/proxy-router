import https, { ServerOptions } from 'https';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { handleRequest, initHttpServer } from './handlers';

dotenv.config();

const privateKey = fs.readFileSync(path.join(__dirname, '../ssl', process.env.SSL_PRIVATE));
const certificate = fs.readFileSync(path.join(__dirname, '../ssl', process.env.SSL_CERTIFICATE));
const publicKey = fs.readFileSync(path.join(__dirname, '../ssl', process.env.SSL_PUBLIC));

const options: ServerOptions = {
  key: privateKey,
  cert: certificate,
  ca: publicKey
};

const httpsServer = https.createServer(options, handleRequest);
httpsServer.listen(443, () => console.log(`👀 Server is running`));

initHttpServer();
