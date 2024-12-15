import {NS} from "@ns"

import {
    get_max_threads,
    calculate_growth_threads_required
    } from '/lib/helpers.js';

    import { get_hackable_servers, get_deployable_servers } from "./lib/server_data";
  
  /** @param {NS} ns */
  export async function main(ns) {

    const AVAILABLE_THREADS_DIVISOR = 2;
  
    const minimize_security_script = "/min_max/minimize_security.js"
    const minimize_ram = ns.getScriptRam(minimize_security_script);
  
    const maximize_growth_script = "/min_max/maximize_growth.js"
    const maximize_ram = ns.getScriptRam(maximize_growth_script);


    ns.disableLog("ALL")
  
  
    //irsetn
  
    let i = 0;
    let j = 0;
    while (1) {

        
      let deployable_servers = get_deployable_servers(ns);
      let hackable_servers = get_hackable_servers(ns);


    //   ns.print(JSON.stringify(hackable_servers))
  
      if (i >= Object.keys(hackable_servers).length)
        i = 0;
  
      let target_server = Object.keys(hackable_servers)[i];
      let target_server_details = hackable_servers[target_server];
  
  
      // try {
      //   get_deployment_data(target_server);
      //   // if no error, deployed, don't min_max
      //   i++;
      //   continue;
      // }
      // catch(error) {
      //   // not deployed, min_max can run
      // }
  
      let min_security = target_server_details["min_security"];
  
      let security_over_min = ns.getServerSecurityLevel(target_server) - min_security;
  
      let weaken_threads_required = 0;
      if (security_over_min !== 0) {
        weaken_threads_required = Math.ceil(security_over_min / 0.05);
  
        // UGH
        // TODO: FIX
        weaken_threads_required *= 3;
  
      }
  
      while (weaken_threads_required > 0) {
        if (j >= Object.keys(deployable_servers).length)
        {
            j = 0;
            break;
        }
        let threads = 0;
        let deploy_server = Object.keys(deployable_servers)[j];
        let threads_available = get_max_threads(ns, deploy_server, minimize_ram, AVAILABLE_THREADS_DIVISOR);
        // ns.print(threads_available)
        if (threads_available > weaken_threads_required) {
          threads = weaken_threads_required;
        }
        else {
          threads = threads_available;
        }
        weaken_threads_required -= threads;
        if (threads > 0) {
          ns.scp(minimize_security_script, deploy_server, "home")
          ns.exec(minimize_security_script, deploy_server, threads, target_server);
        }
  
        j++;
        await ns.sleep(20);
      }
  
      let target_server_money = ns.getServerMoneyAvailable(target_server);
      
      let grow_threads_required = 0;
  
      if (target_server_money < target_server_details["max_money"]) {
        try {
            grow_threads_required = calculate_growth_threads_required(ns, target_server, target_server_money, target_server_details["max_money"]);
        }
        catch {
          // just try to run 1000 to get above 0 and hope it sorts itself?
          // ns.tprint(target_server + " has no money")
          grow_threads_required = 100000
        }
        
      
        // UGH
        // TODO: FIX
        grow_threads_required *= 2;
      }
  
      while (grow_threads_required > 0) {
        if (j >= Object.keys(deployable_servers).length)
            {
                j = 0;
                break;
            }
        let threads = 0;
        let deploy_server = Object.keys(deployable_servers)[j];
        let threads_available = get_max_threads(ns, deploy_server, maximize_ram, AVAILABLE_THREADS_DIVISOR);
        if (threads_available > grow_threads_required) {
          threads = grow_threads_required;
        }
        else {
          threads = threads_available;
        }
        grow_threads_required -= threads;
        if (threads > 0) {
          ns.scp(maximize_growth_script, deploy_server, "home")
          ns.exec(maximize_growth_script, deploy_server, threads, target_server);
        }
  
        j++;
        await ns.sleep(20);
      }
  
      i++
  
      await ns.sleep(20)
    }
  
  }