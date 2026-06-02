import dns from "dns";

// Use public DNS servers for MongoDB Atlas SRV resolution when local DNS is unreliable.
// This is required on some Windows setups where Node's default resolver fails for querySrv.

dns.setServers(["8.8.8.8", "1.1.1.1"]);
