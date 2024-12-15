import {NS} from "@ns"

/** @param {NS} ns */
export async function main(ns) {
    const host = "home";
    if(ns.fileExists("/data/servers.json"))
      ns.rm("/data/servers.json")
    ns.exec("/info/generate_servers_json.js", host)
    await ns.sleep(1000);
    ns.exec("/deployment/init_all.js", host);
    ns.exec("/psrv/buy_servers.js", host);
    await ns.sleep(3000)
    // ns.exec("/deploy_beginner_hack_all.js", host);
    ns.exec("/deployment/deploy_all.js", host);
    ns.exec("/min_max_all.js", host);
    ns.exec("/go/play.js", host);
    // ns.exec("/share/share_all.js", host);
    // ns.exec("/scan_coding_contracts.js", host)
    ns.exec("/stocks/daytrade.js", host);
    
  }
