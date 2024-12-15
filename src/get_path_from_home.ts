import { NS } from '@ns'

import { get_all_server_data } from "/lib/server_data"

export async function main(ns : NS) : Promise<void> {

    const target_server = ns.args[0];
    //
    const all_server_data = get_all_server_data(ns);

    const pathFromHome = all_server_data[target_server].pathFromHome

    ns.tprint(pathFromHome);

    const connection_string = pathFromHome.join("; connect ")
    ns.tprint(connection_string)
}