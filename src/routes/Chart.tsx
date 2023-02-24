import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface IChartProps {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(coinId);

  return (
    <>
      <h1>Chart</h1>
    </>
  );
};

export default Chart;
