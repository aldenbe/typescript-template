import {NS} from "@ns";

import {
    calculate_growth_threads_required
   } from '/lib/helpers.js';
  
  /** @param {NS} ns */
  export async function calculate_ratios(ns, target_server, hack_divisor) {
  
    //initial grow/weaken
  
    if (ns.getServerMoneyAvailable(target_server) !== ns.getServerMaxMoney(target_server) && ns.getServerMoneyAvailable(target_server) < (ns.getServerMaxMoney(target_server) / 2)) 
      throw new Error("Money below half on target: " + target_server)
    else if (ns.getServerSecurityLevel(target_server) !== ns.getServerMinSecurityLevel(target_server) && ns.getServerSecurityLevel(target_server) > (ns.getServerMinSecurityLevel(target_server) * 2))
      throw new Error("Security above double min on target: " + target_server);

    ns.print(target_server)
    ns.print(hack_divisor)
  
    let available = ns.getServerMoneyAvailable(target_server);

    ns.print(available)
    let hack_threads_if_100_percent_chance = ns.hackAnalyzeThreads(target_server, available) / hack_divisor;
    // let hack_chance = ns.hackAnalyzeChance(target_server);
    // let hack_threads = Math.ceil(hack_threads_if_100_percent_chance / hack_chance);
    let hack_threads = hack_threads_if_100_percent_chance;
    let hack_security_increase = ns.hackAnalyzeSecurity(hack_threads, target_server);
    let grow_threads =  1 + calculate_growth_threads_required(ns, target_server, available, ns.getServerMaxMoney(target_server));
    let grow_security_increase = ns.growthAnalyzeSecurity(grow_threads, target_server, 1);
    let weaken_threads = 1 + Math.ceil((hack_security_increase + grow_security_increase) / 0.05);

    return {
      "hack_threads": hack_threads,
      "grow_threads": grow_threads,
      "weaken_threads": weaken_threads
    }
  
  }
  