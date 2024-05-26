import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { getUserRegPerWeeek } from "../../../api/Admin/dashboard";

const BarGraphReg = () => {
  const [userRegPerWeek, setuserRegPerWeek] = useState([{count:0,_id:"sunday"}]);

  useEffect(() => {
   getUserRegperWeek();
    
  }, []);

  const getUserRegperWeek = async () => {
    const response = await getUserRegPerWeeek();
    console.log("response of chart : ", response);
    setuserRegPerWeek(response);
  };

  // Data for the days of the week
  const daysOfWeekData = userRegPerWeek;

  // Prepare data for Highcharts
  const chartData = daysOfWeekData.map((item) => ({
    name: item._id,
    y: item.count,
  }));

  // Highcharts configuration options
  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "User Registration per Week",
    },
    xAxis: {
      categories: daysOfWeekData.map((item) => item._id),
    },
    series: [
      {
        type: "bar", // Specify the chart type as 'bar'
        name: "Users",
        data: chartData,
      },
    ],
  };

  return (
    <div className="App">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarGraphReg;
