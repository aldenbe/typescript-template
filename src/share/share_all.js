import { NS } from "@ns"

import { 
    get_max_threads
    } from '/lib/helpers.js';

import { get_deployable_servers } from "../lib/server_data";
  
  /** @param {NS} ns */
export async function main(ns) {
  
    const share_script = "/share/share.js"
    const share_ram = ns.getScriptRam(share_script);
    while (1) {
  
      let deployable_servers = get_deployable_servers(ns);

      for (let i = 0; i < Object.keys(deployable_servers).length; i++) {
        let deploy_server = Object.keys(deployable_servers)[i];
        if (deploy_server == "home")
            continue;
        let threads_available = get_max_threads(ns, deploy_server, share_ram);

        let threads = Math.floor(threads_available  * 3 / 4);
        // ns.print(threads)
        if (threads == 0)
            continue;

        ns.scp(share_script, deploy_server, "home");

        ns.exec(share_script, deploy_server, threads);
      }
  
  
      

      

      await ns.sleep (11000)

    }
  
}