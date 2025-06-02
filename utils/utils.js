export function isWhiteListed(req) {
  // check for host name .
  const hostName = process.env.FRONTEND_URL;
  const ipAddress = process.env.ALLOWED_IPS;
  const localhost = process.env.LOCALHOST_URL;
  console.log(ipAddress);

  const allowedOrigins = [hostName, localhost];

  if (allowedOrigins.includes(req.headers.origin)) {
    return true;
  }

  const allowedIPs = process.env.ALLOWED_IPS?.split(",") || [];
  const clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
  if (allowedIPs.includes(clientIP)) {
    return true;
  }

  if (req.hostname === "localhost" || req.ip === "::1") {
    return true;
  }

  // Always allow OPTIONS preflight requests for CORS
  if (req.method === "OPTIONS") {
    return true;
  }
  // if it matches return true
  // check for IP.
  // if it matches one of the items, return true.
  return false;
}
