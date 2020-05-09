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
  useEffect(() => {
    async function loadData() {
      let response = await PublicCollectionsApi.getPublicCollectionVisitorData(
        collectionId
      );
      setData(response);
      setBrowserData(getBrowserData(response!));
      let d = getDataForDailyEnters(response!);
      setDailyEntryData(d);
      console.log({ d });
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
        <Pie
          data={browserData}
          dataKey="count"
          label={(d) => `${d.browserName} - ${d.count}`}
        ></Pie>
      </PieChart>
    </div>
  );
}

function getBrowserData(response: PublicCollectionVisitor[]) {
  let counted = countBy(response, (dat) => dat.browserName);
  let x = Object.getOwnPropertyNames(counted).map((propName) => ({
    browserName: propName,
    count: counted[propName],
  }));
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
  return arr;
}
