# dns-resolve

DNS resolution with timeout and retry control

## Installation

```sh
npm install dns-resolve
```

## API

`resolve(hostname[, rrtype, options])`:

- `hostname` <string> Host name to resolve.
- `rrtype` <string> Resource record type. Default: 'A'.
- `options` <Object>
  - `timeout` <integer> Query timeout in milliseconds, or -1 to use the default timeout.
  - `tries` <integer> The number of tries the resolver will try contacting each name server before giving up. Default: 4
  - `servers` <string[]> array of RFC 5952 formatted addresses

## Usage

```ts
import resolve from "dns-resolve";

// resolve A resource record type by default
await resolve("example.com");
```
