import { CityName, NS, Product } from '@ns'
import {
    CORPORATION_PRODUCTS_PORT
} from '/lib/ports/port_constants'

export type CustomProductData = Product & {
    "markupLimit"?: number
}

type AllProductData = {
    [key: string] : {
        [key: string] : {
            [key: string] : CustomProductData
        }
    }
}

export function getAllProductData(ns: NS) : AllProductData {
    if (typeof ns.peek(CORPORATION_PRODUCTS_PORT) !== "object")
    {
        return {}
    }
    return ns.peek(CORPORATION_PRODUCTS_PORT)
}

export function getProductData(ns : NS, division : string, city : CityName, productName : string) : CustomProductData | object {
    //

    const all_product_data = getAllProductData(ns)

    if (
        Object.prototype.hasOwnProperty.call(all_product_data, division) &&
        Object.prototype.hasOwnProperty.call(all_product_data[division], city) &&
        Object.prototype.hasOwnProperty.call(all_product_data[division][city], productName)
    )
    {
        return all_product_data[division][city][productName]
    }
    if (typeof ns.peek(CORPORATION_PRODUCTS_PORT) !== "object")
    {
        return {}
    }
    return ns.peek(CORPORATION_PRODUCTS_PORT)
}

export function storeProductData(ns : NS, division : string, city : CityName, productName : string, productData : CustomProductData) : void {
    const allProductData = getAllProductData(ns);

    if (typeof allProductData[division] !== "object")
    {
        allProductData[division] = {}
    }
    if (typeof allProductData[division][city] !== "object")
    {
        allProductData[division][city] = {}
    }

    allProductData[division][city][productName] = productData;
    ns.clearPort(CORPORATION_PRODUCTS_PORT)
    ns.writePort(CORPORATION_PRODUCTS_PORT, allProductData)
    // ns.print(allProductData);
    // ns.print (allProductData);
    const i = 0;
    // while (ns.peek(CORPORATION_PRODUCTS_PORT) !== allProductData && i < 1000)
    // {

    //     ns.readPort(CORPORATION_PRODUCTS_PORT)
    //     i++;
    // }
    // if (i > 10) {
    //     ns.tprint("Unexpectedly high count in storeProductData: " + i)
    // }
}
