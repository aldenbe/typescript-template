import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    //
    while (!ns.gang.inGang())
    {
        // todo: form gang
        // temp
        await ns.sleep(100)
    }

    const is_hacking = ns.gang.getGangInformation().isHacking

    while (1)
    {
        
        // ns.print(JSON.stringify(ns.gang.getGangInformation()));
        const gang_members = ns.gang.getMemberNames();
        // ns.print(JSON.stringify(gang_members));

    //     let i = 

        if (ns.gang.canRecruitMember())
        {
            ns.gang.recruitMember(`goon-${gang_members.length}`)
            continue;
        }

        

            // let i = ns.getPurchasedServers().length;
  
    // const populate_server_list_script = "/info/generate_servers_json.js"
  
    // while (i < ns.getPurchasedServerLimit() ) {
    //       // Check if we have enough money to purchase a server
    //     if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
    //         let hostname = ns.purchaseServer("psrv-" + i, ram);
    //         ns.gang.recruitMember()
    //     }
        

        await ns.sleep(20)
        for (let i = 0; i < gang_members.length; i++) {
            const goon = gang_members[i];

            if (ns.gang.getMemberInformation(goon).task == "Unassigned")
                ns.gang.setMemberTask(goon, "Train Hacking");
            const ascension_results = ns.gang.getAscensionResult(goon);

            ns.print(ascension_results)

        }
        
        ns.exit();
    }
    
}