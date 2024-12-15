import { BasicHGWOptions, NS } from "@ns"



/** @param {NS} ns */
export async function main(ns : NS) {
    const target = ns.args[0]
    const delay = ns.args[1]
    // const port = ns.args[1]

    await ns.sleep(delay);

    // ns.tprint(ns.getServerSecurityLevel(target))

    // TODO: more elaborate stock manipulation schemes
    const options : BasicHGWOptions = {
        "stock": true
    }

    const multiplier = await ns.grow(target, options)

    if (multiplier === 0)
        ns.tprint("0 mult for target: " + target)

    // ns.tprint(ns.getServerSecurityLevel(target))
    // ns.writePort(port, multiplier)
}
