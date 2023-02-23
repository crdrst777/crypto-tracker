import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
// import axios from "axios";

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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px; // padding을 위에서가 아닌 여기서 주니깐 카드 면적이 전부 클릭 가능한 영역이 됨
    transition: color 0.2s ease-in;
    /* display: block; // 이러면 카드의 끝부분까지도 클릭 가능 */
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    } // <Link>를 썼지만 여기서는 a로 해줘야함
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  // useQuery는 2가지 argument가 필요함. (queryKey: query의 고유식별자 / fetcher함수)
  // useQuery는 isLoading이라고 불리는 boolean값을 반환한다. 로딩중인지(true), fetcher함수가 끝난상태(false)인지.
  // useQuery는 fetcher함수가 끝나면 그 data(json)도 반환한다.
  // react query는 데이터를 캐시에 저장해두기 때문에 코인목록에서 코인을 눌러 다른 url로 갔다가 다시 목록으로 돌아오면 로딩중이 뜨지 않고 화면이 바로 뜬다.
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  // const [coins, setCoins] = useState<ICoin>([]);
  // const [loading, setLoading] = useState(true);

  // axios와 try, catch를 사용한 방식
  // const getCoins = async () => {
  //   try {
  //     const response = await axios.get("https://api.coinpaprika.com/v1/coins");
  //     setCoins(response.data.slice(0, 100)); // 앞에서부터 100개만 보여주기
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // axios를 사용한 방식
  // const getCoins = async () => {
  //   const res = await axios("https://api.coinpaprika.com/v1/coins");
  //   // console.log(res.data);
  //   setCoins(res.data.slice(0, 100)); // 앞에서부터 100개만 보여주기
  //   setLoading(false);
  // };

  // 강의에 나온 방식 (조금 다름)
  // 일단 어떻게 데이터를 가져오는지 알아보고, 다음번에 React-query로 바꿔줄거임.
  // const getCoins = async () => {
  //   const json = await (
  //     await fetch("https://api.coinpaprika.com/v1/coins")
  //   ).json();
  //   // console.log(json);
  //   setCoins(json.slice(0, 100)); // 앞에서부터 100개만 보여주기
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getCoins();
  // }, []);

  // console.log(coins);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  // src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};
export default Coins;
