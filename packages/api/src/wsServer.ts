import ws from 'ws';
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./root";
import { createTRPCContext } from './trpc';

const wss = new ws.Server({
    port: 3001,
});

const handler = applyWSSHandler({
    router: appRouter,
    createContext: createTRPCContext,
    wss
});

wss.on('connection', (ws) => {
    console.log(`++ ws connection ${wss.clients.size}`);


    wss.on("close", () => {
        console.log(`-- ws connection ${wss.clients.size}`);
    });
});

console.log(`ws server listening on port 3001`);

process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    handler.broadcastReconnectNotification();
    wss.close();
})