// 아래 에러는 <Title>{state?.name || "Loading.."}</Title> 이걸로 잡아줬음.
// http://localhost:3000/btc-bitcoin 예를들어 이렇게 coinId가 들어간 url로 바로 들어가려면 에러가 남.
// state가 생성되려면 home(Coins)화면을 먼저 열어야하기 때문임. 그다음 코인목록에서 코인을 클릭해야 Coin 화면으로 넘어감.
// Coins.tsx에서 <Link to={`/${coin.id}`} state={{ name: coin.name }}> 로 name을 넘겨주고,
// Coin.tsx 여기서 const { state } = useLocation() as RouteState; 으로 받아왔기 때문임.

import { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  /* font-size: 48px; */
  font-size: 18px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

// Tab컴포넌트는 isActive라는 prop을 가진다.
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 0px 6px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block; // 이걸 해줘야 면적이 꽉참.
  }
`;

// 헷갈릴 수 있으니깐 interface는 변수? 앞에 I를 붙이기도 함.
interface IRouteState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  logo: string;
  parent: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

// url - 코인에 대한 정보 / 코인의 가격 정보

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const { coinId } = useParams();
  // url의 파라미터 부분을 잡아내고 싶을때 useParams훅을 쓴다.
  // const params = useParams(); 이렇게 쓰면 {coinId: 'ㅌㅌㅌ'} 로 나옴. 여기서 coinId를 꺼내온거임.
  // useParams 쓰는 순간 타입이 자동으로 string or undefined로 지정됨.
  const { state } = useLocation() as IRouteState;
  // 원래 location.state.name 이런 복잡한 구조로 되있는데 RouteState 타입을 지정해줬기때문에, 위의 {state}처럼 간단히 정의할수가 있음.
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // const chartMatch: PathMatch< "coinId" > | null = useMatch("/:coinId/chart");
  // console.log(priceMatch);
  console.log(chartMatch);

  // 일단 어떻게 데이터를 가져오는지 알아보고, 다음번에 React-query로 바꿔줄거임.
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);

      // console.log(priceInfo?.quotes.USD.price);
      // priceInfo가 undefined일수도 있는 경우. ? 붙이면 에러를 뱉지 않는다.
    })();
  }, [coinId]); // coinId를 여기 넣어도 어차피 이 Coin컴포넌트의 일생동안은 변할 일이 없어서 넣든안넣든 상관 없음.

  return (
    <Container>
      <Header>
        {/* <Title>{state?.name || "Loading.."}</Title> */}
        {/* state가 존재하면 name을 가져오고, 존재하지 않으면 "Loading.."을 보여줘라.. */}
        <Title>
          {state?.name ? state.name : loading ? "Loading.." : info?.name}
        </Title>
        {/* name이 state에 있다면 보여주고(홈에서 코인을 클릭한 경우), 혹은 로딩중이면 로딩을 보여주고,
로딩중이 아니라면 api로부터 받아온 info의 name을 보여줄거야.(홈으로부터 온게 아닌 경우)  */}
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            {/* console.log(chartMatch)했을때 null이 아닌, 값(객체)이 나온다면 (해당 url에 들어와있다면) isActive prop을 true로 -> tab 글자 컬러 바꿔줌 */}
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  );
};

export default Coin;

// ?를 쓰면 만약 priceInfo가 undefined거나 존재하지 않는 경우에는, max_supply에 대해 요구하지 않을거임.
// ?가 없다면, 항상 요구하게 되는거임. 위와같은 경우 에러를 뱉음.
