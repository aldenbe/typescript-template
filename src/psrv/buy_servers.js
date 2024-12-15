import { NS } from "@ns";



/** @param {NS} ns */
export async function main(ns) {
    let ram = 8;
  
    let i = ns.getPurchasedServers().length;
  
    const populate_server_list_script = "/info/generate_servers_json.js"
  
    while (i < ns.getPurchasedServerLimit() ) {
          // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            let hostname = ns.purchaseServer("psrv-" + i, ram);
            // ns.scp(populate_server_list_script, hostname, "home")
            // ns.exec(populate_server_list_script, hostname, 1);
            ns.exec(populate_server_list_script, "home", 1);
            ++i;
        }
        await ns.sleep(1000);
    }
    ns.spawn("/psrv/upgrade_servers.js")
  }