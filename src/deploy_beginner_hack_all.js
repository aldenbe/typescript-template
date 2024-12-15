import {NS} from "@ns"

// import {deploy} from '/lib/hack_deployment/optimize_controller.js';
import { get_deployable_servers } from './lib/server_data';

 import { get_max_threads } from "/lib/helpers"
 
/** @param {NS} ns */
export async function main(ns) {

    const target = "n00dles"

    let deploy_servers = Object.keys(get_deployable_servers(ns));

    let beginner_hack_mem = ns.getScriptRam("beginner_hack.js")
    for (let i = 0; i < deploy_servers.length; i++)
    {
        let deploy_server = deploy_servers[i]
        ns.scp("beginner_hack.js", deploy_server, "home");
        let threads = Math.floor(get_max_threads(ns,deploy_server, beginner_hack_mem)/2)
        if (threads > 0)
            ns.exec("beginner_hack.js", deploy_server, threads, target);
    }
}
