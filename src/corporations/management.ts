import { CityName, NS, Office } from '@ns'
import { 
    // calculateProductionFactor,
    calculateOfficeProductionMultiplier,
    // boostMaterialOptimizer,
    // boostMaterialOptimizerConstraint,
    calculateResearchProductionMultiplier,
    calculateUpgradeProductionMultiplier,
    calculateOptimalBoostMaterialAmounts,
    getBaseProductionSize,
    getBaseInputSize,
    calculateDivisioinProductionMultiplier,
    STARTING_PRODUCT_SELL_PRICE_GUESS
 } from '/lib/corporations/calculations';

 import {
    getProductData,
    storeProductData
 } from '/lib/corporations/data_storage'


export async function main(ns : NS) : Promise<void> {

    // purchases/sales are per second.......
    //TODO: bonus time.....
    const buy_sell_multiplier = (1 / ns.corporation.getConstants().secondsPerMarketCycle)

    
    // const current_node = ns.getResetInfo().currentNode;


    // const corporation_name = "Evil Corp"
    // const starter_agriculture_name = "Starter-Agriculture"

    // const corporation_constants = ns.corporation.getConstants();

    // TODO: source factors from ns.corporation.getIndustryData()
    
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

    // eslint-disable-next-line no-constant-condition
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
        //    * 10 comes from products being per second and 10 seconds per cycle I think
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

        const corporation = ns.corporation.getCorporation();


        // each division
        for (let division_iterator = 0; division_iterator < corporation.divisions.length; division_iterator++)
        {
            const division = ns.corporation.getDivision(corporation.divisions[division_iterator]);
                
            const industry_data = ns.corporation.getIndustryData(division.type)
        
            // Get total warehouse space for division
            const warehouse_space = getTotalWarehouseSpaceForDivision(ns, division);
            

            // Calculate optimal boost materials for division
            // TODO: don't use first office as default
            const office = ns.corporation.getOffice(division.name, division.cities[0]);

            const production_before_boost_materials = 10 * calculateOfficeProductionMultiplier(office, true) * calculateResearchProductionMultiplier(ns, division.name) * calculateUpgradeProductionMultiplier(ns);
            let production_size_before_boost;
            if (division.makesProducts)
            {
                let total_product_size = 0
                for(let product_iterator = 0; product_iterator < division.products.length; product_iterator++)
                {
                    const product = ns.corporation.getProduct(division.name, division.cities[0], division.products[product_iterator])
                    if (product.developmentProgress === 100)
                        total_product_size += product.size;
                }
                // TODO: source product size
                // TODO: WHY *2????
                production_size_before_boost = total_product_size * production_before_boost_materials * 2;
            }
            else
            {
                production_size_before_boost = production_before_boost_materials * getBaseProductionSize(ns, industry_data.producedMaterials)

            }
            let input_size_before_boost = production_before_boost_materials * getBaseInputSize(ns, industry_data.requiredMaterials)
            if (division.makesProducts)
            {
                // TODO: WHY *2????
                input_size_before_boost = input_size_before_boost * division.products.length * 2;
            }
            let boost = 1;
            let optimal_boost_material_amounts = {};
            // TODO: Account for inputs and outputs not necessarily existing simultaneously in the case of no exports?
            let reserved = (production_size_before_boost + input_size_before_boost) * boost;
            // const counter = 0;
            do {
                reserved += (production_size_before_boost + input_size_before_boost) * boost / 100;
                optimal_boost_material_amounts = calculateOptimalBoostMaterialAmounts(warehouse_space - reserved, {...industry_data});
                boost = calculateDivisioinProductionMultiplier(industry_data, optimal_boost_material_amounts);
                
                // TODO: 2* ???
            } while (1.25 * boost * (production_size_before_boost + input_size_before_boost) * division.cities.length > reserved)

            
            // ns.print(production_size_before_boost*boost)
            // ns.print(production_before_boost_materials)
            // ns.print(production_size_before_boost)
            // ns.print(boost)
            // ns.print(reserved)
            // ns.print(optimal_boost_material_amounts)

            const requiredMaterials = industry_data.requiredMaterials;

            // TODO: exports
            
            
            for(let i = 0; i < division.cities.length; i++) {

                if (!ns.corporation.hasWarehouse(division.name, division.cities[i]))
                    continue;


                // Buy stuff
                if (ns.corporation.getCorporation().nextState === "PURCHASE")
                {
                    // Buy boost materials
                    const cur_warehouse = ns.corporation.getWarehouse(division.name, division.cities[i])
                    for(let j = 0; j < Object.keys(optimal_boost_material_amounts).length; j ++)
                    {
                        const boost_material = Object.keys(optimal_boost_material_amounts)[j];
                        const desired_boost_material_amount = Math.floor(optimal_boost_material_amounts[boost_material] / warehouse_space * cur_warehouse.size * 1000) / 1000;
            
                        const current_stored = ns.corporation.getMaterial(division.name, division.cities[i], boost_material).stored
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
            
                    }
                
                    
                    // Buy Inputs
                    if (!ns.corporation.hasWarehouse(division.name, division.cities[i]))
                        continue;
                    const office = ns.corporation.getOffice(division.name, division.cities[i]);
                    const production = 10 * calculateOfficeProductionMultiplier(office, true) * boost * calculateResearchProductionMultiplier(ns, division.name) * calculateUpgradeProductionMultiplier(ns);

                    for (let j = 0; j < Object.keys(requiredMaterials).length; j++) {
                        const material_to_buy = Object.keys(requiredMaterials)[j]
                        let amount_to_buy = production * requiredMaterials[material_to_buy];
                        if (division.makesProducts)
                        {
                            // WHYYYYYY???????
                            amount_to_buy = amount_to_buy * division.products.length * 4.1/3
                        }
                        const current_stored = ns.corporation.getMaterial(division.name, division.cities[i], material_to_buy).stored
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

                }



                // Sell outputs
                if (ns.corporation.getCorporation().nextState === "SALE")
                {
                    let producedMaterials = [];
                    let products = [];
                    if (!division.makesProducts)
                        producedMaterials = industry_data.producedMaterials;
                    else
                        products = division.products;

                    const business_production = 1 + office.employeeProductionByJob["Business"];
                    const business_factor = Math.pow(business_production, 0.26) + (business_production * 0.001)
                    const awareness_factor = Math.pow(division.awareness + 1, industry_data.advertisingFactor)
                    const popularity_factor = Math.pow(division.popularity + 1, industry_data.advertisingFactor)
                    let ratio_factor = 0.01;
                    const advert_factor = Math.pow(awareness_factor * popularity_factor * ratio_factor, 0.85);
                    const sales_bots_bonus = 1 + 0.01 * ns.corporation.getUpgradeLevel("ABC SalesBots");
                    // TODO: Research bonus (NOT YET IMPLEMENTED)
                    const research_bonus = 1;

                    if (division.awareness !== 0) {
                        ratio_factor = Math.max(0.01, (division.popularity + 0.001) / division.awareness)
                    }

                    // TODO: calculate sales better
                    for (let j = 0; j < producedMaterials.length; j++) {
                        // TODO: BETTER DETERMINANT OF WHAT TO EXPORT WHEN WHERE
                        // EXPORT COMES BEFORE SALE
                        if(producedMaterials[j] === "Chemicals")
                            continue;

                        if (ns.corporation.hasUnlock("Market Research - Demand") && ns.corporation.hasUnlock("Market Data - Competition"))
                        {
                            // TODO: products
                            // ADDITIONAL TODO: products don't need demand/competition unlock
                            // let product_multiplier = 0.5 * Math.pow(ProductEffectiveRating, 0.65)
                            const material = ns.corporation.getMaterial(division.name, division.cities[i], producedMaterials[j])
                            const material_quality = material.quality;
                            const item_multiplier = (material_quality + 0.001);
                            const demand = material.demand;
                            const competition = material.competition;
                            const market_factor = Math.max(0.1, demand * (100 - competition) * 0.01)
                            // ns.print(market_factor)
                            // ns.exit();
                            
                            const M = item_multiplier * business_factor * advert_factor * market_factor * sales_bots_bonus * research_bonus;
                            // ns.print(M)
                            // ns.exit();
                            
                            // TODO: Account for leftovers??

                            const market_price = material.marketPrice;
                            // const markup_limit = "????"
                            // ns.print(market_price)
                            // ns.exit();
                            // ns.print(producedMaterials)
                            // ns.exit();
                            
                            // const selling_price = Math.pow(material_quality * Math.pow(M, 1/2) / Math.pow(production / 10, 1/2), 1/2) + market_price;
                            
                            // TODO: I THINK I FUCKED SOMETHING UP HERE
                            // const selling_price = market_price + (Math.pow(M, 1/4) * Math.pow(material_quality, 1/2) / Math.pow(production / 10, 1/4));

                            // TODO: THIS IS A (TEMPORARY?) DUMP ALL SOLUTION INSTEAD OF APPROPRIATELY SELLING ONLY PRODUCTION
                            const selling_price = market_price + (Math.pow(M, 1/4) * Math.pow(material_quality, 1/2) / Math.pow(material.stored, 1/4));
                            const markup = selling_price - market_price;
                            // ns.print(markup);

                            // ns.print(ns.corporation.getMaterial(division.name, division.cities[i], producedMaterials[j]).demand)
                            // ns.print(selling_price)
                            // ns.exit()
                            // 
                            if (selling_price === Infinity) {
                                // Happens when selling water
                                // TODO: Determine why
                                ns.corporation.sellMaterial(division.name, division.cities[i], producedMaterials[j], "MAX", "MP")
                            }
                            else
                                ns.corporation.sellMaterial(division.name, division.cities[i], producedMaterials[j], "MAX", selling_price)
                        }
                        else
                        {
                            ns.print("BUY DEMAND AND COMPETITION")
                            ns.corporation.sellMaterial(division.name, division.cities[i], producedMaterials[j], "MAX", "MP")
                        }
                            
                    }

                    for(let product_iterator = 0; product_iterator < division.products.length; product_iterator++)
                    {
                        const product = ns.corporation.getProduct(division.name, division.cities[i], division.products[product_iterator])
                        
                        if (product.developmentProgress !== 100 || product.stored == 0)
                        {
                            // Still in development
                            continue;
                        }
                        const product_data = getProductData(ns, division.name, division.cities[i], product.name);

                        if (
                            Object.prototype.hasOwnProperty.call(product_data, "markupLimit")
                        )
                        {
                            //ns.print("got here")
                            // ns.print("hmmmm")
                            let market_price = 0
                            const inputs = industry_data.requiredMaterials;
                            for (let product_input_iterator = 0; product_input_iterator < Object.keys(inputs).length; product_input_iterator++)
                            {
                                market_price += ns.corporation.getMaterial(division.name, division.cities[i], Object.keys(inputs)[product_input_iterator]).marketPrice * inputs[Object.keys(inputs)[product_input_iterator]]
                            }
                            // ALT SOLUTION?
                            // market_price = ns.corporation.getProduct().productionCost
                            
                            const item_multiplier = 0.5 * Math.pow(product.effectiveRating, 0.65);
                            const demand = product.demand;
                            const competition = product.competition;
                            const market_factor = Math.max(0.1, demand * (100 - competition) * 0.01)
                            const M = item_multiplier * business_factor * advert_factor * market_factor * sales_bots_bonus * research_bonus;
                            const markup_limit = product_data.markupLimit

                            // TODO: don't use stored?
                            const sell_price = markup_limit * Math.pow(M, 1/2) / Math.pow(product.stored / 10, 1/2) + market_price;
                            if (sell_price == Infinity)
                            {
                                // ns.print(markup_limit);
                                // ns.print(M);
                                // ns.print(product.stored)
                                ns.print("Infinite????")
                            }
                            else
                                ns.corporation.sellProduct(division.name, division.cities[i], product.name, product.stored, sell_price, false);
                        }
                        else 
                        {
                            if (
                                parseFloat(product_data.desiredSellAmount) > 0
                            )
                            {
                                // TODO
                                const decimal_percentage_of_desired_sold = parseFloat(product.actualSellAmount) / parseFloat(product.desiredSellAmount);
                                if (decimal_percentage_of_desired_sold > 0.95) {
                                    ns.corporation.sellProduct(division.name, division.cities[i], product.name, product.stored, product.desiredSellPrice * 1.2, false);
                                    ns.print(`new sell value: ${product.desiredSellPrice * 1.2}`)
                                }
                                else if (decimal_percentage_of_desired_sold < 0.00001) {
                                    ns.corporation.sellProduct(division.name, division.cities[i], product.name, product.stored, product.desiredSellPrice * 0.9, false);
                                    ns.print(`new sell value: ${product.desiredSellPrice * 0.9}`)
                                }
                                else
                                {
                                    // ns.corporation.getMaterial()
                                    // Sum of input materials?
                                    let market_price = 0
                                    const inputs = industry_data.requiredMaterials;
                                    for (let product_input_iterator = 0; product_input_iterator < Object.keys(inputs).length; product_input_iterator++)
                                    {
                                        market_price += ns.corporation.getMaterial(division.name, division.cities[i], Object.keys(inputs)[product_input_iterator]).marketPrice * inputs[Object.keys(inputs)[product_input_iterator]]
                                    }
                                    // ALT SOLUTION?
                                    // market_price = product.productionCost
                                    
                                    const item_multiplier = 0.5 * Math.pow(product.effectiveRating, 0.65);
                                    const demand = product.demand;
                                    const competition = product.competition;
                                    const market_factor = Math.max(0.1, demand * (100 - competition) * 0.01)
                                    const M = item_multiplier * business_factor * advert_factor * market_factor * sales_bots_bonus * research_bonus;
                                    const markup_limit = (parseFloat(product.desiredSellPrice) - market_price) * Math.pow(parseFloat(product.actualSellAmount) / M, 1/2)

                                    // TODO: don't use stored?
                                    const sell_price = markup_limit * Math.pow(M, 1/2) / Math.pow(product.stored / 10, 1/2) + market_price
                                    ns.print(markup_limit);
                                    ns.print(M);
                                    ns.print(product.stored)
                                    // ns.print(sell_price);
                                    // ns.print(markup_limit);
                                    // ns.print(M);
                                    // ns.print(product.stored)
                                    // ns.print(market_price);
                                    ns.corporation.sellProduct(division.name, division.cities[i], product.name, product.stored, sell_price, false);

                                    product.markupLimit = markup_limit;
                                    if (sell_price == Infinity)
                                    {
                                        // ns.print(markup_limit);
                                        // ns.print(M);
                                        // ns.print(product.stored)
                                        ns.print("Infinite????")
                                    }
                                    else
                                        storeProductData(ns, division.name, division.cities[i], product.name, product);
                                }

                            }
                            else 
                            {
                                // Sell for high value to calculate markup limit
                                ns.corporation.sellProduct(division.name, division.cities[i], product.name, product.stored, STARTING_PRODUCT_SELL_PRICE_GUESS, false);
                            }
                            

                            storeProductData(ns, division.name, division.cities[i], product.name, product);
                            // ns.print("stored?")
                            // ns.print(product)

                        }
                        // ns.print(product_data)

                    }
                }


                // TODO: set exports



                //  Hire one of each employee
                if (ns.corporation.getCorporation().nextState === "START")
                {
                    const office = ns.corporation.getOffice(division.name, division.cities[i]);
                    while (office.numEmployees < office.size) {
                        ns.corporation.hireEmployee(division.name, division.cities[i], "Research & Development")
                    }
                    const office_upgrade_cost = ns.corporation.getOfficeSizeUpgradeCost(division.name, division.cities[i], 6);
                    if (ns.corporation.getCorporation().funds > office_upgrade_cost)
                    {
                        ns.corporation.upgradeOfficeSize(division.name, division.cities[i], 6);
                        ns.corporation.hireEmployee(division.name, division.cities[i], "Business")
                        ns.corporation.hireEmployee(division.name, division.cities[i], "Engineer")
                        ns.corporation.hireEmployee(division.name, division.cities[i], "Intern")
                        ns.corporation.hireEmployee(division.name, division.cities[i], "Management")
                        ns.corporation.hireEmployee(division.name, division.cities[i], "Operations")
                        ns.corporation.hireEmployee(division.name, division.cities[i], "Research & Development")
                    }
                    
                }

                // Tea and Parties
                if (ns.corporation.getCorporation().nextState === "START")
                    {
                       const office = ns.corporation.getOffice(division.name, division.cities[i]);
                       if (office.numEmployees == 0)
                           continue;
                       // TODO: increased max energy?
                       if (office.avgEnergy < 100)
                       {
                           if (ns.corporation.getCorporation().funds > ns.corporation.getConstants().teaCostPerEmployee * office.numEmployees)
                               ns.corporation.buyTea(division.name, division.cities[i]);
                       }
                       // TODO: increased max morale?
                       const max_morale = 100
                       if (office.avgMorale < max_morale)
                       {
                           // office.numEmployees()
                           const desired_morale_increase = max_morale - office.avgMorale;
                           const desired_party_mult = (desired_morale_increase / 10) + 1
                           const party_cost_per_employee = (desired_party_mult - 1) * Math.pow(10, 7)
                           if (party_cost_per_employee * office.numEmployees < ns.corporation.getCorporation().funds)
                           {
                               ns.corporation.throwParty(division.name, division.cities[i], party_cost_per_employee)
                           }
                           else if (Math.floor(ns.corporation.getCorporation().funds / office.numEmployees) > Math.pow(10, 6))
                           {
                               ns.corporation.throwParty(division.name, division.cities[i], Math.floor(ns.corporation.getCorporation().funds / office.numEmployees))
                           }
                           
                       }
                    }



            }


        }

        // if (ns.corporation.getCorporation().funds > ns.corporation.getUpgradeLevelCost("Project Insight"))
        //     ns.corporation.levelUpgrade("Project Insight");
        // if (ns.corporation.getCorporation().funds > ns.corporation.getUpgradeLevelCost("Smart Factories"))
        //     ns.corporation.levelUpgrade("Smart Factories");
        // if (ns.corporation.getCorporation().funds > ns.corporation.getUpgradeLevelCost("Smart Storage"))
        //     ns.corporation.levelUpgrade("Smart Storage");

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


export function getTotalWarehouseSpaceForDivision(ns : NS, division : Division) {
    let warehouse_space = 0
    for (let i = 0; i < division.cities.length; i++)
    {
        if (!ns.corporation.hasWarehouse(division.name, division.cities[i]))
            continue;
        const warehouse = ns.corporation.getWarehouse(division.name, division.cities[i])
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
    return warehouse_space
}
