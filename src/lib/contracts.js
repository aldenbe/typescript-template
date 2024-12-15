import { NS } from "@ns";

export function cipherLeftShift(str, rotation) {
    str = str.toUpperCase();
    return str.replace(/[A-Z]/g, leftShift);
  
    function leftShift(shiftme) {
      const charCode = shiftme.charCodeAt();
      //A = 65, Z = 90
      return String.fromCharCode(
              ((charCode - rotation) > 64) ? charCode - rotation
                                      : 90 - (64 - (charCode - rotation))
             );
      
    }
  }
  
  function find_largest_divisor (number) {
    for (let i = Math.floor(number/2); i > 1; i--) {
      if (number % i == 0)
        return i
    }
    throw new Error()
  }
  
  export function find_largest_prime_divisor (number) {
    for (let i=Math.floor(number/2); i > 1; i--) {
      if (number % i == 0) {
        try {
          find_largest_divisor(i)
        }
        catch {
           return i;
        }
      }
    }
  }

  