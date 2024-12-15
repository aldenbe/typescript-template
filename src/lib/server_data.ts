import { NS } from "@ns"

import { ALL_SERVERS_PORT } from "./ports/port_constants";
import { get_available_ram } from "/lib/helpers";
import { ServerDetails } from '/lib/helpers'


// TODO: return array of ServerDetails objects instead of object where key is server name

/** @param {NS} ns */
export function get_deployable_servers(ns : NS) : {[key:string]: ServerDetails} {
    const servers = get_all_server_data(ns);
    const deployable_servers : {[key:string]: ServerDetails} = {};

    for (let i = 0; i < Object.keys(servers).length; i++) {
      const server = Object.keys(servers)[i];
      const server_details : ServerDetails = servers[server];
      if (!server_details["has_root_access"] || (server_details["mem"] == 0)) {
        continue;
      }
      const available_ram = get_available_ram(ns, server);
      server_details["available_ram"] = available_ram;
      deployable_servers[server] = server_details;
    }

    // const deployable_servers_string = JSON.stringify(deployable_servers)
    // ns.tprint(deployable_servers_string);
  
    return deployable_servers;
}

/** @param {NS} ns */
export function get_min_maxed_servers (ns : NS) : {[key:string]: ServerDetails} {
  const servers = get_hackable_servers(ns);
  // ns.print(servers)
  // ns.exit();

  const min_maxed_servers : {[key:string]: ServerDetails} = {};
  for (let i = 0; i < Object.keys(servers).length; i++){
      const server = Object.keys(servers)[i]
      const server_details = servers[server]
      if (server_details['max_money'] == ns.getServerMoneyAvailable(server) && server_details['min_security'] == ns.getServerSecurityLevel(server))
      {
          min_maxed_servers[server] = server_details;
      }
  }

  // ns.print(min_maxed_servers)
  return min_maxed_servers;
}
  
  /** @param {NS} ns */
export function get_hackable_servers(ns : NS) : {[key:string]: ServerDetails} {
    const servers = get_all_server_data(ns);
    // ns.print(servers);
    // ns.exit();
    const hackable_servers : {[key:string]: ServerDetails} = {};
  
    for (let i = 0; i < Object.keys(servers).length; i++) {
      const server = Object.keys(servers)[i];
      const server_details : ServerDetails = servers[server];
      if (!server_details["has_root_access"] || (server_details["max_money"] == 0 || server === "home")) {
        continue;
      }
      hackable_servers[server] = server_details;
    }
  
    // ns.print(hackable_servers)
    return hackable_servers;
}

  /** @param {NS} ns */
export function get_all_server_data(ns : NS) : {[key:string]: ServerDetails} {
    const all_server_data = ns.peek(ALL_SERVERS_PORT)
    // ns.print(all_server_data)
    if (typeof all_server_data == "object")
        return all_server_data
    
    return {} 
    // ns.parse(ns.read("/data/servers.json"));s
}

  /** @param {NS} ns */
export function write_server_object(ns : NS, server_object : object, port : number) {
    
    const data_exists = (typeof ns.peek(port) == "object")
    ns.writePort(port, server_object);

    if(data_exists){
        ns.readPort(port)
    }
  
    return;
  
}
