import {NS} from "@ns";

export function get_portfolio_value (ns : NS){

    const stock_symbols = ns.stock.getSymbols();
  
    let portfolio_value = 0;
  
    for(let i = 0; i < stock_symbols.length; i++) {
  
      const stock_symbol = stock_symbols[i];
  
      const position = ns.stock.getPosition(stock_symbol);
  
      const shares_held = position[0];
      const current_sell_value = ns.stock.getBidPrice(stock_symbol);
      portfolio_value += shares_held * current_sell_value;
    }
    return portfolio_value;
  }
  
  export async function main(ns : NS) {

    if (!ns.stock.hasWSEAccount() ||
      !ns.stock.hasTIXAPIAccess() ||
      !ns.stock.has4SDataTIXAPI()
    )
      ns.exit();
  
    const fee = ns.stock.getConstants()["StockMarketCommission"]
    const stock_symbols = ns.stock.getSymbols();
    const thousand = 1000;
    const million = thousand * thousand;
    const billion = million * thousand;
    const min_sell_order = 100 * million;
    const min_buy_order = 10 * million;
    const reserved = 100 * billion

    const stock_multiplier = 500 ;
  
    const initial_portfolio_value = get_portfolio_value(ns);
  
    let sells = 0;
  
    let buys = 0;
  
    ns.disableLog("ALL");
  
    let loops = 0;
  
  
    while (1)
    {

      type stockMultiplierPair = [string, number]
      const symbols_to_be_sorted_by_multiplier : stockMultiplierPair[] = [];

      for(let i = 0; i < stock_symbols.length; i++) {
        const stock_symbol = stock_symbols[i];
        const forecast = ns.stock.getForecast(stock_symbol);
  
        const volatility = ns.stock.getVolatility(stock_symbol);

        const base_buy_multiplier : number = (1 - forecast) * volatility;

        symbols_to_be_sorted_by_multiplier.push([stock_symbol, base_buy_multiplier])
      }

      const symbols_sorted_by_multiplier = symbols_to_be_sorted_by_multiplier.sort((a, b) => { return b[1] - a[1]})

      for(let i = 0; i < stock_symbols.length; i++) {
        stock_symbols[i] = symbols_sorted_by_multiplier[i][0];
      }

      for(let i = 0; i < stock_symbols.length; i++) {
        const stock_symbol = stock_symbols[i];
        const forecast = ns.stock.getForecast(stock_symbol);
  
        const volatility = ns.stock.getVolatility(stock_symbol);

        const base_buy_multiplier = (1 - forecast) * volatility;

        symbols_to_be_sorted_by_multiplier.push([stock_symbol, base_buy_multiplier])
      }


      
      for(let i = 0; i < stock_symbols.length; i++) {

        const money_available = ns.getServerMoneyAvailable("home") - reserved;
        const base_order = money_available / 4;
        // ns.printf("base_order %s", ns.formatNumber(base_order))
  
        if (money_available <= 0)
          break;
  
        const stock_symbol = stock_symbols[i];
  
        const position = ns.stock.getPosition(stock_symbol);
  
        const shares_held = position[0];
  
        const forecast = ns.stock.getForecast(stock_symbol);
  
        const stock_bid_price = ns.stock.getBidPrice(stock_symbol);
  
        const stock_ask_price = ns.stock.getAskPrice(stock_symbol);
  
        const volatility = ns.stock.getVolatility(stock_symbol);
  
  
        // if (volatility < 0.005){
        //   continue;
        // }
  
  
  
        // // forecast is percentage chance of going up,
        // // less than 50% means chance stock going down
  
        if (forecast < 0.50) {
  
          // if (shares_held > 
          
          if (shares_held == 0) {
            //TODO: short?
            continue;
          }
          

  
          // TODO: FIGURE OUT HOW TO ADJUST THIS
          const loss_multiplier = (1 - forecast) * (volatility * stock_multiplier);
  
          let amount_to_sell = (Math.ceil(shares_held * (loss_multiplier)));
  
          if ((amount_to_sell * stock_bid_price) > min_sell_order) 
          {
            if(amount_to_sell > shares_held)
              amount_to_sell = shares_held;
            // ns.tprint(`sell: ${stock_symbol}: ${amount_to_sell} of ${shares_held}`)
            sells += (amount_to_sell * ns.stock.sellStock(stock_symbol, amount_to_sell)) - fee;
            ns.print(`sold ${stock_symbol}`)
          }
  
  
        }
  
        if (forecast > 0.50) {
  
          const buy_multiplier = (forecast) * (volatility * stock_multiplier);
  
          let num_shares_to_buy = Math.ceil((base_order / stock_ask_price) * buy_multiplier);
  
          let cost = num_shares_to_buy * stock_ask_price;

          while (cost > money_available) {
            num_shares_to_buy = Math.ceil( num_shares_to_buy / 2);
            cost = num_shares_to_buy * stock_ask_price;
          }
  
          if (cost > min_buy_order) {
            const max_shares = ns.stock.getMaxShares(stock_symbol); 
            if (num_shares_to_buy > (max_shares - shares_held))
              num_shares_to_buy = max_shares - shares_held;


            // ns.printf("buying %s of %s: cost = %s", ns.formatNumber(num_shares_to_buy), stock_symbol, ns.formatNumber(cost));
            // ns.tprint(`symbol: ${stock_symbol}, ${forecast}, ${volatility}, ${buy_multiplier}`);
            // ns.tprint(`buying: ${num_shares_to_buy}, at cost: ${stock_ask_price} for total: ${cost}`);
            const spent = ns.stock.buyStock(stock_symbol, num_shares_to_buy) * num_shares_to_buy + fee;
            if (spent > fee)
              buys += spent;
            // ns.printf("spent %s", spent);
          }
        }
  
      }
  
      loops++
      
      const time_running_in_seconds = ns.stock.getConstants()["msPerStockUpdate"] / 1000 * loops;
  
      const total_gain_loss = (get_portfolio_value(ns) - initial_portfolio_value - buys + sells);
  
      ns.print(`Gain while running: ${ns.formatNumber(total_gain_loss)} Portfolio: ${ns.formatNumber(get_portfolio_value(ns))}`)
  
      ns.print(`income: ${ns.formatNumber(total_gain_loss/time_running_in_seconds)}/s`)
      ns.print(`time running: ${time_running_in_seconds}`)
  
  
      await ns.stock.nextUpdate();
  
      
    }
    
    
  }