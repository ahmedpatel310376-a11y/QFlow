import http from "http";
import { Server } from "socket.io";
import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { initFirebase } from "./services/notificationService";

async function main(): Promise<void> {
  await connectDB();
  await initFirebase();

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: env.clientUrl,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("queue:join", (queueId: string) => {
      socket.join(`queue:${queueId}`);
    });

    socket.on("queue:leave", (queueId: string) => {
      socket.leave(`queue:${queueId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  app.set("io", io);

  httpServer.listen(env.port, () => {
    console.log(`QFlow backend running at http://localhost:${env.port}`);
    console.log(`Health: http://localhost:${env.port}/api/health`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
