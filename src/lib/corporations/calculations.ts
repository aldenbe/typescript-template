import { NS, Office, CorpMaterialName } from '@ns'

interface BoostMaterialCoefficients {
    "realEstateFactor": number,
    "hardwareFactor": number
    "robotFactor": number,
    "aiCoreFactor": number
}

// TODO: source naterial data from ns.corporation.getMaterialData("Real Estate")
const REAL_ESTATE_SIZE = 0.005;
const HARDWARE_SIZE = 0.06;
const ROBOT_SIZE = 0.5;
const AI_CORE_SIZE = 0.1;
const PLANTS_SIZE = 0.05;
const FOOD_SIZE = 0.03;
const WATER_SIZE = 0.05;
const CHEMICALS_SIZE = 0.05;


export const STARTING_PRODUCT_SELL_PRICE_GUESS = 100000;


// const SUM_OF_COEFFICIENTS = 

// TODO: determine if balancing multiplier can be sourced programatically
const BALANCING_MULTIPLIER = 0.05;

export function calculateOfficeProductionMultiplier(office : Office, is_material_production : boolean) : number {
    //TODO: determine if any of these constants can be sourced programatically
    const operations_production = office.employeeProductionByJob.Operations;
    const engineer_production = office.employeeProductionByJob.Engineer
    const management_production = office.employeeProductionByJob.Management
    const total_employee_production = operations_production + engineer_production + management_production;
    if (total_employee_production == 0)
        return 0;
    const management_factor = 1 + (management_production / (1.2 * total_employee_production))
    const employee_production_multiplier = management_factor * ( Math.pow(operations_production, 0.4) + Math.pow(engineer_production, 0.3) )

    if (is_material_production) {
        return BALANCING_MULTIPLIER * employee_production_multiplier;
    }
    else {
        //output is product
        return 0.5 * BALANCING_MULTIPLIER * employee_production_multiplier
    }
}


export function calculateUpgradeProductionMultiplier(ns : NS) : number {
    //TODO: smart factories
    return 1 + 0.03 * ns.corporation.getUpgradeLevel("Smart Factories");
}


export function calculateResearchProductionMultiplier(ns : NS, divisionName : string) : number {
    let research_bonus = 1.0

    if (ns.corporation.hasResearched(divisionName, "Drones - Assembly"))
        research_bonus += 0.2

    if (ns.corporation.hasResearched(divisionName, "Self-Correcting Assemblers"))
        research_bonus += 0.1

    

    //TODO: research upgrades
    return research_bonus;
}

// export function boostMaterialOptimizer(x) {

//     // const [a, b, c, d] = x

//     // let numRealEstate : number;
//     // let numHardware : number;
//     // let numRobots : number;
//     // let numAiCores : number;

//     // numRealEstate * realEstateSize = 


//     return Math.pow((1 + 0.002 * x[0]), realEstateFactor) * Math.pow((1 + 0.002 * x[1]), hardwareFactor) * Math.pow((1 + 0.002 * x[2]), robotFactor) * Math.pow((1 + 0.002 * x[3]), aiCoreFactor)
// }

// export function boostMaterialOptimizerConstraint(x) {

//     const [a, b, c, d] = x

//     return (a * 0.05 + b * 0.06 + c * 0.5 + d * 0.1) - 10000.00


//     // return (a * 0.05 + b * 0.06 + c * 0.5 + d * 0.1)-1
// }

export function calculateOptimalBoostMaterialAmounts(storage: number, boostMaterialCoefficients : BoostMaterialCoefficients) : {
    "Real Estate" : number,
    "Hardware" : number,
    "Robots" : number,
    "AI Cores" : number
} {

    let sum_of_coefficients = 0;
    let sum_of_sizes = 0;
    const materials = {
        "Real Estate": 0,
        "Hardware" : 0,
        "Robots" : 0,
        "AI Cores" : 0
    }

    for (let i = 0; i < Object.keys(boostMaterialCoefficients).length; i ++)
    {
        switch (Object.keys(boostMaterialCoefficients)[i]) {
            case "realEstateFactor": 
                sum_of_coefficients += boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                sum_of_sizes += REAL_ESTATE_SIZE;
            break;
            case "hardwareFactor": 
                sum_of_coefficients += boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                sum_of_sizes += HARDWARE_SIZE;
            break;
            case "robotFactor": 
                sum_of_coefficients += boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                sum_of_sizes += ROBOT_SIZE;
            break;
            case "aiCoreFactor": 
                sum_of_coefficients += boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                sum_of_sizes += AI_CORE_SIZE;
            break;
        }
    }

    for (let i = 0; i < Object.keys(boostMaterialCoefficients).length; i ++)
        {
            const current_coefficient = boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
            let real_estate_number;
            let hardware_number;
            let robot_number;
            let ai_core_number;
            switch (Object.keys(boostMaterialCoefficients)[i]) {
                case "realEstateFactor": 
                    real_estate_number = calculateOptimalBoostMaterialAmount(storage, sum_of_coefficients, sum_of_sizes, current_coefficient, REAL_ESTATE_SIZE);

                    if (real_estate_number >= 0) {
                        materials["Real Estate"] = real_estate_number;
                    }
                    else {
                        delete boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                        return calculateOptimalBoostMaterialAmounts(storage, {...boostMaterialCoefficients});
                    }
                break;
                case "hardwareFactor": 
                    hardware_number = calculateOptimalBoostMaterialAmount(storage, sum_of_coefficients, sum_of_sizes, current_coefficient, HARDWARE_SIZE);
                    if (hardware_number >= 0) {
                        materials["Hardware"] = hardware_number;
                    }
                    else {
                        delete boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                        return calculateOptimalBoostMaterialAmounts(storage, {...boostMaterialCoefficients});
                    }
                break;
                case "robotFactor": 
                    robot_number = calculateOptimalBoostMaterialAmount(storage, sum_of_coefficients, sum_of_sizes, current_coefficient, ROBOT_SIZE);
                    if (robot_number >= 0) {
                        materials["Robots"] = robot_number;
                    }
                    else {
                        delete boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                        // ns.print(boostMaterialCoefficients)
                        return calculateOptimalBoostMaterialAmounts(storage, {...boostMaterialCoefficients});
                    }
                break;
                case "aiCoreFactor": 
                    ai_core_number = calculateOptimalBoostMaterialAmount(storage, sum_of_coefficients, sum_of_sizes, current_coefficient, AI_CORE_SIZE);
                    if (ai_core_number >= 0) {
                        materials["AI Cores"] = ai_core_number;
                    }
                    else {
                        delete boostMaterialCoefficients[Object.keys(boostMaterialCoefficients)[i]];
                        return calculateOptimalBoostMaterialAmounts(storage, {...boostMaterialCoefficients});
                    }
                break;
            }
        }

    return materials
}

export function calculateOptimalBoostMaterialAmount(storage: number, sum_of_coefficients : number, sum_of_sizes : number, current_coefficient : number, current_size : number) : number {
    const sum_of_coefficients_divided_by_current = sum_of_coefficients / current_coefficient;
    const numerator_stolen_from_docs = storage - 500 * ((current_size / current_coefficient) * (sum_of_coefficients - current_coefficient) - (sum_of_sizes - current_size));
    const storage_to_use = numerator_stolen_from_docs / sum_of_coefficients_divided_by_current;

    return storage_to_use / current_size;
}

export function getBaseProductionSize(ns : NS, materials: string[]) {
    let size = 0
    for (let i = 0; i < materials.length; i++){
        size += ns.corporation.getMaterialData(materials[i]).size
    }
    return size;
}

export function getBaseInputSize(ns : NS, materials: Record<CorpMaterialName, number>) {
    let size = 0
    for (let i = 0; i < Object.keys(materials).length; i++){
        const material : CorpMaterialName = Object.keys(materials)[i]
        size += ns.corporation.getMaterialData(material).size * materials[material]
    }
    return size;
}

export function calculateDivisioinProductionMultiplier (boostMaterialCoefficients : BoostMaterialCoefficients, boostMaterials : {
    "Real Estate" : number,
    "Hardware" : number,
    "Robots" : number,
    "AI Cores" : number
}) {
    let multSum = 0;
    // return Math.pow(0.002 * boostMaterials.Robots + 1, boostMaterialCoefficients.robotFactor) 
    // return Math.pow(0.002 * boostMaterials.Hardware + 1, boostMaterialCoefficients.hardwareFactor)
    const cityMult =
      Math.pow(0.002 * boostMaterials["Real Estate"] + 1, boostMaterialCoefficients.realEstateFactor) *
      Math.pow(0.002 * boostMaterials.Hardware + 1, boostMaterialCoefficients.hardwareFactor) *
      Math.pow(0.002 * boostMaterials.Robots + 1, boostMaterialCoefficients.robotFactor) *
      Math.pow(0.002 * boostMaterials["AI Cores"] + 1, boostMaterialCoefficients.aiCoreFactor);
    multSum += Math.pow(cityMult, 0.73);
    return multSum;
}