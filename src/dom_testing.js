import {NS} from "@ns"



/** @param {NS} ns */
export async function main(ns) {

    // console.log(document.getElementsByClassName("MuiBox-root"))

    let overview_box = document.getElementsByClassName("MuiBox-root")
    for (let i = 0; i < overview_box.length; i++)
    {
        console.log(overview_box[i].children)
        // for (let j = 0; i < overview_box.length; j++) {
        //     console.log(overview_box[i][j])
        // }

    }

    ns.print("test")

    // console.log(ns.ui.)
    // console.log(overview_box.getElementsByClassName("MuiButton-textPrimary"))
    // console.log(document.querySelectorAll(".MuiButton-textPrimary")[0]);


 
// MuiButtonBase-root iiaresnrsietnf.,hptrstieno
// MuiButton-text
// MuiButton-textPrimary
//  MuiButton-sizeMedium
//   MuiButton-textSizeMedium
//    MuiButton-root
//     MuiButton-text
//      MuiButton-textPrimary
//  MuiButton-sizeMedium MuiButton-textSizeMedium css-1hp61xu
}
