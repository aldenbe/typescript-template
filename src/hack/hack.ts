import { NS } from "@ns"



/** @param {NS} ns */
export async function main(ns : NS) {
    const args : [string, number] = ns.args
    const target = args[0]
    const delay = args[1]
    // const port = ns.args[1]

    // ns.tprint(ns.getServerSecurityLevel(target))

    // TODO: more elaborate stock manipulation schemes
    const options : BasicHGWOptions = {
        // "stock": true
    }
    
    const stolen = await ns.hack(target, options)

    // ns.tprint(ns.getServerSecurityLevel(target))
    // ns.writePort(port, stolen)
}
