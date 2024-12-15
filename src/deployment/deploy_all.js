import {NS} from "@ns"

import {deploy} from '/lib/hack_deployment/optimize_controller.js';
import {
  get_deployable_servers,
  get_hackable_servers,
  write_server_deployed,
  get_deployment_data,
  get_server_data
 } from '/lib/helpers.js';

/** @param {NS} ns */
export async function main(ns) {

  const servers = get_server_data(ns)

  let i = 0;
  let target_server = "";
  let hackable_servers = Object.keys(get_hackable_servers(ns));
  let deploy_servers = Object.keys(get_deployable_servers(ns));


  // eslint-disable-next-line no-constant-condition
  while (true) {
      
    deploy_servers = Object.keys(get_deployable_servers(ns));
    hackable_servers = Object.keys(get_hackable_servers(ns));

    ns.print(deploy_servers)
    ns.print(hackable_servers)

    if (i >= hackable_servers.length)
    {
        i = 0;
        await ns.sleep(300)
        ns.print(i)
        continue;
    }
        

    // ns.print(JSON.stringify(deploy_servers))
    // ns.print(JSON.stringify(hackable_servers))
    // ns.exit()

    target_server = hackable_servers[i];

    try {
      get_deployment_data(ns, target_server);
      // if no error, deployed, don't deploy again
      i++
      continue;
    }
    catch(error) {
      // not deployed, deploy can run
    }
    
    
    let targeted = false;

    let hack_divisor = 2

    while (targeted == false && hack_divisor < 4)  {
        try {


            for (let j = 0; j < deploy_servers.length; j++)
            {
                let deploy_server = deploy_servers[j];



                ns.print(deploy_server)

                if(await deploy(ns, deploy_server, target_server, servers[target_server]["min_security"], servers[target_server]["port"], hack_divisor) )
                {

                    write_server_deployed(ns, target_server, "test")
                    targeted = true;
                    break;
                }
                
            }

            if (!targeted) {
                // ns.print(`failed to target: ${target_server}`)
                hack_divisor = hack_divisor * 1.2;
                // ns.print(hack_divisor)
                await ns.sleep(200);
            } else {
                break;
            }

        }
        catch 
        {
            // TODO: ?
            
        }
            
    }
    i++;
    await ns.sleep(500)
  }
}
