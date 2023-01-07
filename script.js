const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

async function fetchdata() {
  let fetching = new Promise((resolve, reject) => {
    let request = fetch(url);

    request.then((Requestdata) => {
      if (Requestdata.status == 200) {
        resolve(Requestdata.json());
      } else {
        reject(Requestdata.statusText);
      }
    });
  });
  let fetcheddata = await fetching;
  return fetcheddata;
}
fetchdata().then((data) => {
  let tabledata = "";
  data.map((coin) => {
    let currentPrice = coin.current_price;
    let current_price = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(currentPrice);
    let marketCapChange = coin.market_cap_change_24h;
    let market_cap_change_24h = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(marketCapChange);
    let marketCap = coin.market_cap;
    let market_cap = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(marketCap);
    let percentage = coin.market_cap_change_percentage_24h;

    tabledata += `<tr style="Border-bottom:1px solid white">
    <td><img src="${coin.image}" style="width:40px" >    ${coin.name}</td>
    <td>${coin.symbol.toUpperCase()}</td>
    <td>${current_price}</td>
    <td>${market_cap_change_24h}</td>
    <td class="${percentage > 0 ? "text-success" : "text-danger"}">${parseFloat(
      percentage
    ).toFixed(2)}%</td>
    
    
    <td>Mkt Cap: ${market_cap}</td>
    </tr>`;
  });
  document.getElementById("table-data").innerHTML = tabledata;
});

fetchdata().catch((err) => console.log(err));
