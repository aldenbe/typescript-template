import {NS} from "@ns"

// /** @param {NS} ns */
// export async function main(ns) {
//   let infiltration_locations = ns.infiltration.getPossibleLocations();


//   let infiltration_data = [];

//   let max_difficulty = 1.5;

//   let min_security_details;

//   for (let i = 0; i < infiltration_locations.length; i++) {

//     let infiltration_location = infiltration_locations[i];

//     let city = infiltration_location['city'];
//     let name = infiltration_location['name'];

//     let details = ns.infiltration.getInfiltration(name)
//     infiltration_data.push(details);

//     if (details['difficulty'] < max_difficulty)
//     {
//       min_security_details = details;
//     }
//   }
//   ns.tprint(JSON.stringify(min_security_details))

// }


// {
//   "tradeRep": 34819.31316290112,
//   "sellCash": 532880881.27712834,
//   "SoARep": 6180.327744194544, 
//   "difficulty": 3,
//   "maxClearanceLevel": 12,
//   "startingSecurityLevel": 8.18
// }


/** @param {NS} ns */
export async function main(ns) {
    let infiltration_locations = ns.infiltration.getPossibleLocations();
  
  
    let infiltration_data = [];
  
    let max_difficulty = 2;
  
    let greatest_trade_rep_ratio_details;
  
    let greatest_trade_rep_ratio = 0;
  
    for (let i = 0; i < infiltration_locations.length; i++) {
  
      let infiltration_location = infiltration_locations[i];
  
      let city = infiltration_location['city'];
      let name = infiltration_location['name'];
  
      let details = ns.infiltration.getInfiltration(name)
      infiltration_data.push(details);
  
      if (details['difficulty'] < max_difficulty)
      {
        let trade_rep_ratio = details['reward']['tradeRep'] / details['maxClearanceLevel'];
        if (trade_rep_ratio > greatest_trade_rep_ratio) {
          greatest_trade_rep_ratio = trade_rep_ratio;
          greatest_trade_rep_ratio_details = details;
        }
      }
    }
    ns.tprint(JSON.stringify(greatest_trade_rep_ratio_details))
  
  }
  
  
  // // {
  // //   "tradeRep": 34819.31316290112,
  // //   "sellCash": 532880881.27712834,
  // //   "SoARep": 6180.327744194544, 
  // //   "difficulty": 3,
  // //   "maxClearanceLevel": 12,
  // //   "startingSecurityLevel": 8.18
  // // }