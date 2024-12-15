/** @param {NS} ns */
export async function kill_all(ns) {
    ns.killall("home", true);
    if (!ns.fileExists("/data/servers.json"))
      return null
    const servers = Object.keys(JSON.parse(ns.read("/data/servers.json")))
    
    for (let i = 0; i < servers.length; i++) {
      try {
        ns.killall(servers[i], true)
      }
      catch
      {
        
      }
  
    }
    let files = ns.ls("home", "deployed")
    for (let i = 0; i < files.length; i++) {
      ns.rm(files[i], "home");
    }
  }