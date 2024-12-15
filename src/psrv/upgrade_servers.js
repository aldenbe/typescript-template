import { NS } from "@ns";



/** @param {NS} ns */
export async function main(ns) {
    let ram = 8;
  
    while (ram <= ns.getPurchasedServerMaxRam()) {
      // Iterator we'll use for our loop
      let servers = ns.getPurchasedServers();
  
      for( let i = 0; i < servers.length; i++ ) {
        let server = servers[i];
        if(ns.getServerMaxRam(server) >= ram) 
          continue;
  
        while (true) {
          if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerUpgradeCost(server, ram)) {
            ns.upgradePurchasedServer(server, ram);
            break;
          }
          await ns.sleep(100)
        }
  
      }
      ram = ram * 2;
      if (ram > ns.getPurchasedServerMaxRam() && ram < ns.getPurchasedServerMaxRam()*2)
        ram = ns.getPurchasedServerMaxRam();
      await ns.sleep(100)
    }
  }