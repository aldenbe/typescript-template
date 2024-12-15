
/**
 * @param {string} compressed
 * @returns {number}
 */
export function is(compressed) {
  for(let i=0; i < compressed.length; i++) {
    if(typeof parseInt(compressed.charAt(i)) === "number")
    {
      return i;
    }
  }
}

/**
 * @param {string} test
 */
export function isNumeric(test) {
  if(typeof parseInt(test) === "number")
  {
    return true;
  }
  
}

export function decompressChunk(compressed) {
  for(let i=0; i < decompress.length; i++) {
    
  }
}

// export function getCompressedChunk(compressed, indicator,) {
//   for(let i=0; i < decompress.length; i++) {
    
//   }
// }



/**
 * @param {string} compressed
 */
export function decompress(compressed) {
  let decompressed = ""

  while (compressed.length > 0){
    let indicator = parseInt(compressed.charAt(0))
    decompressed = decompressed + compressed.substring(1, indicator + 1)

    let output = parseInt(compressed.charAt(indicator + 1))
    // console.log(output)
    let lookback = parseInt(compressed.charAt(indicator + 2))
    // console.log(lookback)
    for (let i = 0; i < output; i++)
    {
      if (lookback > 1)
        decompressed = decompressed + decompressed.slice(-lookback, -lookback + 1)
      else
      decompressed = decompressed + decompressed.slice(-lookback)
    }
    compressed = compressed.substring(indicator+3)
  }
  return decompressed
}

export function find_repeating_characters(string) {
  let repeating = []
  for (let i = 0; i < plaintext.length; i++) {
    let char = plaintext.charAt(i);
    let j = i + 1;
    let duplicates = 0;
    while(plaintext.charAt(j)===char)
    {
      j++;
      duplicates++;
    }
    if (duplicates > 2) {
      repeating.push([i, j])
      i = j;
    }
  }
  return(repeating)
}


/**
 * @param {string} plaintext
 */
export function compress(plaintext) {



  // console.log(find_repeating_characters(plaintext));

  let encrypted = ""

  let since_last_indicator = 0;

  for (let i = 2; i < plaintext.length; i++) {
    

    let longest_output = 0;
    let longest_output_points = {}
    // let sequential = 0
    for (let lookback = 1; i - lookback >= 0 && lookback < 9; lookback++) {
      
      let char_at_lookback = plaintext.charAt(i - lookback)
    

      if ( plaintext.charAt(i) == char_at_lookback ) {
        
        let current_string = "";

        

        for (let output = 0; output < 9; output++) {

          // console.log(i)
          // console.log(lookback)
          // console.log(output);

          let output_char = plaintext.charAt(i - lookback + output)


          if (plaintext.charAt(i - lookback + output) == output_char) {

            // console.log(output)


            current_string = current_string + output_char;
            longest_output = output;
            longest_output_points = 
            {
              end: i,
              lookback: lookback,
              sequential: output
            };
          }
          else {
            break;
            
          }
          // else {
          //   current_string = ""
          // }
        }

        
        console.log(current_string)

      
      }
      
    
    }

    console.log(longest_output_points)

    since_last_indicator++
  }
  
}




// export async function main() {
  const contract_host = "4sigma";
  const contract_file = "contract-219094.cct";

  let contract_data = "b6atP4tP4tP4HUMB0hQSqB0hQShQShQShQShQSSSSSSSSSS7KS7KS7KS77KS7KjR7E666oH7";
  let plaintext = "abracadabra"

  compress(plaintext)
  // console.log(decompress(compressed))

  
// }

/******
Lempel-Ziv (LZ) compression is a data compression technique which encodes data using references to earlier parts of the data.
In this variant of LZ, data is encoded in two types of chunk. Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9, 
followed by the chunk data, which is either:

 1. Exactly L characters, which are to be copied directly into the uncompressed data.
 2. A reference to an earlier part of the uncompressed data. To do this, the length is followed by a second ASCII digit X: 
 each of the L output characters is a copy of the character X places before it in the uncompressed data.

 For both chunk types, a length of 0 instead means the chunk ends immediately, and the next character is the start of a new chunk.
 The two chunk types alternate, starting with type 1, and the final chunk may be of either type.

 You are given the following input string:
 &nbsp; &nbsp; b6atP4tP4tP4HUMB0hQSqB0hQShQShQShQShQSSSSSSSSSS7KS7KS7KS77KS7KjR7E666oH7
 Encode it using Lempel-Ziv encoding with the minimum possible output length.

 Examples (some have other possible encodings of minimal length):
 abracadabra -> 7abracad47
 &nbsp; &nbsp; mississippi &nbsp; &nbsp; -> &nbsp;4miss433ppi
aAAaAAaAaAA &nbsp; &nbsp; -> &nbsp;3aAA53035
aAAaAAaAaAA
2718281828 -> 627182844
 &nbsp; &nbsp; abcdefghijk &nbsp; &nbsp; -> &nbsp;9abcdefghi02jk
 &nbsp; &nbsp; aaaaaaaaaaaa &nbsp; &nbsp;-> &nbsp;3aaa91
aaaaaaaaaaaaa &nbsp; -> 1a91031
aaaaaaaaaaaaaa &nbsp;-> 1a91041
aaaaaaaaaaaaaa

******/
