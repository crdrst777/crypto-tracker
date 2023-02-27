import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../\batoms";

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  high: string;
  open: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = () => {
  const { coinId } = useOutletContext<IChartProps>();
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  // console.log(data);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) as number[],
              // 읽어오면 number 이지만 못읽어오면 undefind 가 되는거라서 오류뜨는거임. as를 이용해 저 데이터는 number배열이라고 강제.
              // string을 number로 형변환.
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map(
                (price) => new Date(price.time_close * 1000).toISOString() // 이 api는 현재 날짜를 초단위로 주기 때문에 이를 변환함. toUTCString()도 가능.
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
                // 소수점 뒤 두자리까지만 나오게. toFixed 함수는 string을 반환함.
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
