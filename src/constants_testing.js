import {NS} from "@ns"

/** @param {NS} ns */
export async function main(ns) {
    let test = JSON.stringify(ns.read("/lib/port_constants.json"))
    ns.print(test)

}