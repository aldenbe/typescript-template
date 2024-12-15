import { NS } from "@ns"

import { 
    // get_deployable_servers,
    get_hackable_servers,
    get_min_maxed_servers
} from "/lib/server_data"

import { 
    calculate_growth_threads_required, 
    get_available_ram,
} from "/lib/helpers";

import { 
    // calculate_hack_threads,
    calculate_threads,
    calculate_weaken_threads_from_growth_threads
 } from "/lib/hack_deployment/calculations";

import {
    hack_script,
    weaken_script,
    grow_script,
    deploy_script,
    deploy_hack_script,
    deploy_weaken_script,
    get_all_available_ram,
    deploy_hwgw,
    // deploy_grow_script
} from "/lib/hack_deployment/deploy"



/** @param {NS} ns */
export function get_servers_without_min_security(ns) {
    const servers = get_hackable_servers(ns);
    // ns.print(servers)
    // ns.tprint(servers)

    const servers_to_weaken = {}
    for (let i = 0; i < Object.keys(servers).length; i++){
        const server = Object.keys(servers)[i]
        const server_details = servers[server]
        if (server_details['min_security'] < ns.getServerSecurityLevel(server))
        {
            servers_to_weaken[server] = server_details;
        }
    }

    return servers_to_weaken;
}

export function get_servers_to_grow(ns) {
    const servers = get_hackable_servers(ns);
    // ns.tprint(servers)

    const servers_to_grow = {}
    for (let i = 0; i < Object.keys(servers).length; i++){
        const server = Object.keys(servers)[i]
        const server_details = servers[server]
        if (server_details['min_security'] == ns.getServerSecurityLevel(server) && server_details['max_money'] > ns.getServerMoneyAvailable(server))
        {
            servers_to_grow[server] = server_details;
        }
    }

    return servers_to_grow;
    
}


/** @param {NS} ns */
export function calculate_weaken_threads_for_server(ns, server) {
    const weaken_effect = 0.05;

    const security_to_weaken = ns.getServerSecurityLevel(server) - ns.getServerMinSecurityLevel(server);

    return Math.ceil(security_to_weaken / weaken_effect);
}

/** @param {NS} ns */
export function calculate_grow_and_weaken_threads_for_server(ns, server) {
    let grow_threads_required = 10000000
    try {
        grow_threads_required = calculate_growth_threads_required(ns, server, ns.getServerMoneyAvailable(server), ns.getServerMaxMoney(server))
    } catch {
        // ns.print("test1")
        // calculate threads required with the additive properties of grow
    }

    const weaken_threads = calculate_weaken_threads_from_growth_threads(grow_threads_required);

    return {
        "grow_threads": grow_threads_required,
        "weaken_threads": weaken_threads
    }
    
}


/** @param {NS} ns */
export async function main(ns : NS) {

    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerUsedRam");
    ns.disableLog("getServerSecurityLevel");
    ns.disableLog("getServerMinSecurityLevel");
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("getServerMaxMoney");
    ns.disableLog("sleep");
    ns.disableLog("scp");
    ns.disableLog("exec");

    // const hack_script = "/hack/hack.js"
    // const grow_script = "/hack/grow.js"
    // const weaken_script = "/hack/weaken.js"
    const hack_mem = ns.getScriptRam(hack_script, "home")
    const grow_mem = ns.getScriptRam(grow_script, "home")
    // ns.tprint(grow_mem)
    // ns.exit()
    const weaken_mem = ns.getScriptRam(weaken_script, "home")
    const STARTING_DIVISOR = 2;
    let rolling_divisor = STARTING_DIVISOR
    // ns.exit()
    

    if (ns.fileExists("Formulas.exe", "home"))
    {
        //TODO:

    }

    // ns.tprint(servers_to_hack)

    // ns.tprint(all_ram)

    while (true) {

        let divisor = rolling_divisor;

        let times_exceeded_divisor = 0;


        const servers_to_hack = get_hackable_servers(ns);
        // ns.print(Object.keys(servers_to_hack))

        // ns.print(servers_to_hack);
        //     ns.exit();
        // const servers_to_hack = get_hackable_servers(ns);
        // delete servers_to_hack["joesguns"]
        // ns.print(Object.keys(servers_to_hack))

        let num_hacks_deployed = 0;

        const servers_to_weaken = get_servers_without_min_security(ns);
        // ns.print('test5');
        //     ns.exit();
        // delete servers_to_weaken["joesguns"]
        // ns.print(Object.keys(servers_to_weaken))
        // ns.print(Object.keys(servers_to_weaken))

        // ns.print(JSON.stringify(servers_to_weaken));

        const servers_to_grow = get_servers_to_grow(ns);
        // ns.print('test6');
        //     ns.exit();
        // delete servers_to_grow["joesguns"]
        // ns.print(Object.keys(servers_to_grow))
        // ns.print(Object.keys(servers_to_grow))

        // ns.print(JSON.stringify(servers_to_grow));


        for (let i = 0; i < Object.keys(servers_to_hack).length; i++)
        {
            // ns.print (i)
            // ns.print(Object.keys(servers_to_hack).length)
            // ns.print('test');
            // ns.exit();
            // const all_ram = get_all_available_ram(ns, Math.max(hack_mem, grow_mem, weaken_mem))
            
            // ns.print(all_ram)

            const server = Object.keys(servers_to_hack)[i]
            const server_details = servers_to_hack[server]
            const port = server_details['port']
            // ns.print(server);
            // ns.tprint(port)
            if (ns.peek(port) === true) {
                // ns.print("1")
                // ns.print(server)
                // ns.print(server)
                continue;
            }
            else
            {
                // ns.print("2")
                // ns.print(server)
            }
            // ns.exit()
            // const threads = calculate_threads(ns, server, divisor);

            // ns.print(server)
            // ns.print(JSON.stringify(threads));
            // ns.exit()
            // const hack_threads = calculate_hack_threads(ns, server, divisor);
            // ns.print(hack_threads)
            // ns.exit()
            // const hack_threads = threads['hack_threads'];
            // const grow_threads = threads['grow_threads'];
            // const weaken_1_threads = threads['weaken_1_threads'];
            // const weaken_2_threads = threads['weaken_2_threads'];
            // // ns.print(threads);
            // const total_hack_mem = hack_threads * hack_mem;
            // const total_grow_mem = grow_threads * grow_mem;
            // const total_weaken_mem = (weaken_1_threads + weaken_2_threads) * weaken_mem;
            // const mem_required = total_hack_mem + total_grow_mem + total_weaken_mem;
            // ns.print(deploy_hwgw(ns, true, server, divisor));
            // if (mem_required > all_ram)
            if (!deploy_hwgw(ns, true, server, divisor, port))
            {
                ns.print("not enough mem for " + server)
                times_exceeded_divisor++;
                if (divisor > 50 || divisor <= 0)
                {
                    // ns.print("test")
                    divisor = rolling_divisor
                    // await ns.sleep(10)
                    continue
                }
                divisor = divisor * 1.5;
                // ns.print(divisor)
                // await ns.sleep(5)
                i--;
            }
            else
            {
                // ns.print(server)
                // ns.print(divisor)
                if(!deploy_hwgw(ns, false, server, divisor, port))
                    ns.tprint("failed to properly deploy batch")
                else 
                    num_hacks_deployed++;

            //     // ns.tprint(mem_required)
            //     //TODO: deploy all
            //         // TODO: prioritize home
            //         // ns.tprint(weaken_1_threads)
            //     deploy_weaken_script(ns, weaken_1_threads, server, port, false);
            //     const weaken_delay = 100;
            //     deploy_weaken_script(ns, weaken_2_threads, server, port, true, weaken_delay);
            //     deploy_hack_script(ns, hack_threads, server);
            //     const grow_time = ns.getGrowTime(server);
            //     // let hack_time = ns.getHackTime(server);
            //     const weaken_time = ns.getWeakenTime(server);
            //     const grow_delay = weaken_time - grow_time - (weaken_delay / 2);
                
            //     // await

            //     // ns.tprint(ns.getServerGrowth(server))
            //     // ns.tprint(ns.growthAnalyzeSecurity(grow_threads,server,1))
            //     deploy_script(ns, grow_threads, server, grow_delay);
            divisor = rolling_divisor;
        
            }
            
            // ns.print("riisetin")
        }


        for (let i = 0; i < Object.keys(servers_to_weaken).length; i++)
        {
            // ns.print('test1');
            // ns.exit();
            const all_ram = get_all_available_ram(ns, Math.max(weaken_mem))
            
            // ns.tprint(all_ram)

            const server = Object.keys(servers_to_weaken)[i]
            
            // 
            const server_details = servers_to_weaken[server]
            const port = server_details['port']
            // ns.tprint(port)
            if (ns.peek(port) === true) {
                // ns.print(server)
                continue;
            }
            ns.print(server)
            ns.print("needs weaken?")

            let weaken_threads = calculate_weaken_threads_for_server(ns, server)

            const mem_required = weaken_threads * weaken_mem;
            if (mem_required > all_ram)
            {
                weaken_threads = Math.floor(all_ram / weaken_mem);
            }
            else
            {
                deploy_script(ns, weaken_script, weaken_mem, "home", weaken_threads, server, 0, port, true);
            }
        }

        for (let i = 0; i < Object.keys(servers_to_grow).length; i++)
            {
            //     ns.print('test2');
            // ns.exit();
                const all_ram = get_all_available_ram(ns, Math.max(grow_mem, weaken_mem))
                
    
                const server = Object.keys(servers_to_grow)[i]
                
                const server_details = servers_to_grow[server]
                const port = server_details['port']
                if (ns.peek(port) === true) {
                    continue;
                }
                ns.print(ns.getServerMaxMoney(server))
                ns.print(ns.getServerMoneyAvailable(server))
                ns.print(server)
                ns.print("needs grow?")
    
                const threads = calculate_grow_and_weaken_threads_for_server(ns, server)

                let grow_threads = threads["grow_threads"];
                let weaken_threads = threads["weaken_threads"];
    
                const total_grow_mem = grow_threads * grow_mem;
                const total_weaken_mem = weaken_threads * weaken_mem;
                const mem_required = total_grow_mem + total_weaken_mem;
                if (mem_required > all_ram)
                {
                    const max_threads = Math.floor(all_ram / Math.max(grow_mem, weaken_mem));

                    const percentage_grow_threads_in_decimal = grow_threads / (weaken_threads + grow_threads)

                    grow_threads = Math.floor(max_threads * percentage_grow_threads_in_decimal)

                    weaken_threads = calculate_weaken_threads_from_growth_threads(grow_threads)

                    const total_grow_mem = grow_threads * grow_mem;
                const total_weaken_mem = weaken_threads * weaken_mem;
                const mem_required = total_grow_mem + total_weaken_mem;
                if (mem_required > all_ram)
                    {
                        ns.tprint("more threads than max mem???????")
                        continue;

                    }
                }
                else
                {
                    // await deploy_script(ns, weaken_script, weaken_mem, "home", weaken_threads, server, port, true);
                }

                deploy_script(ns, weaken_script, weaken_mem, "home", weaken_threads, server, 0, port, true);
                deploy_script(ns, grow_script, grow_mem, "home", grow_threads, server, 0);
            }

        if (times_exceeded_divisor === 0 && num_hacks_deployed > 0 && rolling_divisor > 1.01)
            rolling_divisor = (rolling_divisor - 1) * 0.95 + 1
        else if (num_hacks_deployed > 0 && divisor < 2)
            rolling_divisor = (rolling_divisor - 1) * 1.01 + 1

        // ns.print(rolling_divisor)
        if (rolling_divisor < 1)
            ns.exit();

        await ns.sleep(20)
    }

    

}