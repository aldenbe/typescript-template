import { NS } from "@ns";

// import { calculate_growth_threads_to_max } from "/daemon_testing";

// import {
//     calculate_growth_threads_required
//    } from '/lib/helpers.js';
  
//   /** @param {NS} ns */
//   export async function calculate_ratios(ns, target_server, hack_divisor) {
  
//     //initial grow/weaken
  
//     if (ns.getServerMoneyAvailable(target_server) !== ns.getServerMaxMoney(target_server) && ns.getServerMoneyAvailable(target_server) < (ns.getServerMaxMoney(target_server) / 2)) 
//       throw new Error("Money below half on target: " + target_server)
//     else if (ns.getServerSecurityLevel(target_server) !== ns.getServerMinSecurityLevel(target_server) && ns.getServerSecurityLevel(target_server) > (ns.getServerMinSecurityLevel(target_server) * 2))
//       throw new Error("Security above double min on target: " + target_server);

//     // ns.print(target_server)
//     // ns.print(hack_divisor)
  
//     const available = ns.getServerMoneyAvailable(target_server);

//     ns.print(available)
//     const hack_threads_if_100_percent_chance = ns.hackAnalyzeThreads(target_server, available) / hack_divisor;
//     // let hack_chance = ns.hackAnalyzeChance(target_server);
//     // let hack_threads = Math.ceil(hack_threads_if_100_percent_chance / hack_chance);
//     const hack_threads = hack_threads_if_100_percent_chance;
//     const hack_security_increase = ns.hackAnalyzeSecurity(hack_threads, target_server);
//     const grow_threads =  1 + calculate_growth_threads_required(ns, target_server, available, ns.getServerMaxMoney(target_server));
//     const grow_security_increase = ns.growthAnalyzeSecurity(grow_threads, target_server, 1);
//     const weaken_threads = 1 + Math.ceil((hack_security_increase + grow_security_increase) / 0.05);

//     return {
//       "hack_threads": hack_threads,
//       "grow_threads": grow_threads,
//       "weaken_threads": weaken_threads
//     }
  
//   }

/** @param {NS} ns */
export function calculate_weaken_threads(ns : NS, security_to_weaken : number) : number{
  // if (ns.fileExists("/Formulas.exe", "home")){
  //   // ns.formulas.hacking. 
  // }
  // else {
    return Math.ceil(security_to_weaken / 0.05);
  // }

}

/** @param {NS} ns */
export function calculate_hack_threads(ns : NS, target_server : string, hack_divisor : number) {
  
  const available_money : number = ns.getServerMoneyAvailable(target_server);
  // ns.print(available_money);

  // if (ns.fileExists("/Formulas.exe", "home")){
  //   // TODO
  //   // const hack_percentage = 1 / hack_divisor;
  //   // ns.formulas.mockServer()
  //   // const server = ns.getServer()
  //   // server.
  //   // ns.formulas.hacking.hackPercent()
  // }
  // else {
    const money_to_hack : number = available_money / hack_divisor;
    const hack_threads_if_100_percent_chance : number = Math.floor(ns.hackAnalyzeThreads(target_server, money_to_hack));
  // }
  
  
  
  const hack_threads : number = hack_threads_if_100_percent_chance;

  return hack_threads;
}


/** @param {NS} ns */
export function calculate_threads(ns : NS, target_server : string, hack_divisor : number) {

  const available_money : number = ns.getServerMoneyAvailable(target_server);
  const money_to_hack : number = available_money / hack_divisor;


  const hack_threads : number = calculate_hack_threads(ns, target_server, hack_divisor)
  const hack_security_increase : number = ns.hackAnalyzeSecurity(hack_threads, target_server);

  // ns.tprint(hack_security_increase)
  const weaken_1_threads : number = calculate_weaken_threads(ns, hack_security_increase);
  const available_after_hack : number = available_money - (money_to_hack)
  // TODO: FIX ASSUMPTION OF 1 CORE
  const grow_threads : number = calculate_growth_threads_to_max(ns, target_server, available_after_hack, ns.getServerMaxMoney(target_server), 1);
  // ns.tprint(ns.getServerGrowth{target_server})
  
  // ns.tprint(grow_security_increase);
  const weaken_2_threads : number = calculate_weaken_threads_from_growth_threads(grow_threads);
  // ns.tprint(ns.getServerBaseSecurityLevel(target_server))

  return {
      "hack_threads": hack_threads,
      "grow_threads": grow_threads,
      "weaken_1_threads": weaken_1_threads,
      "weaken_2_threads": weaken_2_threads
  }

}

/** @param {NS} ns */
export function calculate_growth_threads_to_max(ns : NS, target_server : string, current_money : number, max_money : number, cores : number) : number {

  if(current_money === 0)
      throw new Error("Infinite")
  //current money * x = max_money
  const growth_multiplier_required = max_money / current_money;
  // if (growth_multiplier_required < 1)
  // {
  //   ns.print("??????????")

  //   ns.print(Math.ceil(ns.growthAnalyze(target_server, growth_multiplier_required, cores)))

  //   ns.exit()
  // }
    

  return Math.ceil(ns.growthAnalyze(target_server, growth_multiplier_required, cores));
}

// export function calculate_weaken_threads_to_min(ns : NS, target_server : string, security_to_weaken: number, cores : number) : number {
  
//   return Math.ceil(ns.growthAnalyze(target_server, growth_multiplier_required, cores));
// }


export function calculate_weaken_threads_from_growth_threads (grow_threads : number) {
  // what??
  const grow_security_increase = grow_threads * 0.005;

  return Math.ceil((grow_security_increase) / 0.05); 
}
