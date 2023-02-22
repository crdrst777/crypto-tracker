import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

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
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px; // padding을 위에서가 아닌 여기서 주니깐 카드 면적이 전부 클릭 가능한 영역이 됨
    transition: color 0.2s ease-in;
    display: block; // 이러면 카드의 끝부분까지도 클릭 가능
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    } // <Link>를 썼지만 여기서는 a로 해줘야함
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // axios와 try, catch를 사용한 방식
  const getCoins = async () => {
    try {
      const response = await axios.get("https://api.coinpaprika.com/v1/coins");
      setCoins(response.data.slice(0, 100)); // 앞에서부터 100개만 보여주기
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  // axios를 사용한 방식
  // const getCoins = async () => {
  //   const res = await axios("https://api.coinpaprika.com/v1/coins");
  //   // console.log(res.data);
  //   setCoins(res.data.slice(0, 100)); // 앞에서부터 100개만 보여주기
  //   setLoading(false);
  // };

  // 강의에 나온 방식 (조금 다름)
  // const getCoins = async () => {
  //   const json = await (
  //     await fetch("https://api.coinpaprika.com/v1/coins")
  //   ).json();
  //   // console.log(json);
  //   setCoins(json.slice(0, 100)); // 앞에서부터 100개만 보여주기
  //   setLoading(false);
  // };

  console.log(coins);

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
              {/* {/:coinId} */}
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};
export default Coins;
