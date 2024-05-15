import axios from "axios";
import * as echarts from "echarts";
export async function generatePolygonSQL(points,selectedOption) {
  // 将输入转换为数组
  points = Array.from(points);
  console.log(selectedOption);
  // 确保多边形闭合
  if (
    points[0][0] !== points[points.length - 1][0] ||
    points[0][1] !== points[points.length - 1][1]
  ) {
    points.push(points[0]);
  }

  // 转换点数组为字符串
  const pointsStr = points
    .map((point) => {
      if (!Array.isArray(point) || point.length !== 2) {
        throw new Error(
          "Invalid point format. Each point should be an array with two numbers."
        );
      }
      return point.join(" ");
    })
    .join(", ");

  // 生成SQL语句
  let json = {};
  const sql = `SELECT id,lin_ban,xiao_ban,dilei_name,hai_ba,cunname,xj,sg FROM app_yimu where st_Contains(st_transform(ST_GeomFromText('POLYGON((${pointsStr}))',4326),4549),geom);`;
  await axios({
    method: "POST",
    url: "create_polygon/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: { sql: sql },
  }).then((Response) => {
    json = Response.data;
    console.log(json);
  });
  // let pieData = [];
  console.log(json);
  // 初始化图表
  let chart = echarts.init(document.getElementById("chart"));
  let pieData = [];
  let i = 0;
  let name = ''
  switch(selectedOption){
  case '0001':{
    i = 1;
    name = '林班分布统计';
    break;
  }
  case '0002':{
    i = 2;
    name = '小班分布统计';
    break;
  }
  case '0003':{
    i = 3;
    name = '地类分布统计';
    break;
  }
  case '0004':{
    i = 4;
    name = '海拔分布统计';
    break;
  }
  case '0005':{
    i = 5;
    name = '村名分布统计';
    break;
  }
  case '0006':{
    i = 6;
    name = '胸径分布统计';
    break;
  }
  case '0007':{
    i = 7;
    name = '树高分布统计';
    break;
  }
}
  let firstForestClass = json[0][i];
  let allSameForestClass = json.every((item) => item[i] === firstForestClass);

  if (allSameForestClass) {
    pieData.push({ value: 100, name: firstForestClass });
  } else {
    json.forEach((item) => {
      let forestClass = item[i];
      let forestClassData = pieData.find((data) => data.name === forestClass);

      if (forestClassData) {
        forestClassData.value += 1;
      } else {
        pieData.push({ value: 1, name: forestClass });
      }
    });
  }

  // 设置图表选项
  chart.setOption({
    title: {
      text: name,
      left: 'center',
        top: 20,
        textStyle: {
            color: '#FFFFFF',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 28
        }
    },
    series: [
      {
        type: "pie",
        data: pieData,
        radius: ["30%", "50%"],
        label: {
          show: true,
          formatter: "{b}: {d}%",
          textStyle: {
            color: '#FFFFFF',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 14
          },
        },
      },
    ],
  });
  return json;
}

