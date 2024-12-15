import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    //
    while(1) {
        const karma = ns.heart.break();
        ns.print(karma)
        await ns.sleep(200)
    }
}