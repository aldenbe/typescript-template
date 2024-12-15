import { NS } from "@ns";

import { ALL_SERVERS_PORT } from "../lib/ports/port_constants";

import { write_server_object } from "/lib/server_data";

import { ServerDetails } from "/lib/helpers"


/** @param {NS} ns */
const scan_server = (ns : NS, server : string, scanned_servers: {[key:string]: ServerDetails}, port : number) => {

    const adjacent_servers = ns.scan(server);

    const raw_server_details = ns.getServer(server);

    let pathFromHome = []

    for (let i = 0; i < adjacent_servers.length; i++)
    {
      // eslint-disable-next-line no-prototype-builtins
      if (scanned_servers.hasOwnProperty(adjacent_servers[i]))
      {
        if (
          pathFromHome.length === 0 || 
          scanned_servers[adjacent_servers[i]].pathFromHome.length < pathFromHome.length
        )
          pathFromHome = [...scanned_servers[adjacent_servers[i]].pathFromHome]
      }
    }
    

    pathFromHome.push(server)
  

    const server_details : ServerDetails = {
      "name": server,
      "max_money": raw_server_details["moneyMax"],
      "hack_level": raw_server_details["requiredHackingSkill"],
      "growth": raw_server_details["serverGrowth"],
      "mem": raw_server_details["maxRam"],
      "has_root_access": raw_server_details["hasAdminRights"],
      "min_security": ns.getServerMinSecurityLevel(server),
      "port": port,
      "cores": raw_server_details["cpuCores"],
      // TODO: not working
      "pathFromHome": pathFromHome,
      "ports_required": ns.getServerNumPortsRequired(server)
    }

    // let server_details = {
    //   "max_money": ns.getServerMaxMoney(server),
    //   "hack_level": ns.getServerRequiredHackingLevel(server),
    //   "growth": ns.getServerGrowth(server),
    //   "mem": ns.getServerMaxRam(server),
    //   "has_root_access": ns.hasRootAccess(server),
    //   "min_security": ns.getServerMinSecurityLevel(server),
    //   "port": port
    // }
  
    scanned_servers[server] = server_details;
  
    // for (let i = 0; i < adjacent_servers.length; i++ ) {
    //   let adjacent_server = adjacent_servers[i];
    //   if (scanned_servers[adjacent_server] === undefined) {
    //     scan_server(ns, adjacent_server, scanned_servers);
    //   }
    // }
  
  
    return [adjacent_servers, scanned_servers];
  }
  
  
  
/** @param {NS} ns */
export async function main(ns) {

  let scanned_servers = {};

  const servers_to_scan = ["home"];

  let port = 100;

  while (servers_to_scan.length > 0) {
    const server_to_scan = servers_to_scan.pop();

    let adjacent_servers = [];


    [adjacent_servers, scanned_servers] = scan_server(ns, server_to_scan, scanned_servers, port);

    port += 1;


    for (let i = 0; i < adjacent_servers.length; i++) {
      const adjacent_server = adjacent_servers[i];
      if (typeof scanned_servers[adjacent_server] !== 'object') {
        servers_to_scan.push(adjacent_server)
      }
    }
  }

  // let servers = await ns.run("scan_1_hop.js", 1, "home")
  // ns.write("/data/servers.json", JSON.stringify(scanned_servers), "w");
  write_server_object(ns, scanned_servers, ALL_SERVERS_PORT);
  // ns.print(scanned_servers);
  // ns.print(JSON.stringify(scanned_servers))
  // for (let i = 0; i < servers_1_hop.length; i++ ) {
  //   let server = servers[i];
  //   ns.alert(JSON.stringify(ns.scan(server)));
  //   servers_2_hop[server] = ns.scan(server);
  // }
  //   ns.alert(JSON.stringify(servers_2_hop))
}