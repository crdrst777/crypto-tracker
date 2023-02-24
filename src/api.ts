// API를 fetch하고 json을 return하는 fetchCoins함수를 아래에 만들었음.

// fetcher 함수는 꼭 fetch promise를 return 해줘야 함.
// json data를 return해야 함. 정확히는 json data의 promise.
// 그래서 원한다면(?) 우리는 이 함수를 async 함수로 만들 수 있음.

// export async function fetchCoins() {
//   const response = await fetch("https://api.coinpaprika.com/v1/coins");
//   const json = await response.json();
//   return json;
// }
// 위 방식은 코드가 길고 await async를 사용하는 대신 promise를 사용해보자.

const BASE_URL = `https://api.coinpaprika.com/v1`;
// all coins
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then(
    (response) => response.json() // 어찌됐든 json data를 리턴하는건 같음.
  );
}
// coin info
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
// coin price
export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}
