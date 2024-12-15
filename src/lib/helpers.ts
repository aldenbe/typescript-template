import { NS } from "@ns";
import { boolean, number } from "mathjs";

export interface ServerDetails {
  "name" : string
  "max_money": number
  "hack_level": number
  "growth": number
  "mem": number
  "has_root_access": boolean
  "min_security": number
  "port": number
  "cores": number
  "pathFromHome": string[]
  "ports_required": number
  "available_ram"?: number
}

// const home_reserved_ram = 16s

export function can_hack(server_details : ServerDetails) {
  return server_details["max_money"] > 1 && server_details["has_root_access"]
}


/** @param {NS} ns 
 * @param string server hack scripts deployed to
 * @param any data to write (will be converted to json)
 * @return void
*/
export function write_server_deployed(ns : NS, target_server : string, data_to_write : any) {
  ns.write(`/deployed/${target_server}.json`, JSON.stringify(data_to_write))
}

/** @param {NS} ns 
 * @param target_server {string} server deployment data is being checked for
 * @return {any} data written about deployed server
 * @throws {Error} server has no file
*/
export function get_deployment_data(ns : NS, target_server : string) {
  const data = ns.read(`/deployed/${target_server}.json`)
  if ( data == "" ) {
    throw new Error("No deployment data");
  }
  return data;
}

/** @param {NS} ns */
export function get_available_ram(ns : NS, server : string) {
  let available_ram = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
  if (server === "home")
    available_ram = Math.floor(available_ram / 10) * 8;
  if (available_ram < 0)
    available_ram = 0;

  return available_ram;
}

/** @param {NS} ns */
export function get_max_threads(ns : NS, server : string, script_ram : number, available_threads_divisor = 1){
  const available_ram = get_available_ram(ns, server);
  return Math.floor((available_ram / script_ram) / available_threads_divisor);
}

/** @param {NS} ns */
export function calculate_growth_threads_required(ns : NS, target_server : string, current_money : number, max_money : number) {

  if(current_money === 0)
    throw new Error("Infinite")
  //current money * x = max_money
  const growth_multiplier_required = max_money / current_money;
  // TODO: account for cores
  return Math.ceil(ns.growthAnalyze(target_server, growth_multiplier_required, 1));
}
