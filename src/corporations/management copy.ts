import { CityName, NS, Office } from '@ns'
import { calculateProductionFactor,
    calculateOfficeProductionMultiplier,
    boostMaterialOptimizer,
    boostMaterialOptimizerConstraint,
    calculateResearchProductionMultiplier,
    calculateUpgradeProductionMultiplier,
    calculateOptimalBoostMaterialAmounts,
    getBaseProductionSize,
    calculateDivisioinProductionMultiplier
 } from '/lib/corporations/calculations';


export async function main(ns : NS) : Promise<void> {

    // const current_node = ns.getResetInfo().currentNode;


    const corporation_name = "Evil Corp"
    const starter_agriculture_name = "Starter-Agriculture"

    const corporation_constants = ns.corporation.getConstants();

    // TODO: source factors from ns.corporation.getIndustryData()
    
    const agriculture_industry_data = {
        "startingCost":40000000000,
        "description":"Cultivate crops and breed livestock to produce food.",
        "recommendStarting":true,
        "realEstateFactor":0.72,
        "scienceFactor":0.5,
        "hardwareFactor":0.2,
        "robotFactor":0.3,
        "aiCoreFactor":0.3,
        "advertisingFactor":0.04,
        "requiredMaterials":{
            "Water":0.5,
            "Chemicals":0.2
        },
        "producedMaterials":["Plants","Food"],
        "makesMaterials":true,
        "makesProducts":false
    }

    // const corporation_constants = {"PurchaseMultipliers":
    //     {"x1":1,"x5":5,"x10":10,"x50":50,"x100":100,"MAX":"MAX"},
    //     "baseProductProfitMult":5,
    //     "bribeAmountPerReputation":1000000000,
    //     "bribeThreshold":100000000000000,
    //     "dividendMaxRate":1,
    //     "employeePositions":["Operations","Engineer","Business","Management","Research & Development","Intern","Unassigned"],
    //     "employeeRaiseAmount":50,
    //     "employeeSalaryMultiplier":3,
    //     "gameCyclesPerCorpStateCycle":10,
    //     "gameCyclesPerMarketCycle":50,
    //     "industryNames":["Water Utilities","Spring Water","Agriculture","Fishing","Mining","Refinery","Restaurant","Tobacco","Chemical","Pharmaceutical","Computer Hardware","Robotics","Software","Healthcare","Real Estate"],
    //     "initialShares":1000000000,
    //     "issueNewSharesCooldown":72000,
    //     "marketCyclesPerEmployeeRaise":400,
    //     "materialNames":["Water","Ore","Minerals","Food","Plants","Metal","Hardware","Chemicals","Drugs","Robots","AI Cores","Real Estate"],
    //     "maxProductsBase":3,
    //     "minEmployeeDecay":10,
    //     "officeInitialCost":4000000000,
    //     "officeInitialSize":3,"officeSizeUpgradeCostBase":1000000000,
    //     "researchNames":["Hi-Tech R&D Laboratory","AutoBrew","AutoPartyManager","Automatic Drug Administration","CPH4 Injections","Drones","Drones - Assembly","Drones - Transport","Go-Juice","HRBuddy-Recruitment","HRBuddy-Training","Market-TA.I","Market-TA.II","Overclock","Self-Correcting Assemblers","Sti.mu","uPgrade: Capacity.I","uPgrade: Capacity.II","uPgrade: Dashboard","uPgrade: Fulcrum"],
    //     "researchNamesBase":["Hi-Tech R&D Laboratory","AutoBrew","AutoPartyManager","Automatic Drug Administration","CPH4 Injections","Drones","Drones - Assembly","Drones - Transport","Go-Juice","HRBuddy-Recruitment","HRBuddy-Training","Market-TA.I","Market-TA.II","Overclock","Self-Correcting Assemblers","Sti.mu"],
    //     "researchNamesProductOnly":["uPgrade: Capacity.I","uPgrade: Capacity.II","uPgrade: Dashboard","uPgrade: Fulcrum"],
    //     "secondsPerMarketCycle":10,
    //     "sellSharesCooldown":18000,
    //     "sharesPerPriceUpdate":1000000,
    //     "smartSupplyOptions":["leftovers","imports","none"],
    //     "stateNames":["START","PURCHASE","PRODUCTION","EXPORT","SALE"],
    //     "teaCostPerEmployee":500000,
    //     "unlockNames": ["Export","Smart Supply","Market Research - Demand","Market Data - Competition","VeChain","Shady Accounting","Government Partnership","Warehouse API","Office API"],
    //     "upgradeNames":["Smart Factories","Smart Storage","DreamSense","Wilson Analytics","Nuoptimal Nootropic Injector Implants","Speech Processor Implants","Neural Accelerators","FocusWires","ABC SalesBots","Project Insight"],
    //     "warehouseInitialCost":5000000000,
    //     "warehouseInitialSize":100,
    //     "warehouseSizeUpgradeCostBase":1000000000
    // }



    //
    // ns.corporation.acceptInvestmentOffer();
    // ns.corporation.bribe();
    // ns.corporation.bulkPurchase();
    // ns.corporation.buyBackShares();
    // ns.corporation.buyMaterial();
    // ns.corporation.buyTea();
    // ns.corporation.cancelExportMaterial();
    // ns.corporation.discontinueProduct();
    // ns.corporation.expandCity();
    // ns.corporation.expandIndustry();
    // ns.corporation.exportMaterial();
    // ns.corporation.getBonusTime();

    // const corporation = {"name":"StartCorp",
    //     "funds":1948746252.1406486,
    //     "revenue":37512.13576130922,
    //     "expenses":23066.63461007955,
    //     "public":false,
    //     "totalShares":1500000000,
    //     "numShares":1000000000,
    //     "shareSaleCooldown":0,
    //     "investorShares":500000000,
    //     "issuedShares":0,
    //     "issueNewSharesCooldown":0,
    //     "sharePrice":0.07500412355878855,
    //     "dividendRate":0,
    //     "dividendTax":0.15,
    //     "dividendEarnings":0,
    //     "nextState":"START",
    //     "prevState":"SALE",
    //     "divisions":["Agro1","Tobacco1"],
    //     "state":"START"
    // }



    

    // const division = {
    //     "name":"Starter-Agriculture",
    //     "type":"Agriculture",
    //     "awareness":6.045074999999999,
    //     "popularity":1.9793499999999493,
    //     "productionMult":6,
    //     "researchPoints":55.5138812540844,
    //     "lastCycleRevenue":270294.0756428173,
    //     "lastCycleExpenses":96576.94725736526,
    //     "thisCycleRevenue":0,
    //     "thisCycleExpenses":888832.3628818723,
    //     "numAdVerts":2,
    //     "cities":["Sector-12","Aevum","Chongqing","New Tokyo","Ishima","Volhaven"],
    //     "products":[],
    //     "makesProducts":false,
    //     "maxProducts":0
    // }

    // ns.print(JSON.stringify(division));

    // ns.corporation.getHireAdVertCost();
    // ns.corporation.getHireAdVertCount();

    // const agriculture_industry_data = ns.corporation.getIndustryData("Agriculture");
    // const agriculture_industry_data = {
    //     "startingCost":40000000000,
    //     "description":"Cultivate crops and breed livestock to produce food.",
    //     "recommendStarting":true,
    //     "realEstateFactor":0.72,
    //     "scienceFactor":0.5,
    //     "hardwareFactor":0.2,
    //     "robotFactor":0.3,
    //     "aiCoreFactor":0.3,
    //     "advertisingFactor":0.04,
    //     "requiredMaterials":{
    //         "Water":0.5,
    //         "Chemicals":0.2
    //     },
    //     "producedMaterials":["Plants","Food"],
    //     "makesMaterials":true,
    //     "makesProducts":false
    // }
    // ns.print(JSON.stringify(industry_data));

    while (true)
    {
        
        // const office : Office = {
        //     "city":"Sector-12",
        //     "size":4,
        //     "maxEnergy":100,
        //     "maxMorale":100,
        //     "numEmployees":4,
        //     "avgEnergy":100,
        //     "avgMorale":100,
        //     "totalExperience":252.54000000000013,
        //     "employeeProductionByJob":{
        //         "total":896.6900000000002,
        //         "Operations":227.18500000000003,
        //         "Engineer":251.22750000000005,
        //         "Business":133.91750000000002,
        //         "Management":284.36,
        //         "Research & Development":0,
        //         "Intern":0,"Unassigned":0},
        //         "employeeJobs":{
        //             "Operations":1,
        //             "Engineer":1,
        //             "Business":1,
        //             "Management":1,
        //             "Research & Development":0,
        //             "Intern":0,
        //             "Unassigned":0
        //         }
        // }
        
        // ns.print(JSON.stringify(office));
        // ns.print(division.productionMult)

        // CERES SOLVER APPROACH

        // const material = ns.corporation.getMaterialData("Chemicals")
        // ns.print(material)

        // const solver = new Ceres();

        // solver.addFunction(boostMaterialOptimizer)

        

        



        // let s;

        // await solver.solve ("max", x_guess)

        // await solver.promise.then(function(result) { 
        // 	// const x_guess = [0.5,0.5] //Guess the initial values of the solution.
        // 	//var x_scale = [100,100] //Set the scale of the values in the function only positive values here.
        // 	s = solver.solve("max", x_guess) //Solve the equation
        // 	//console.log(solver.get_results())
        // 	//console.log(solver.get_status())
        // 	//console.log(solver.get_report())
        // 	s = solver.get_results()
        // 	solver.remove() //required to free the memory in C++
        //     // test = result;
        // })

        // ns.print(s)

        // const sum_of_coefficients = .72 + .2 + .3 + .3;
        // const sum_of_coefficients_divided_by_current = sum_of_coefficients/.72;
        // const something = 0.005/0.72 * ((0.2+0.3+0.3)-(0.06+0.5+0.1))
        // const more_something = 1-500*something;
        // const maybe = more_something / sum_of_coefficients_divided_by_current;
        // const hopefully = maybe / 0.005;
        // ns.print(maybe)


        // // TODO: source factors from ns.corporation.getIndustryData()
        
        // const agriculture_industry_data = {
        //     "startingCost":40000000000,
        //     "description":"Cultivate crops and breed livestock to produce food.",
        //     "recommendStarting":true,
        //     "realEstateFactor":0.72,
        //     "scienceFactor":0.5,
        //     "hardwareFactor":0.2,
        //     "robotFactor":0.3,
        //     "aiCoreFactor":0.3,
        //     "advertisingFactor":0.04,
        //     "requiredMaterials":{
        //         "Water":0.5,
        //         "Chemicals":0.2
        //     },
        //     "producedMaterials":["Plants","Food"],
        //     "makesMaterials":true,
        //     "makesProducts":false
        // }


        // let test = 1 - (500 * )

        // TODO: scienceFactor???
        // TODO: Where is the * 10 coming from?
        // const agriculture_industry_data = {
        //     "startingCost":40000000000,
        //     "description":"Cultivate crops and breed livestock to produce food.",
        //     "recommendStarting":true,
        //     "realEstateFactor":0.72,
        //     "scienceFactor":0.5,
        //     "hardwareFactor":0.2,
        //     "robotFactor":0.3,
        //     "aiCoreFactor":0.3,
        //     "advertisingFactor":0.04,
        //     "requiredMaterials":{
        //         "Water":0.5,
        //         "Chemicals":0.2
        //     },
        //     "producedMaterials":["Plants","Food"],
        //     "makesMaterials":true,
        //     "makesProducts":false
        // }
        
        
        const division = ns.corporation.getDivision(starter_agriculture_name);
        
        let warehouse_space = 0;

        for (let i = 0; i < division.cities.length; i++)
        {
            if (!ns.corporation.hasWarehouse(starter_agriculture_name, division.cities[i]))
                continue;
            const warehouse = ns.corporation.getWarehouse(starter_agriculture_name, division.cities[i])
            warehouse_space += warehouse.size;
            // const warehouse = {
            //     "level":24,
            //     "city":"Ishima",
            //     "size":3120.0000000000005,
            //     "sizeUsed":2997.4519908189977,
            //     "smartSupplyEnabled":true
            // }
            
            // ns.print(warehouse)
        }

        // ns.print(warehouse_space);
        // ns.print(division.cities.length);

        // const REAL_ESTATE_SIZE = 0.005;
        // const HARDWARE_SIZE = 0.06;
        // const ROBOT_SIZE = 0.5;
        // const AI_CORE_SIZE = 0.1;
        // const S = "storage";
        // const s1 = REAL_ESTATE_SIZE;
        // const s2 = HARDWARE_SIZE;
        // const s3 = ROBOT_SIZE;
        // const s4 = AI_CORE_SIZE;
        // const x = 0 // real estate
        // const y = 0 //hardware
        // const z = 0 // robots
        // const w = 0 // ai cores

        // S = (Math.pow(0.002 * x + 1, boostMaterialCoefficients["realEstateFactor"]) * production_size_before_boost) + s1 * x + s2 * y + s3 * z + s4 * w


        const office = ns.corporation.getOffice(starter_agriculture_name, "Sector-12");
        

        const production_before_boost_materials = Math.round(10 * calculateOfficeProductionMultiplier(office, true) * calculateResearchProductionMultiplier() * calculateResearchProductionMultiplier() * calculateUpgradeProductionMultiplier() * 1000) / 1000;
        const production_size_before_boost = production_before_boost_materials * getBaseProductionSize(ns, agriculture_industry_data.producedMaterials)
        


        // ns.print(production_size_before_boost)



        // ns.print(agriculture_industry_data)
        // // ns.print(optimal_boost_material_amounts)

        // ns.print(production_before_boost_materials)

        let boost = 1;
        let optimal_boost_material_amounts = {};
        let reserved = 0;
        const counter = 0;
        do {
            reserved += production_size_before_boost * boost * 100 / 99;
            optimal_boost_material_amounts = calculateOptimalBoostMaterialAmounts(warehouse_space - reserved, {...agriculture_industry_data});
            boost = calculateDivisioinProductionMultiplier(agriculture_industry_data, optimal_boost_material_amounts);
            
            // counter++;
            // ns.print(counter);
            ns.print(reserved)
            await ns.sleep(20);
            // ns.print(production_size_before_boost * boost)
        } while (boost * production_size_before_boost * division.cities.length > reserved)
            ns.print(production_before_boost_materials)
            ns.print(production_size_before_boost)
            ns.print(boost)
            ns.print(reserved)
            ns.print(optimal_boost_material_amounts)

        // ns.print(optimal_boost_material_amounts)

        
        const producedMaterials = agriculture_industry_data.producedMaterials
        const requiredMaterials = agriculture_industry_data.requiredMaterials;

        // purchases/sales are per second.......
        //TODO: bonus time.....
        const buy_sell_multiplier = (1 / ns.corporation.getConstants().secondsPerMarketCycle)

        

        // const division = ns.corporation.getDivision(starter_agriculture_name);
        for(let i = 0; i < division.cities.length; i++) {
            if (!ns.corporation.hasWarehouse(starter_agriculture_name, division.cities[i]))
                continue;
            const office = ns.corporation.getOffice(starter_agriculture_name, division.cities[i]);
            const production = 10 * calculateOfficeProductionMultiplier(office, true) * boost * calculateResearchProductionMultiplier() * calculateUpgradeProductionMultiplier();

            for (let j = 0; j < Object.keys(requiredMaterials).length; j++) {
                const material_to_buy = Object.keys(requiredMaterials)[j]
                const amount_to_buy = production * requiredMaterials[material_to_buy];
                const current_stored = ns.corporation.getMaterial(starter_agriculture_name, division.cities[i], material_to_buy).stored
                if (current_stored > amount_to_buy)
                {
                    ns.corporation.sellMaterial(division.name, division.cities[i], material_to_buy, (current_stored - amount_to_buy)  * buy_sell_multiplier, "MP")
                    ns.corporation.buyMaterial(division.name, division.cities[i], material_to_buy, 0 * buy_sell_multiplier)
                }
                else if (current_stored < amount_to_buy)
                {
                    ns.corporation.sellMaterial(division.name, division.cities[i], material_to_buy, 0 * buy_sell_multiplier, "MP")
                    ns.corporation.buyMaterial(division.name, division.cities[i], material_to_buy, (amount_to_buy - current_stored) * buy_sell_multiplier)
                }
                else {
                    ns.corporation.sellMaterial(division.name, division.cities[i], material_to_buy, 0 * buy_sell_multiplier, "MP")
                    ns.corporation.buyMaterial(division.name, division.cities[i], material_to_buy, 0 * buy_sell_multiplier)
                }
            }

            
            // TODO: calculate sales better
            for (let j = 0; j < producedMaterials.length; j++) {
                ns.corporation.sellMaterial(division.name, division.cities[i], producedMaterials[j], "MAX", "MP")
            }


            const cur_warehouse = ns.corporation.getWarehouse(starter_agriculture_name, division.cities[i])
            for(let j = 0; j < Object.keys(optimal_boost_material_amounts).length; j ++)
            {
                const boost_material = Object.keys(optimal_boost_material_amounts)[j];
                const desired_boost_material_amount = optimal_boost_material_amounts[boost_material] / warehouse_space * cur_warehouse.size;
    
                const current_stored = ns.corporation.getMaterial(starter_agriculture_name, division.cities[i], boost_material).stored
                if (current_stored > desired_boost_material_amount)
                {
                    ns.corporation.sellMaterial(division.name, division.cities[i], boost_material, (current_stored - desired_boost_material_amount)  * buy_sell_multiplier, "MP")
                    ns.corporation.buyMaterial(division.name, division.cities[i], boost_material, 0 * buy_sell_multiplier)
                }
                else if (current_stored < desired_boost_material_amount)
                {
                    ns.corporation.sellMaterial(division.name, division.cities[i], boost_material, 0 * buy_sell_multiplier, "MP")
                    ns.corporation.buyMaterial(division.name, division.cities[i], boost_material, (desired_boost_material_amount - current_stored)  * buy_sell_multiplier)
                }
                else {
                    ns.corporation.sellMaterial(division.name, division.cities[i], boost_material, 0 * buy_sell_multiplier, "MP")
                    ns.corporation.buyMaterial(division.name, division.cities[i], boost_material, 0 * buy_sell_multiplier)
                }
    
                // ns.corporation
            }
            // ns.exit()
        }
        await ns.corporation.nextUpdate()
    }
    


    


    // solver.add_function(boostMaterialOptimizer)
    // solver.add_less_than_or_equal_to_constraint(boostMaterialOptimizerConstraint)
    // solver.solve("max", [1,1,1,1])
    // ns.print(solver.get_report())
    
    // ns.print();
    // ns.print("test")

    // {
    //     "name":"Real Estate",
    //     "size":0.005,
    //     "demandBase":50,
    //     "demandRange":[5,99],
    //     "competitionBase":50,
    //     "competitionRange":[25,75],
    //     "baseCost":80000,
    //     "maxVolatility":1.5,
    //     "baseMarkup":1.5
    // }

    // const production_factor = calculateProductionFactor()


    // ns.corporation.getInvestmentOffer();
    // ns.corporation.getMaterial();
    // ns.corporation.getMaterialData();
    
    // ns.corporation.getOfficeSizeUpgradeCost();
    // ns.corporation.getProduct();
    // ns.corporation.getResearchCost();
    // ns.corporation.getUnlockCost();
    // ns.corporation.getUpgradeLevel();
    // ns.corporation.getUpgradeLevelCost();
    // ns.corporation.getUpgradeWarehouseCost();
    // ns.corporation.getWarehouse();
    // ns.corporation.goPublic();
    // ns.corporation.hasResearched();
    // ns.corporation.hasUnlock();
    // ns.corporation.hasWarehouse();
    // ns.corporation.hireAdVert();
    // ns.corporation.hireEmployee();
    // ns.corporation.issueDividends();
    // ns.corporation.issueNewShares();
    // ns.corporation.levelUpgrade();
    // ns.corporation.limitMaterialProduction();
    // ns.corporation.limitProductProduction();
    // ns.corporation.makeProduct();
    // ns.corporation.nextUpdate();
    // ns.corporation.getBonusTime
    // ns.corporation.purchaseUnlock();
    // ns.corporation.purchaseWarehouse();
    // ns.corporation.research();
    // ns.corporation.sellDivision();
    // ns.corporation.sellMaterial();
    // ns.corporation.sellProduct();
    // ns.corporation.sellShares();
    // ns.corporation.setAutoJobAssignment();
    // ns.corporation.setMaterialMarketTA1();
    // ns.corporation.setMaterialMarketTA2();
    // ns.corporation.setProductMarketTA1();
    // ns.corporation.setProductMarketTA2();
    // ns.corporation.setSmartSupply();
    // ns.corporation.setSmartSupplyOption();
    // ns.corporation.throwParty();
    // ns.corporation.upgradeOfficeSize();
    // ns.corporation.upgradeWarehouse();

    // ns.corporation.unlo

    // ns.print(ns.corporation.hasUnlock("Smart Supply"))

    // ns.print(ns.corporation.hasUnlock("Export"))

    
    

    // ns.print(JSON.stringify(ns.enums.CityName))


    // ns.print(JSON.stringify(corporation));

    

    // ns.print(JSON.stringify(current_node))

    // if (!ns.corporation.hasCorporation())
    // {
    //     if (current_node === 3) 
    //     {
    //         // Can use seed money in bitnode 3
    //         ns.corporation.createCorporation(corporation_name, false)

    //     }
    //     else
    //     {
    //         // TODO: determine if appropriate to start corp
    //     }
            
    // }

    // TODO: determine smart supply alternative?
    // TODO: ensure smart supply purchased
    // get_smart_supply(ns);

}
