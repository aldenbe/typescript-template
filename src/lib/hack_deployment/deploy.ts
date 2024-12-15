import { NS } from '@ns';

import { get_available_ram, ServerDetails } from '/lib/helpers';

import { get_all_server_data, get_deployable_servers } from '/lib/server_data';
import { calculate_hack_threads,
    calculate_growth_threads_to_max
 } from '/lib/hack_deployment/calculations';
import { sec } from 'mathjs';

export const hack_script = "/hack/hack.js";
export const grow_script = "/hack/grow.js";
export const weaken_script = "/hack/weaken.js";
// export async function main(ns : NS) : Promise<void> {
//     //
// }

/** @param {NS} ns */
export function deploy_script(ns : NS, script : string, mem : number, source : string, num_threads : number, ...args : any[])
{
    const servers = get_deployable_servers(ns);

    const server_array = Object.keys(servers);

    const index = server_array.indexOf("home")
    // if (prioritize_home)
    //   server_array.unshift(server_array.splice(index, 1)[0]);
    // else
    //   server_array.push(server_array.splice(index, 1)[0]);
  


    let remaining_threads = num_threads;
    // ns.tprint("args")
    // ns.tprint(args)

    for (let i = 0; i < server_array.length; i++)
    {
        if ( remaining_threads <= 0 ) {
            break;
        }
        const server = server_array[i]
        const available = get_available_ram(ns, server);
        if (available >= mem) {
            ns.scp(script, server, source)
            // ns.tprint(mem);
            // ns.tprint(available)
            // ns.tprint(Math.floor(available / mem))
            // ns.tprint(num_threads)
            const deploy_threads = Math.min(remaining_threads, Math.floor(available / mem));
            // ns.tprint(deploy_threads)
            const pid = ns.exec(script, server, deploy_threads, ...args)
            // ns.tprint(deploy_threads)
            remaining_threads -= deploy_threads;
        }
    }

}

/** @param {NS} ns */
export function deploy_hack_script(ns : NS, num_threads : number, target_server : string, delay = 0)
{
    const hack_mem = ns.getScriptRam(hack_script, "home")
    deploy_script(ns, hack_script, hack_mem, "home", num_threads, target_server, delay);
    return ns.hackAnalyzeSecurity(num_threads)
}

/** @param {NS} ns */
export function deploy_weaken_script(ns : NS, weaken_threads : number, target_server : string, port : number, clear_port = true, delay = 0)
{
    const servers = get_deployable_servers(ns);
    const sorted_servers = sort_servers_by_cores(servers);

    for (let i = 0; i < sorted_servers.length; i++)
    {
        const server = sorted_servers[i]
        // ns.print(ns.weakenAnalyze(1, servers[server]['cores']))
    }
    
    // const home_cores = ns.getServer
    // const security_per_thread = ns.weakenAnalyze
    const weaken_mem = ns.getScriptRam(weaken_script, "home");
    
    deploy_script(ns, weaken_script, weaken_mem, "home", weaken_threads, target_server, delay, port, clear_port);
}


/** @param {NS} ns */
export function deploy_grow_script(ns : NS, num_threads : number, target_server : string, delay = 0)
{
    const grow_mem = ns.getScriptRam(grow_script, "home")
    deploy_script(ns, grow_script, grow_mem, "home", num_threads, target_server, delay);
}

export function sort_servers_by_cores(server_object: { [key: string]: ServerDetails; }) : string[] {
    const server_array = Object.keys(server_object)
    server_array.sort((a, b) => {
        return server_object[b]['cores'] - server_object[a]['cores']
    })
    return server_array;
}

/** @param {NS} ns */
export function deploy_hwgw(ns : NS, dry_run: boolean, target : string, hack_divisor : number, port : number) {
    const servers = get_deployable_servers(ns);
    const all_servers = get_all_server_data(ns);
    const source = "home"

    const grow_mem = ns.getScriptRam(grow_script, "home");
    const weaken_mem = ns.getScriptRam(weaken_script, "home");
    const hack_mem = ns.getScriptRam(hack_script, "home");

    const grow_time = ns.getGrowTime(target);
    const weaken_time = ns.getWeakenTime(target);
    const weaken_delay = 400;
    const grow_delay = weaken_time - grow_time + (weaken_delay / 2);

    // let target_hack_threads = calculate_hack_threads(ns, target, hack_divisor);
    // ns.print(target_hack_threads)
    

    const server_max_money = all_servers[target]['max_money'];

    // If we're here money should be maxed
    // const available_money = all_servers[target]['max_money']
    const target_money_to_hack = server_max_money / hack_divisor;

    // const available_after_hack = available_money - money_to_hack;
    // let available_after_grow = available_after_hack;

    
    let grow_security_increase = 0;
    const clear_port_after_hack_weaken = false;


    const target_server = ns.getServer(target);

    let hack_security_increase = target_server.hackDifficulty - target_server.minDifficulty;

    const player = ns.getPlayer();

    const sorted_servers = sort_servers_by_cores(servers);

    // calculate if there is memory for hack threads
    sorted_servers.reverse()
    let memory_available_for_hack = false
    for (let i = 0; i < sorted_servers.length; i++) {
        // ns.print("target hack threads: " + target_hack_threads)
        const server = sorted_servers[i];
        if (typeof servers[server]["available_ram"] == "undefined")
        {
            ns.tprint("PROBLEM")
            continue;
        }
        else
        {
            const max_hack_threads = Math.floor(servers[server]["available_ram"] / hack_mem)
            if (max_hack_threads === 0)
                continue;

            const hack_percent = ns.formulas.hacking.hackPercent(target_server, player);
            const money_hacked = target_server.moneyMax - target_server.moneyAvailable;
            const remaining_money_to_hack = target_money_to_hack - money_hacked;
            const target_hack_percent = remaining_money_to_hack / target_server.moneyAvailable;
            const target_hack_threads = Math.floor(target_hack_percent / hack_percent)

            const hack_threads = Math.min(max_hack_threads, target_hack_threads);
            
            // ns.print("hack threads: " + hack_threads)
            if(!dry_run && hack_threads > 0)
            {
                ns.scp(hack_script, server, source)
                // Base delay?
                ns.exec(hack_script, server, hack_threads, target, 30)
                // ns.print("deployed: " + hack_threads + " on server: " + server)
            }

            const security_increase = ns.hackAnalyzeSecurity(hack_threads);
            target_server.hackDifficulty += security_increase;
            hack_security_increase += security_increase;
            target_server.moneyAvailable = target_server.moneyAvailable - (target_server.moneyAvailable * hack_threads * hack_percent)

            servers[server]["available_ram"] = servers[server]["available_ram"] - hack_threads * hack_mem;
            
            if (hack_threads === target_hack_threads)
            {
                memory_available_for_hack = true
                break;
            }

            // target_hack_threads -= hack_threads
        }
    }
    if (!memory_available_for_hack)
        return false

    // ASSUME SUCCESSFUL HACK WEAKEN BACK TO MIN SECURITY
    target_server.hackDifficulty = target_server.minDifficulty;

    // ns.print(target_server); ns.exit()

    // Switch servers back to num cores descending
    sorted_servers.reverse()
    // calculate if there is memory for grow_threads
    let memory_available_for_grow = false;
    for (let i = 0; i < sorted_servers.length; i++) {
        const server = sorted_servers[i];
        if (typeof servers[server]["available_ram"] == "undefined")
        {
            ns.tprint("PROBLEM")
            continue;
        }
        else
        {
            const max_grow_threads = Math.floor(servers[server]["available_ram"] / grow_mem)
            if (max_grow_threads === 0)
                continue;
            const cores = servers[server]["cores"];

            // let grow_threads_to_max;

            // try {
                // grow_threads_to_max = calculate_growth_threads_to_max(ns, target, available_after_grow, server_max_money, cores);
            let grow_threads_to_max;
            try {
                grow_threads_to_max = Math.ceil(ns.formulas.hacking.growThreads(target_server, player, target_server.moneyMax, cores))
            }
            catch {
                ns.print("??????????????")
                return false;
            }
            // ns.print("grow threads to max")
            // ns.print(grow_threads_to_max)
                // ns.print(grow_threads_to_max)
            // }
            // catch {
            //     // ns.print("Divisor: " + hack_divisor);
            //     // ns.print("target: " + target)
            //     // ns.print(available_after_hack)
            //     // ns.print(server_max_money)
            //     return false
            // }

            const grow_threads = Math.min(max_grow_threads, grow_threads_to_max);
            // const percentage_grown = 
            target_server.moneyAvailable = ns.formulas.hacking.growAmount(target_server, player, grow_threads, cores);
            // ns.print(grow_threads)
            const security_increase =  ns.growthAnalyzeSecurity(grow_threads, undefined, cores);
            // ns.print("grow security increase")
            // ns.print(security_increase)
            grow_security_increase += security_increase;
            target_server.hackDifficulty += security_increase;
            if(!dry_run && grow_threads > 0)
            {
                ns.scp(grow_script, server, source)
                ns.exec(grow_script, server, grow_threads, target, grow_delay)
            }

            servers[server]["available_ram"] = servers[server]["available_ram"] - grow_threads * grow_mem;

            // target_server 
            
            // TODO: REQUIRES FORMULAS AND SIMULATED SERVERS????

            // grow_security_increase += ns.growthAnalyzeSecurity(grow_threads, target, cores)
            // grow_security_increase = grow_threads * 0.01
            
            if (grow_threads === grow_threads_to_max)
            {
                memory_available_for_grow = true;
                break;
            }
            // ns.print("original threads: " + grow_threads_to_max)

            

            // base mult changes based on if security is max?
            // let base_grow_thread_mult = Math.pow(server_max_money / available_after_grow, 1 / grow_threads_to_max);

            // base_grow_thread_mult = (base_grow_thread_mult - 1) * 0.005 + 1
            // ns.print("base grow thread mult: ")
            // ns.print(base_grow_thread_mult)

            // ns.growthAnalyze

            // ns.print("base mult: " + base_grow_thread_mult)

            // ns.print("available threads: " + grow_threads)

            // const multiple_of_available_threads = Math.pow(base_grow_thread_mult, grow_threads);

            // ns.print("multiple of available: " + multiple_of_available_threads)

            // ns.print("original avail after grow: " + available_after_grow)

            // available_after_grow = available_after_grow * multiple_of_available_threads;
        
            // ns.print("new avail after grow: " + available_after_grow)
        }
    }
    if (!memory_available_for_grow)
        return false

    // calculate if there is memory for hack weaken threads
    let memory_available_for_hack_weaken = false
    for (let i = 0; i < sorted_servers.length; i++) {
        const server = sorted_servers[i];
        if (typeof servers[server]["available_ram"] == "undefined")
        {
            ns.tprint("PROBLEM")
            continue;
        }
        else
        {
            const max_weaken_threads = Math.floor(servers[server]["available_ram"] / weaken_mem)
            if (max_weaken_threads === 0)
                continue;

            const cores = servers[server]["cores"];

            const weaken_per_thread = ns.weakenAnalyze(1, cores);

            const weaken_threads_to_min = Math.ceil(hack_security_increase / weaken_per_thread)

            const weaken_threads = Math.min(max_weaken_threads, weaken_threads_to_min);
            
            if(!dry_run && weaken_threads > 0)
            {
                ns.scp(weaken_script, server, source)
                ns.exec(weaken_script, server, weaken_threads, target, 0, port, false)
            }    

            servers[server]["available_ram"] = servers[server]["available_ram"] - weaken_threads * weaken_mem;
            
            if (weaken_threads === weaken_threads_to_min)
            {
                memory_available_for_hack_weaken = true
                break;
            }

            hack_security_increase -= weaken_threads * weaken_per_thread
        }
    }
    if (!memory_available_for_hack_weaken)
        return false

    // calculate if there is memory for grow weaken threads
    let memory_available_for_grow_weaken = false
    for (let i = 0; i < sorted_servers.length; i++) {
        const server = sorted_servers[i];
        if (typeof servers[server]["available_ram"] == "undefined")
        {
            ns.tprint("PROBLEM")
            continue;
        }
        else
        {
            const max_weaken_threads = Math.floor(servers[server]["available_ram"] / weaken_mem)
            if (max_weaken_threads === 0)
                continue;
            const cores = servers[server]["cores"];

            const weaken_per_thread = ns.weakenAnalyze(1, cores);

            const weaken_threads_to_min = Math.ceil(grow_security_increase / weaken_per_thread)
            // ns.print(weaken_threads_to_min)

            const weaken_threads = Math.min(max_weaken_threads, weaken_threads_to_min);
            // ns.print(weaken_threads)
            if(!dry_run && weaken_threads > 0)
            {
                const clear_port = (weaken_threads === weaken_threads_to_min) ? true : false
                ns.scp(weaken_script, server, source)
                ns.exec(weaken_script, server, weaken_threads, target, weaken_delay, port, clear_port)
                // ns.print("deployed " + weaken_threads + "to server" + server)
            }    

            servers[server]["available_ram"] = servers[server]["available_ram"] - weaken_threads * weaken_mem;
            
            if (weaken_threads === weaken_threads_to_min)
            {
                memory_available_for_grow_weaken = true
                break;
            }

            grow_security_increase -= weaken_threads * weaken_per_thread
        }
    }
    if (!memory_available_for_grow_weaken)
        return false

    return true
}

/** @param {NS} ns */
export async function get_all_available_ram (ns : NS, min_increment = 1) {
    //
    let total_available_ram = 0;
    const deployable_servers = get_deployable_servers(ns);
    for (let i = 0; i < Object.keys(deployable_servers).length; i++){
        const server = Object.keys(deployable_servers)[i]
        const available_ram = get_available_ram(ns, server);
        if (available_ram - (available_ram % min_increment) > 0)
        {
            total_available_ram += available_ram - (available_ram % min_increment);
        }
        // else (ns.tprint(available_ram % min_increment))
    }
    return total_available_ram;
  }