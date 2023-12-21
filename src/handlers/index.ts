import { IncomingMessage, ServerResponse } from "http";
import { createProxyServer } from "http-proxy";
import { serversMap } from "../serverMap";
import express from 'express';
import http from 'http';

const proxy = createProxyServer({});

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
    const hostname = req.headers.host?.split(':')[0];

    const serverName = Object.keys(serversMap).find(key => serversMap[key].host === hostname);
    
    if (!serverName) {
        return res.writeHead(404).end('Address not found');
    }

    proxy.web(req, res, { target: `http://localhost:${serversMap[serverName].port}` })
};

export const initHttpServer = () => {
    for (const [serverName, serverOptions] of Object.entries(serversMap)) {
        const app = express();
      
        /** Все сервера лежат на одной машине, поэтому запрещаем прямой доступ к http серверам извне */
        // const allowedOriginHost = 'localhost';
      
        // app.use((req, res, next) => {
        //   const requestHost = req.headers.host.split(':')[0]; 
        //   if (requestHost === allowedOriginHost) {
        //     next();
        //   } else {
        //     res.status(403).send('Доступ запрещен');
        //   }
        // });  
      
        app.get('/', (req, res) => {
          res.status(200).send(`Hello ${serverName} API`);
        }); 

        app.get('/api', (req, res) => {
            res.status(200).send(`${serverName} api answered OK`);
        }); 
      
        const httpServer = http.createServer(app);
      
        const port = serverOptions.port;
      
        httpServer.listen(port, () => {
          console.log(`Server [ ${serverName} ] is running on port ${port}`);
        });
      }
}
