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

type ChartData = {
  name: string;
  value: number;
};

export default function CollectionStatsView(props: CollectionStatsViewProps) {
  let collectionId = props.match.params.collectionId;

  let [browserData, setBrowserData] = useState<ChartData[] | undefined>(
    undefined
  );
  let [dailyEntryData, setDailyEntryData] = useState<ChartData[] | undefined>(
    undefined
  );
  let [countryData, setCountryData] = useState<ChartData[] | undefined>(
    undefined
  );
  useEffect(() => {
    async function loadData() {
      let response = await PublicCollectionsApi.getPublicCollectionVisitorData(
        collectionId
      );
      setBrowserData(getBrowserData(response!));
      setDailyEntryData(getDataForDailyEnters(response!));
      setCountryData(getDataForCountryEntries(response!));
    }
    loadData();
    return () => {};
  }, [collectionId]);

  return (
    //TODO: Layout
    <div>
      <LineChart width={500} height={500} data={dailyEntryData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" />
      </LineChart>
      <PieChart width={500} height={500}>
        <Pie data={browserData} dataKey="value" label={(d) => d.name}>
          {browserData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColorForBrowser(entry.name)} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <BarChart width={500} height={500} data={countryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value">
          {countryData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

function getBrowserData(rawData: PublicCollectionVisitor[]) {
  let counted = countBy(rawData, (dat) => dat.browserName);
  let arrayData = Object.getOwnPropertyNames(counted).map(
    (propName) =>
      ({
        name: propName,
        value: counted[propName],
      } as ChartData)
  );
  return arrayData;
}

function getDataForDailyEnters(rawData: PublicCollectionVisitor[]) {
  let minDate = moment(min(rawData.map((r) => r.date))!);
  let maxDate = moment(max(rawData.map((r) => r.date))!);
  let arrayData = [] as ChartData[];
  for (let m = moment(minDate); m.isBefore(maxDate); m.add(1, "days")) {
    let obj = {
      name: m.format("YYYY-MM-DD"),
      value: rawData.filter((r) => moment(r.date).isSame(m, "day")).length,
    } as ChartData;
    arrayData = [...arrayData, obj];
  }
  return arrayData;
}

function getDataForCountryEntries(rawData: PublicCollectionVisitor[]) {
  let counted = countBy(rawData, (dat) => dat.country);
  let arrayData = Object.getOwnPropertyNames(counted).map(
    (propName) =>
      ({
        name: propName,
        value: counted[propName],
      } as ChartData)
  );
  return arrayData;
}

//TODO: Move to a util class
function getColorForBrowser(browserName: string) {
  //TODO: Check fetched browser names, add more colors for fun
  switch (browserName) {
    case "Edge":
      return "#0088FE";

    case "Chrome":
      return "#FFBB28";

    default:
      return getRandomColor();
  }
}

//TODO: Move to a util class
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
