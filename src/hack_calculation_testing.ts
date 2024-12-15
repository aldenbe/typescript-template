import { NS, BasicHGWOptions } from '@ns'

import { calculate_hack_threads,
    calculate_growth_threads_to_max
 } from "/lib/hack_deployment/calculations"
export async function main(ns : NS) : Promise<void> {

    const test_server = "joesguns"

    const raw_server_details = ns.getServer(test_server);
    const server_max_money = raw_server_details["moneyMax"];
    const available_money = ns.getServerMoneyAvailable(test_server);

    const hack_divisor = 3

    const target_money_to_hack = server_max_money / hack_divisor;
    
    // const hack_divisor = 5;
    // const money_to_hack = available_money / hack_divisor;
    // const target_hack_threads = calculate_hack_threads(ns, test_server, hack_divisor);

    // const growth_threads_to_max = calculate_growth_threads_to_max(ns, test_server, available_money, max_money, 2);
    // ns.print(growth_threads_to_max)

    // const base_grow_thread_mult = Math.pow(max_money / available_money, 1 / growth_threads_to_max);

    // ns.print(base_grow_thread_mult);
    // const money_after_grow = available_money * base_grow_thread_mult
    // ns.print(money_after_grow)

    const target_server = ns.formulas.mockServer();

    target_server.moneyAvailable = available_money;

    target_server.moneyMax = server_max_money;

    target_server.serverGrowth = raw_server_details["serverGrowth"];

    target_server.hackDifficulty = ns.getServerSecurityLevel(test_server);

    target_server.requiredHackingSkill = raw_server_details.requiredHackingSkill

    const player = ns.getPlayer()

    const max_hack_threads = 500

    
    // ns.print(ns.formulas.hacking.growThreads(target_server, ns.getPlayer(), max_money, 2))

    // ns.print(ns.formulas.hacking.growThreads(raw_server_details, ns.getPlayer(), max_money, 2))

    ns.print(target_server)
    ns.print(raw_server_details)

    const hack_percent = ns.formulas.hacking.hackPercent(target_server, player);
    ns.print(hack_percent)
    const money_hacked = target_server.moneyMax - target_server.moneyAvailable;
    ns.print(money_hacked)
    const remaining_money_to_hack = target_money_to_hack - money_hacked;
    ns.print(remaining_money_to_hack)
    ns.print(target_server.moneyAvailable)
    const target_hack_percent = remaining_money_to_hack / target_server.moneyAvailable;
    ns.print(target_hack_percent)
    ns.print(target_hack_percent / hack_percent)
    const target_hack_threads = Math.ceil(target_hack_percent / hack_percent)
    const hack_threads = Math.min(max_hack_threads, target_hack_threads);

    target_server.moneyAvailable = target_server.moneyAvailable - (target_server.moneyAvailable * hack_threads * hack_percent)

    ns.print(hack_threads)

    ns.print(target_server.moneyAvailable)

    ns.print(server_max_money - target_money_to_hack)

    ns.print(ns.hackAnalyzeThreads(test_server, target_money_to_hack))
    
    // ns.print(mockServer)


    // const min_security = ns.getServerMinSecurityLevel(test_server);
    // let current_security = ns.getServerSecurityLevel(test_server);
    // ns.print(min_security);
    // ns.print(current_security);

    

    // const growth_security_increase = ns.growthAnalyzeSecurity(1, test_server, 10);
    // ns.print(growth_security_increase);
    // await ns.grow(test_server);
    // ns.print(ns.getServerMoneyAvailable(test_server))
    // current_security = ns.getServerSecurityLevel(test_server);
    // ns.print(current_security);
    // let test : BasicHGWOptions
    // test.
    // ns.print(target_hack_threads);

    // ns.print(available_money);
    // ns.print(money_to_hack)
    // ns.print(target_hack_threads)
    // await ns.hack(test_server, {
    //     "threads": target_hack_threads
    // });

    // available_money = ns.getServerMoneyAvailable(test_server)
    // ns.print(available_money);

    //
}