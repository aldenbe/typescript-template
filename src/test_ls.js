import {NS} from "@ns"

/** @param {NS} ns */
export async function main(ns) {
    const host = "home";
    let deployed = ns.ls("/deployed/", host)
    for (let i = 0; i < deployed.length; i++){
        ns.tprint(deployed[i])
    }
}