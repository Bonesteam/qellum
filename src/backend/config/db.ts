import mongoose from "mongoose";
import { ENV } from "./env";
import dns from "node:dns";

let isConnected = 0;

export async function connectDB(): Promise<void> {
    if (isConnected) return;

    let mongoUri = ENV.MONGODB_URI;

    if (ENV.NODE_ENV !== "production" && mongoUri.startsWith("mongodb+srv://")) {
        const directUri = process.env.MONGODB_DIRECT_URI?.trim();
        if (directUri) {
            mongoUri = directUri;
        } else {
            try {
                const parsedUri = new URL(mongoUri);
                const database = parsedUri.pathname.replace(/^\//, "") || "Qellum";
                const username = decodeURIComponent(parsedUri.username);
                const password = decodeURIComponent(parsedUri.password);
                const clusterMatch = parsedUri.hostname.match(/^cluster\d+\./i);
                const clusterPrefix = clusterMatch ? parsedUri.hostname : null;

                if (clusterPrefix) {
                    const projectPrefix = parsedUri.hostname.split(".")[0];
                    const shardSuffix = clusterPrefix
                        ? parsedUri.hostname.slice(projectPrefix.length + 1)
                        : parsedUri.hostname;

                    const hosts = ["00", "01", "02"].map(
                        (index) => `ac-xdmtygc-shard-${index}.${shardSuffix}:27017`
                    );

                    for (const host of hosts) {
                        const candidate =
                            `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/` +
                            `${encodeURIComponent(database)}?tls=true&directConnection=true&authSource=admin`;

                        try {
                            const conn = await mongoose.connect(candidate, { serverSelectionTimeoutMS: 5000 });
                            isConnected = conn.connections[0].readyState;
                            if (ENV.NODE_ENV !== "production") {
                                console.log(`MongoDB connected via direct host: ${host}`);
                            }
                            return;
                        } catch {
                            await mongoose.disconnect();
                        }
                    }
                }
            } catch {
                mongoUri = ENV.MONGODB_URI;
            }
        }
    }

    const configuredDnsServers = process.env.MONGODB_DNS_SERVERS
        ?.split(",")
        .map((server) => server.trim())
        .filter(Boolean);
    const dnsServers =
        ENV.NODE_ENV === "production"
            ? configuredDnsServers
            : configuredDnsServers?.length
              ? configuredDnsServers
              : ["1.1.1.1", "8.8.8.8"];

    if (dnsServers?.length) dns.setServers(dnsServers);

    const conn = await mongoose.connect(mongoUri);
    isConnected = conn.connections[0].readyState;
    if (ENV.NODE_ENV !== "production") console.log("MongoDB connected");
}
