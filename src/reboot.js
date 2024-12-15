import {NS} from "@ns"

import { get_all_server_data } from "/lib/server_data";
// import {kill_all} from "kill_all.js"

/** @param {NS} ns */
export async function main(ns) {
    const host = "home";

    // TODO: fix kill all
    // await kill_all(ns)

    ns.clearPort(1)
    ns.clearPort(2)
    ns.clearPort(3)
    // if(ns.fileExists("/data/servers.json"), host)
    //   ns.rm("/data/servers.json")
    // let deployed = ns.ls(host, "/deployed/")
    // for (let i = 0; i < deployed.length; i++){
    //     ns.rm(`/${deployed[i]}`, host)
    // }
    ns.run("/info/generate_servers_json.js")
    await ns.sleep(20)

    const all_servers = get_all_server_data(ns);

    for (let i = 0; i < Object.keys(all_servers).length; i++) {
      let server = Object.keys(all_servers)[i]
      let port = all_servers[server]["port"]
      ns.killall(server, true)
      // ns.print(ns.peek(port))
      ns.clearPort(port);
    }
    
    // TODO: clear all ports
    await ns.sleep(20);
    ns.run("/deployment/init_all.js");
    ns.run("/psrv/buy_servers.js");
    await ns.sleep(300)
    ns.run("/daemon_testing.js");
    ns.run("/go/play.js");
    // ns.run("/share/share_all.js", host);
    // ns.run("/scan_coding_contracts.js")
    ns.run("/stocks/daytrade.js");
    
  }
