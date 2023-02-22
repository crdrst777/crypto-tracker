import { useParams } from "react-router-dom";

const Coin = () => {
  const { coinId } = useParams();
  // url의 파라미터 부분을 잡아내고 싶을때 useParams훅을 쓴다.
  // const params = useParams(); 이렇게 쓰면 {coinId: 'ㅌㅌㅌ'} 로 나옴. 여기서 coinId를 꺼내온거임.
  // useParams 쓰는 순간 타입이 자동으로 string or undefined로 지정됨.

  console.log(coinId);

  return <h1>Coin: {coinId}</h1>;
};

export default Coin;
