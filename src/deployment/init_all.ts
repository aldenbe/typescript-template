import {NS} from "@ns"

import { get_all_server_data } from "/lib/server_data"
import { ServerDetails } from "/lib/helpers"


/** @param {NS} ns */
function initialize_server(ns : NS, server : string, portsRequired : number){
    let ports_open = 0
    ns.print(portsRequired)
    if(ns.fileExists("/BruteSSH.exe", "home"))
    {
        ns.brutessh(server)
        ports_open++
    }
    else if (ports_open < portsRequired)
    {
        ns.tprint("Need BruteSSH")
    }
    if(ns.fileExists("/FTPCrack.exe", "home"))
    {
        ns.ftpcrack(server)
        ports_open++
    }
    else if (ports_open < portsRequired)
    {
        ns.tprint("Need FTPCrack")
    }
    if(ns.fileExists("/relaySMTP.exe", "home"))
    {
        ns.relaysmtp(server)
        ports_open++
    }
    else if (ports_open < portsRequired)
    {
        ns.tprint("Need relaySMTP")
    }
    if(ns.fileExists("/HTTPWorm.exe", "home"))
    {
        ns.httpworm(server)
        ports_open++
    }
    else if (ports_open < portsRequired)
    {
        ns.tprint("Need HTTPWorm")
    }
    if(ns.fileExists("/SQLInject.exe", "home"))
    {
        ns.sqlinject(server)
        ports_open++
    }
    else if (ports_open < portsRequired)
    {
        ns.tprint("Need SQLInject")
    }

    // ns.print(ports_open)
    
    if(ports_open >= ns.getServerNumPortsRequired(server))
    {
        // ns.print("nuke")
        ns.nuke(server)
        // ns.print(server)
        return true
    }
    else
    {
        return false
    }
    
}


/** @param {NS} ns */
export async function main(ns : NS) {

    // const data_file = "/data/servers.json"

    ns.disableLog("sleep");
    ns.disableLog("getHackingLevel");

    let servers :{[key:string]: ServerDetails} = get_all_server_data(ns)

    let first_run = true;


    // eslint-disable-next-line no-constant-condition
    while (1) {
        servers = get_all_server_data(ns)
        // ns.print ("testing")
        // ns.print(j)
        // ns.print(JSON.stringify(servers))
        const hack_level = ns.getHackingLevel()
        let initialization_succeeded = false;
        for(let i = 0; i < Object.keys(servers).length; i++) {
            const server = Object.keys(servers)[i]
            const server_details : ServerDetails = servers[server]
    //         ns.print(server)
            
            try {
                if (!servers[server]['has_root_access'] && hack_level >= server_details.hack_level) {
                    initialization_succeeded = initialize_server(ns, server, server_details.hack_level, server_details.ports_required)
                    if(initialization_succeeded)
                        break;
                }
            }
            catch (e) {
                ns.tprint("caught? " + e)
            }
            
        }
        if(first_run || initialization_succeeded)
            ns.run("/info/generate_servers_json.js")
            
        first_run = false;
        await ns.sleep(100)
    }
    
}
