// 아래 에러는 <Title>{state?.name || "Loading.."}</Title> 이걸로 잡아줬음.
// http://localhost:3000/btc-bitcoin 예를들어 이렇게 coinId가 들어간 url로 바로 들어가려면 에러가 남.
// state가 생성되려면 home(Coins)화면을 먼저 열어야하기 때문임. 그다음 코인목록에서 코인을 클릭해야 Coin 화면으로 넘어감.
// Coins.tsx에서 <Link to={`/${coin.id}`} state={{ name: coin.name }}> 로 name을 넘겨주고,
// Coin.tsx 여기서 const { state } = useLocation() as RouteState; 으로 받아왔기 때문임.

import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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

interface RouteState {
  state: {
    name: string;
  };
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  // url의 파라미터 부분을 잡아내고 싶을때 useParams훅을 쓴다.
  // const params = useParams(); 이렇게 쓰면 {coinId: 'ㅌㅌㅌ'} 로 나옴. 여기서 coinId를 꺼내온거임.
  // useParams 쓰는 순간 타입이 자동으로 string or undefined로 지정됨.

  const { state } = useLocation() as RouteState;
  // 원래 location.state.name 이런 복잡한 구조로 되있는데 RouteState 타입을 지정해줬기때문에, 위의 {state}처럼 간단히 정의할수가 있음.

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
        {/* state가 존재하면 name을 가져오고, 존재하지 않으면 "Loading.."을 보여줘라.. */}
      </Header>

      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
