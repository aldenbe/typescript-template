// import { NS } from "@ns"
// import { calculate_ratios } from './calculations.js';



// /** @param {NS} ns */
// export async function deploy(ns, deployment_server, target_server, min_security, port, divisor) {

//   const hack_script = "/basic/hack.js"
//   const grow_script = "/basic/grow.js"
//   const weaken_script = "/basic/weaken.js"

//   let ratios;
//   // TODO: determine appropriate multiplier
//   try {
//     ratios = calculate_ratios(ns, target_server, divisor);
//     ns.print(ratios)
//   } catch (error) {
//     ns.print("caught error: " + error);
//     return false;
//   }
  

//   let hack_threads = Math.ceil(ratios['hack_threads']);
//   let grow_threads = Math.ceil(ratios['grow_threads']);
//   let weaken_threads = Math.ceil(ratios['weaken_threads']);

//   // ns.tprint(JSON.stringify(ratios))
//   // ns.exit()

  

//   // TODO: calculate required ram appropriately

//   let required_ram = (hack_threads * 2) + (grow_threads * 2) + (weaken_threads * 2);

//   let available_ram = ns.getServerMaxRam(deployment_server) - ns.getServerUsedRam(deployment_server);

//   if (required_ram > available_ram || hack_threads < 5)
//   {
//     return false;
//   }

//   ns.scp(hack_script, deployment_server, "home");
//   ns.scp(grow_script, deployment_server, "home");
//   ns.scp(weaken_script, deployment_server, "home");

// // TODO: multiple hacks if fail


//   // let weaken_time = ns.getWeakenTime(target_server);

//   // let hack_time = ns.getHackTime(target_server);



//   ns.exec(hack_script, deployment_server, hack_threads, target_server, port);

//   ns.exec(grow_script, deployment_server, grow_threads, target_server, port + 1);

//   ns.exec(weaken_script, deployment_server, weaken_threads, target_server, min_security, port);

//   return true;
  
// }
