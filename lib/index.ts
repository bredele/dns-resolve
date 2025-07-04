import { Resolver, promises as dns } from "node:dns";

export type RRTYPE =
  | "A"
  | "AAAA"
  | "ANY"
  | "CAA"
  | "CNAME"
  | "MX"
  | "NAPTR"
  | "NS"
  | "PTR"
  | "SOA"
  | "SRV"
  | "TLSA"
  | "TXT";

/**
 * Simple wrapper on top of DNS custom resolver.
 */

export default async (
  hostname: string,
  rrType: RRTYPE = "A",
  options: {
    servers?: string[];
    timeout?: number;
    tries?: number;
  } = {}
): Promise<Awaited<ReturnType<typeof dns.resolve>>> => {
  const { servers = [] } = options;
  const resolver = new Resolver(options);
  if (servers.length > 0) {
    resolver.setServers(servers);
  }
  return new Promise((resolve, reject) => {
    resolver.resolve(hostname, rrType, (err, addresses) => {
      if (err) reject(err);
      else resolve(addresses);
    });
  });
};
