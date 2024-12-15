import {NS} from "@ns";
import { parse } from "mathjs";


function add_basic_operators_to_reach_target(ns, contract_data) {
  // for let(i = 0; i < )
  ns.print(parse("2+7"))
}

  /** @param {NS} ns */
  export async function main(ns) {

    const contract_host = "I.I.I.I";
    const contract_file = "contract-436986-CyberSec.cct";
  
    ns.tprint(ns.codingcontract.getDescription(contract_file, contract_host));
  
    let contract_data = ns.codingcontract.getData(contract_file, contract_host);
  
    ns.print(add_basic_operators_to_reach_target(ns, contract_data));

  }
  
    /******
    You are given the following string which contains only digits between 0 and 9:
  
   83851951
  
   You are also given a target number of -80. Return all possible ways you can add the +(add), -(subtract), and *(multiply) operators to the string such that it evaluates to the target number. (Normal order of operations applies.)
  
   The provided answer should be an array of strings containing the valid expressions. The data provided by this problem is an array with two elements. The first element is the string of digits, while the second element is the target number:
  
   ["83851951", -80]
  
   NOTE: The order of evaluation expects script operator precedence NOTE: Numbers in the expression cannot have leading 0's. In other words, "1+01" is not a valid expression Examples:
  
   Input: digits = "123", target = 6
   Output: ["1+2+3", "1*2*3"]
  
   Input: digits = "105", target = 5
   Output: ["1*0+5", "10-5"]
  
    ******/
    