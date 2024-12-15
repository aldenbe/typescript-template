import { NS } from "@ns"

/** @param {NS} ns */
export async function main(ns : NS) {
    const args : [string, number, number, boolean] = ns.args
    const target = args[0];
    const delay = args[1];
    const port = args[2];
    // const clear_port = args[3];

    ns.writePort(port, true);

    await ns.sleep(delay);

    await ns.weaken(target);
    

    ns.readPort(port)
    // if (clear_port)
    //     ns.clearPort(port)
    // let security_level = ns.getServerSecurityLevel(target);
    // ns.tprint(security_level);
}
