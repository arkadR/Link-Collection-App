import React, { useState, useEffect } from "react";
import { PublicCollectionVisitor } from "../Model/PublicCollectionVisitor";
import PublicCollectionsApi from "../Api/PublicCollectionsApi";
import { RouteComponentProps } from "react-router-dom";
import {
  PieChart,
  Pie,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Cell,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { countBy, min, max } from "lodash";
import moment from "moment";

//TODO: A big refactor is needed
type CollectionStatsViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

export default function CollectionStatsView(props: CollectionStatsViewProps) {
  let collectionId = props.match.params.collectionId;

  let [data, setData] = useState<PublicCollectionVisitor[] | null>(null);
  let [browserData, setBrowserData] = useState<any | null>(null);
  let [dailyEntryData, setDailyEntryData] = useState<any | null>(null);
  let [countryData, setCountryData] = useState<any | null>(null);
  useEffect(() => {
    async function loadData() {
      let response = await PublicCollectionsApi.getPublicCollectionVisitorData(
        collectionId
      );
      setData(response);
      setBrowserData(getBrowserData(response!));
      setDailyEntryData(getDataForDailyEnters(response!));
      setCountryData(getDataForCountryEntries(response!));
    }
    loadData();
    return () => {};
  }, [collectionId]);

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <LineChart width={500} height={500} data={dailyEntryData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" />
      </LineChart>
      <PieChart width={500} height={500}>
        <Pie data={browserData} dataKey="value" label={(d) => d.name}>
          {/* 
            //@ts-ignore */}
          {browserData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColorForBrowser(entry.name)} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <BarChart
        width={500}
        height={500}
        data={countryData}
        // margin={{
        //   top: 5, right: 30, left: 20, bottom: 5,
        // }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value">
          {/* 
            //@ts-ignore */}
          {countryData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

function getBrowserData(response: PublicCollectionVisitor[]) {
  let counted = countBy(response, (dat) => dat.browserName);
  let x = Object.getOwnPropertyNames(counted).map((propName) => ({
    name: propName,
    value: counted[propName],
  }));
  console.log({ browserData: x });
  return x;
}

function getDataForDailyEnters(response: PublicCollectionVisitor[]) {
  let minDate = moment(min(response.map((r) => r.date))!);
  let maxDate = moment(max(response.map((r) => r.date))!);
  let arr = [] as { date: string; count: number }[];
  for (let m = moment(minDate); m.isBefore(maxDate); m.add(1, "days")) {
    let obj = {
      date: m.format("YYYY-MM-DD"),
      count: response.filter((r) => moment(r.date).isSame(m, "day")).length,
    };
    arr = [...arr, obj];
  }
  console.log({ dailyData: arr });
  return arr;
}

function getDataForCountryEntries(response: PublicCollectionVisitor[]) {
  let counted = countBy(response, (dat) => dat.country);
  let x = Object.getOwnPropertyNames(counted).map((propName) => ({
    name: propName,
    value: counted[propName],
  }));
  console.log({ countryData: x });
  return x;
}

function getColorForBrowser(browserName: string) {
  switch (browserName) {
    case "Edge":
      return "#0088FE";

    case "Chrome":
      return "#FFBB28";

    default:
      return getRandomColor();
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
