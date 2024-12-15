import { evaluate, factorial } from "mathjs";

/**
 * @param {[string]} equation_array array of characters which combined represent a mathematical operation
 */
function add_each_operator(equation_array, position, operators) {
  let variants = [];
  for (let i = 0; i < operators.length; i++)
  {
    let temp_array = structuredClone(equation_array);
    temp_array.splice(position, 0, operators[i]);
    variants.push(temp_array);
  }
  // console.log(variants);
  return (variants);
}

/**
 * @param {[string]} equation_array array of strings containing mathematical statements
 */
function filterLeadingZeroes(array_to_filter) {
  let filtered_array = [];
  for (let i = 0; i < array_to_filter.length; i++) {
    let invalid_leading_zero = new RegExp('(^0[0-9])|([+\\-*]0[0-9])').test(array_to_filter[i])
    // let invalid_leading_zero = new RegExp('^0[0-9]').test(array_to_filter[i])
    if (!invalid_leading_zero) {
      filtered_array.push(array_to_filter[i])
    }
      
    // else (console.log(array_to_filter[i]))
  }
  return filtered_array
}


function add_basic_operators_to_string(contract_data) {
    let all_variants = [];
    

    let operators = ["", "+", "-", "*"]
    let first_num_array = []
    for (let i = 0; i < contract_data[0].length; i++)
    {
      first_num_array.push(contract_data[0][i])
    }

    all_variants[0] = [first_num_array]
    // console.log(all_variants);
    // return null

    for (let i = 0; i < contract_data[0].length - 1; i++){
      let variants = []
      for(let j = 0; j < all_variants[i].length; j++) {
        // console.log(j)
        let num_array = all_variants[i][j];
        // console.log(num_array)
        // console.log(num_array)
        // all_variants.push([j.toString()])
        variants = variants.concat(add_each_operator(num_array, i*2+1, operators));

        
        // console.log(variants)
      }

      // console.log(variants);
      // break
      // break
      all_variants.push(variants)
      
      // console.log(all_variants)
    }
    // console.log(all_variants)
    // console.log(all_variants.length)
    console.log(all_variants[contract_data[0].length - 1].length)

    all_variants = [...new Set(all_variants[contract_data[0].length - 1])]

    console.log(all_variants.length)
    

  //   all_variants.push(num_array)

  //   let j = 0;

  //   let checked_combinations = []

  //   let all_variants_stringified = [];

  //   while (j < all_variants.length){
  //     num_array = all_variants[j];
  //     // if (checked_combinations.includes(num_array) && j > 0) {
  //     //   j++
  //     //   continue
  //     // }
  //     // console.log(JSON.stringify(num_array));
  //     console.log (num_array);
  //     for (let i = 1; i < num_array.length; i++)
  //     {
  //       if ( operators.includes(num_array[i-1]) || operators.includes(num_array[i]))
  //       {
  //         continue;
  //       }
          
  //       let variants = add_each_operator(num_array, i, operators);
  //       console.log(variants)
  //       for (let k = 0; k < variants.length; k++)
  //       {

  //         let variant_stringified = variants[k].join("");
  //         if (!all_variants_stringified.includes(variants[k]))
  //         {
  //           all_variants_stringified.push(variant_stringified)
  //           all_variants.push(variants[k])
  //         }
  //         // else {
  //           // console.log(j)
  //           // console.log(i)
  //         // }

  //       }
  //       // console.log(variants)
  //     }
      
      
  //     // console.log (num_array)
  //     j ++;
  //     // console.log (all_variants)
  //     // break;

      

  //     // console.log(j)

  //     // console.log(all_variants.length)

  //     // if(all_variants.length !== 493)
  //       // console.log(j)
  //     // console.log(JSON.stringify(all_variants))

  //     //WHY AM I SO DUMB??????
  //     // if (j > factorial(contract_data[0].length +1))
  //     //   break
  //   }
  //   console.log (j)
  //   console.log(all_variants.length)

  //   // for (let i = 0; i < all_variants.length; i++){
  //   //   all_variants_stringified.push(all_variants[i].join(""))
  //   // }

  //   all_variants_stringified = [...new Set(all_variants_stringified)]

  //   all_variants_stringified = filterLeadingZeroes(all_variants_stringified)

  //   console.log(all_variants_stringified.length)

  //   // console.log(JSON.stringify(num_array.join("")));
  //   // console.log(JSON.stringify(all_variants_stringified))
  //   return all_variants_stringified;
  // }

  // function add_basic_operators_to_string(contract_data) {
  //   let num_array = [];
  //   // let target = contract_data[1]
  //  let first_character = 0;

  //   let operators = ["", "+", "-", "*"]
  //   for (let i = 0; i < contract_data[0].length; i++)
  //   {
  //     num_array.push(contract_data[0][i])
  //   }

  //   let all_variants = [];

  //   all_variants.push(num_array)

  //   let j = 0;

  //   let checked_combinations = []

  //   let all_variants_stringified = [];

  //   while (j < all_variants.length){
  //     num_array = all_variants[j];
  //     // if (checked_combinations.includes(num_array) && j > 0) {
  //     //   j++
  //     //   continue
  //     // }
  //     // console.log(JSON.stringify(num_array));
  //     console.log (num_array);
  //     for (let i = 1; i < num_array.length; i++)
  //     {
  //       if ( operators.includes(num_array[i-1]) || operators.includes(num_array[i]))
  //       {
  //         continue;
  //       }
          
  //       let variants = add_each_operator(num_array, i, operators);
  //       console.log(variants)
  //       for (let k = 0; k < variants.length; k++)
  //       {

  //         let variant_stringified = variants[k].join("");
  //         if (!all_variants_stringified.includes(variants[k]))
  //         {
  //           all_variants_stringified.push(variant_stringified)
  //           all_variants.push(variants[k])
  //         }
  //         // else {
  //           // console.log(j)
  //           // console.log(i)
  //         // }

  //       }
  //       // console.log(variants)
  //     }
      
      
  //     // console.log (num_array)
  //     j ++;
  //     // console.log (all_variants)
  //     // break;

      

  //     // console.log(j)

  //     // console.log(all_variants.length)

  //     // if(all_variants.length !== 493)
  //       // console.log(j)
  //     // console.log(JSON.stringify(all_variants))

  //     //WHY AM I SO DUMB??????
  //     // if (j > factorial(contract_data[0].length +1))
  //     //   break
  //   }
  //   console.log (j)
  //   console.log(all_variants.length)

  //   // for (let i = 0; i < all_variants.length; i++){
  //   //   all_variants_stringified.push(all_variants[i].join(""))
  //   // }

  //   all_variants_stringified = [...new Set(all_variants_stringified)]

  //   all_variants_stringified = filterLeadingZeroes(all_variants_stringified)

  //   console.log(all_variants_stringified.length)

  //   // console.log(JSON.stringify(num_array.join("")));
  //   // console.log(JSON.stringify(all_variants_stringified))
  //   return all_variants_stringified;
  }

// /**
//  * @param {string} number_string
//  */
// function add_basic_operators_to_string(number_string) {

//   let tracking_object = {}
//   let initial = {
//     let operators = []
//   }
//   tracking_object[0]
//   for (let i = 0; i < number_string.length; i++) {
//     tracking_object[i]

//   }
  // let num_array = [];
  // let target = contract_data[1]

  // let operators = ["", "+", "-", "*"]
  // let number_with_operater_array = [];
  // for (let i = 0; i < number_string.length-1; i++)
  // {
  //   let cur_number_array = [];
  //   for (let j = 0; j < operators.length; j++)
  //   {
  //     cur_number_array.push(`${number_string[i]}${operators[j]}`)
  //   }
  //   number_with_operater_array.push(cur_number_array)
  // }
  // number_with_operater_array.push([number_string.charAt(number_string.length-1)]);

  // return number_with_operater_array

  // let all_variants = [];

  // all_variants.push(num_array)

  // let j = 0;

  // while (j < all_variants.length){
  //   num_array = all_variants[j];
  //   // console.log(JSON.stringify(num_array));
  //   for (let i = 1; i < num_array.length; i++)
  //   {
  //     if ( operators.includes(num_array[i]) || operators.includes(num_array[i-1]) )
  //       continue;
  //     let variants = add_each_operator(num_array, i, operators);
  //     for (let k = 0; k < variants.length; k++)
  //     {
  //       if (!all_variants.includes(variants[k]))
  //       {
  //         all_variants.push(variants[k])
  //       }
  //       // else {
  //         console.log(j)
  //         console.log(i)
  //       // }

  //     }
  //   }
  //   j++

  //   console.log(all_variants.length)

    // if (j === 500)
    //   break
// }


    // let all_variants_stringified = [];

    // for (let i = 0; i < all_variants.length; i++){
    //   all_variants_stringified.push(all_variants[i].join(""))
    // }

    // // all_variants_stringified = [...new Set(all_variants_stringified)]

    // all_variants_stringified = filterLeadingZeroes(all_variants_stringified)

    // // console.log(JSON.stringify(num_array.join("")));
    // // console.log(JSON.stringify(all_variants_stringified))
    // return all_variants_stringified;
  // }
  
  // /** @param {NS} ns */
  // export async function main() {

    const contract_host = "I.I.I.I";
    const contract_file = "contract-436986-CyberSec.cct";
  
    // ns.tprint(ns.codingcontract.getDescription(contract_file, contract_host));
  
    let contract_data = ["128156721875", 6]

    // let contract_data = ["0803", -80]

    let all_variants = add_basic_operators_to_string(contract_data)



    // let all_variants = add_basic_operators_to_string(contract_data[0])
    // console.log(all_variants);

    let valid_variants = [];

    let operators = ["", "+", "-", "*"]
    for (let i = 0; i < contract_data[0].length; i++)
    {
      first_num_array.push(contract_data[0][i])
    }

    let num_string = contract_data[0];

    
    let num_array = []
    for (let i = 0; i < num_string.length; i++)
    {
      first_num_array.push(contract_data[0][i])
    }

    let running_

    // for (let i = 0; i < all_variants.length; i++) {
    //   if (evaluate(all_variants[i]) == 6)
    //     console.log(all_variants[i])
    // }
  
    // ns.print(add_basic_operators_to_reach_target(ns, contract_data));

  // }
  
    /******
    You are given the following string which contains only digits between 0 and 9:
  
   83851951
  
   You are also given a target number of -80. Return all possible ways you can add the +(add), -(subtract), and *(multiply) operators to the string such that it evaluates to the target number. (Normal order of operations applies.)
  
   The provided answer should be an array of strings containing the valid expressions. The data provided by this problem is an array with two elements. The first element is the string of digits, while the second element is the target number:
  
   
  
   NOTE: The order of evaluation expects script operator precedence NOTE: Numbers in the expression cannot have leading 0's. In other words, "1+01" is not a valid expression Examples:
  
   Input: digits = "123", target = 6
   Output: ["1+2+3", "1*2*3"]
  
   Input: digits = "105", target = 5
   Output: ["1*0+5", "10-5"]
  
    ******/
    