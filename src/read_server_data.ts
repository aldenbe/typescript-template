import { NS } from '@ns'
import { get_deployable_servers, get_hackable_servers } from '/lib/server_data'

export async function main(ns : NS) : Promise<void> {
    //
    ns.print(JSON.stringify(get_hackable_servers(ns)))
}