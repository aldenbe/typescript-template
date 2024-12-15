import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    //
    // ns.print(ns.corporation.getIndustryData("Tobacco"));
    // const debug = ns.corporation.getDivision("Starter-Tobacco")
    // const debug = ns.
    const debug = ns.corporation.getMaterial("Starter-Tobacco", "Sector-12", "American Spirits")

    ns.print(debug)
}