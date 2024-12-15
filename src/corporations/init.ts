import { NS } from '@ns'

export function get_smart_supply (ns : NS) : boolean {
    if(!ns.corporation.hasUnlock("Smart Supply"))
    {
        // TODO: determine if affordable
        // ns.corporation.getUnlockCost("Smart Supply")
        ns.corporation.purchaseUnlock("Smart Supply");
        return true;
    }
    else
        return true;

    return false;
}


export async function main(ns : NS) : Promise<void> {

    const current_node = ns.getResetInfo().currentNode;
    const corporation_name = "Evil Corp";
    const starter_agriculture_name = "Starter-Agriculture";
    const starter_chemical_name = "Starter-Chem";

    // const corporation_constants = ns.corporation.getConstants();


    if (!ns.corporation.hasCorporation())
    {
        if (current_node === 3) 
        {
            // Can use seed money in bitnode 3
            ns.corporation.createCorporation(corporation_name, false)

        }
        else
        {
            // TODO: determine if appropriate to start corp
            ns.corporation.createCorporation(corporation_name, true)
        }
            
    }

    // TODO: determine smart supply alternative?
    // TODO: ensure smart supply purchased
    // get_smart_supply(ns);

    // 
    // TODO: go public, dump all shares immediately and reform company to steal seed money

    // SETUP STARTER AGRICULTURE

    // ns.corporation.
        
    // TODO: determine cost?

    let corporation = ns.corporation.getCorporation();
    
    if (!corporation.divisions.includes(starter_agriculture_name))
    {
        
       //Init starter agriculture
        ns.corporation.expandIndustry("Agriculture", starter_agriculture_name);
        ns.corporation.hireAdVert(starter_agriculture_name);
        ns.corporation.hireAdVert(starter_agriculture_name);
    }

    for (let i = 0; i < Object.keys(ns.enums.CityName).length; i++){
        const city_name = ns.enums.CityName[Object.keys(ns.enums.CityName)[i]]
        if (city_name !== ns.enums.CityName["Sector12"]) {
            const division = ns.corporation.getDivision(starter_agriculture_name);
            if (!division.cities.includes(city_name))
                ns.corporation.expandCity(starter_agriculture_name, city_name);
            if (!ns.corporation.hasUnlock("Warehouse API"))
                ns.corporation.purchaseUnlock("Warehouse API")
            ns.corporation.purchaseWarehouse(starter_agriculture_name, city_name);
        }
        initialize_starter_argriculture_in_city(ns, starter_agriculture_name, city_name)
    }


    // Wait until RP is at least 55
    while (ns.corporation.getDivision(starter_agriculture_name).researchPoints < 55) {
        await ns.corporation.nextUpdate()
    }

    //switch to Operations (1) + Engineer (1) + Business (1) + Management (1) before buying boost materials.
    for (let i = 0; i < Object.keys(ns.enums.CityName).length; i++){
        const city_name = ns.enums.CityName[Object.keys(ns.enums.CityName)[i]]
        ns.corporation.setAutoJobAssignment(starter_agriculture_name, city_name, "Research & Development", 0)
        ns.corporation.setAutoJobAssignment(starter_agriculture_name, city_name, "Operations", 1)
        ns.corporation.setAutoJobAssignment(starter_agriculture_name, city_name, "Engineer", 1)
        ns.corporation.setAutoJobAssignment(starter_agriculture_name, city_name, "Business", 1)
        ns.corporation.setAutoJobAssignment(starter_agriculture_name, city_name, "Management", 1)
    }
    

    // Update available funds
    corporation = ns.corporation.getCorporation();
    const chemical_data = ns.corporation.getIndustryData("Chemical");
    if (
        !corporation.divisions.includes(starter_chemical_name) && 
        corporation.funds > (chemical_data.startingCost + ns.corporation.getUnlockCost("Export"))
    )
    {
        //Init starter chemm
        ns.corporation.purchaseUnlock("Export")
        ns.corporation.expandIndustry("Chemical", starter_chemical_name);


        for (let i = 0; i < Object.keys(ns.enums.CityName).length; i++){
            const city = ns.enums.CityName[Object.keys(ns.enums.CityName)[i]]
            if (city !== ns.enums.CityName["Sector12"]) {
                ns.corporation.expandCity(starter_chemical_name, city);
                ns.corporation.purchaseWarehouse(starter_chemical_name, city);
            }
            initialize_starter_argriculture_in_city(ns, starter_chemical_name, city)
            // Add employees to starter ag
            ns.corporation.upgradeOfficeSize(starter_agriculture_name, city, 4)
            // TODO: review jobs
            ns.corporation.hireEmployee(starter_agriculture_name, city, "Research & Development");
            ns.corporation.hireEmployee(starter_agriculture_name, city, "Intern");
            ns.corporation.hireEmployee(starter_agriculture_name, city, "Operations");
            ns.corporation.hireEmployee(starter_agriculture_name, city, "Operations");

            ns.corporation.exportMaterial(starter_chemical_name, city, starter_agriculture_name, city, "Chemicals", "MAX")
        }

        

        // Wait until RP is at least 390
        while (ns.corporation.getDivision(starter_chemical_name).researchPoints < 390) {
            await ns.corporation.nextUpdate()
        }

        //TODO: review jobs
        for (let i = 0; i < Object.keys(ns.enums.CityName).length; i++){
            const city_name = ns.enums.CityName[Object.keys(ns.enums.CityName)[i]]
            ns.corporation.setAutoJobAssignment(starter_chemical_name, city_name, "Research & Development", 0)
            ns.corporation.setAutoJobAssignment(starter_chemical_name, city_name, "Operations", 1)
            ns.corporation.setAutoJobAssignment(starter_chemical_name, city_name, "Engineer", 1)
            ns.corporation.setAutoJobAssignment(starter_chemical_name, city_name, "Intern", 1)
            ns.corporation.setAutoJobAssignment(starter_chemical_name, city_name, "Management", 1)
        }
    }

}

function initialize_starter_argriculture_in_city(ns : NS, divisionName: string, city: cityName) {

    ns.corporation.upgradeOfficeSize(divisionName, city, 1)
    ns.corporation.hireEmployee(divisionName, city, "Research & Development");
    ns.corporation.hireEmployee(divisionName, city, "Research & Development");
    ns.corporation.hireEmployee(divisionName, city, "Research & Development");
    ns.corporation.hireEmployee(divisionName, city, "Research & Development");

    ns.corporation.sellMaterial(divisionName, city, "Plants", "MAX", "MP")
    ns.corporation.sellMaterial(divisionName, city, "Food", "MAX", "MP")

}