import React, { ReactNode, useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { PublicCollectionVisitor } from "../Model/PublicCollectionVisitor";
import PublicCollectionsApi from "../Api/PublicCollectionsApi";
import { RouteComponentProps } from "react-router-dom";
import { Card, CardHeader, CardContent, Grid, Box } from "@material-ui/core";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Cell,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { countBy, min, max } from "lodash";
import moment from "moment";
import {
  getRandomColor,
  getColorForBrowser,
} from "../Infrastructure/ColorUtilities";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "25px 30px 25px 30px",
    },
  })
);

type CollectionStatsViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

type ChartData = {
  name: string;
  value: number;
};

export default function CollectionStatsView(props: CollectionStatsViewProps) {
  const classes = useStyles();
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
    <Box className={classes.root}>
      <Grid
        container
        direction="row"
        spacing={3}
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12}>
          {ChartCard(
            "Daily visits",
            "Daily number of visits on this public collection",
            DailyEntryChart(dailyEntryData)
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {ChartCard(
            "Visitor's browser",
            "Browser used by visitors",
            BrowserChart(browserData)
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {ChartCard(
            "Visitor's country",
            "Visitor's country of origin",
            CountryChart(countryData)
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function ChartCard(title: string, subheader: string | null, chart: ReactNode) {
  return (
    <Card elevation={3}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          {chart}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function DailyEntryChart(dailyEntryData: ChartData[] | undefined) {
  return (
    <LineChart data={dailyEntryData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" />
    </LineChart>
  );
}

function BrowserChart(browserData: ChartData[] | undefined) {
  return (
    <PieChart>
      <Pie data={browserData} dataKey="value" label={(d) => d.name}>
        {browserData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getColorForBrowser(entry.name)} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

function CountryChart(countryData: ChartData[] | undefined) {
  return (
    <BarChart data={countryData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        {countryData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getRandomColor()} />
        ))}
      </Bar>
    </BarChart>
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
  for (let m = moment(minDate); m.isSameOrBefore(maxDate); m.add(1, "days")) {
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
