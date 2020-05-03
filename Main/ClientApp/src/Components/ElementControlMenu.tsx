import React, { useState, useEffect } from "react";
import { Element } from "../Model/Element";
import { GetUserFriendlyHostname } from "../Infrastructure/UrlUtilities";
import {
  makeStyles,
  Theme,
  createStyles,
  Chip,
  Select,
  MenuItem,
  IconButton,
  Slider,
  Grid,
  Typography,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useCookie } from "../Infrastructure/CustomReactHooks";

type HostFilter = {
  host: string;
  enabled: boolean;
};

export type ElementOrderFunc = {
  orderFunc: (el1: Element, el2: Element) => number;
};
type SortingOption = {
  key: number;
  label: string;
  orderFunc: ElementOrderFunc;
};

interface ElementControlMenuProps {
  hosts: string[];
  onColumnCountChange: (newColumnCount: number) => void;
  onHostFilterChange: (newHosts: string[]) => void;
  onSortingOptionChange: (newOrderFunc: ElementOrderFunc) => void;
  onSortingDirectionChange: (isAscending: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: "0px 5px 20px 5px",
    },
    slider: {
      padding: "15px 0px 15px 0px",
      width: "150px",
    },
    sortArrow: {
      padding: "0px",
      marginTop: "26px",
    },
  })
);

export const sortDefault: ElementOrderFunc = {
  orderFunc: (el1: Element, el2: Element) => {
    if (el1.sequence === null) return 1;
    if (el2.sequence === null) return -1;
    return el1.sequence - el2.sequence;
  },
};

export const sortByName: ElementOrderFunc = {
  orderFunc: (el1: Element, el2: Element) => {
    return (el1.name.length === 0 ? el1.link : el1.name).localeCompare(
      el2.name.length === 0 ? el2.link : el2.name
    );
  },
};

export const sortByHost: ElementOrderFunc = {
  orderFunc: (el1: Element, el2: Element) => {
    let host1 = GetUserFriendlyHostname(el1.link);
    let host2 = GetUserFriendlyHostname(el2.link);
    return host1?.localeCompare(host2 ?? "") ?? 0;
  },
};

export function ElementControlMenu(props: ElementControlMenuProps) {
  const classes = useStyles();

  let sortingOptions = [
    { key: 1, label: "Default", orderFunc: sortDefault },
    { key: 2, label: "Name", orderFunc: sortByName },
    { key: 3, label: "Hostname", orderFunc: sortByHost },
  ] as SortingOption[];

  let [sortingOption, setSortingOption] = useState(sortingOptions[0]);
  let [hostFilters, setHostFilters] = useState(
    props.hosts.map((h) => {
      return { host: h, enabled: true } as HostFilter;
    })
  );
  useEffect(() => {
    if (hostFilters.length !== props.hosts.length)
      setHostFilters(
        props.hosts.map((h) => {
          return { host: h, enabled: true } as HostFilter;
        })
      );
  }, [props.hosts, hostFilters.length]);

  let [sortedAscending, setSortedAscending] = useState(true);

  const onChipClick = (filter: HostFilter) => {
    let newHosts = hostFilters.map((f) => {
      return f.host === filter.host ? { host: f.host, enabled: !f.enabled } : f;
    });
    setHostFilters(newHosts);
    let hsts = newHosts.filter((f) => f.enabled).map((f) => f.host);
    props.onHostFilterChange(hsts);
  };

  const onSortingOptionChange = (optionKey: number) => {
    let selectedOption = sortingOptions.find((opt) => opt.key === optionKey)!;
    setSortingOption(selectedOption);
    props.onSortingOptionChange(selectedOption.orderFunc);
  };

  const onSortingDirectionToggle = () => {
    props.onSortingDirectionChange(!sortedAscending);
    setSortedAscending(!sortedAscending);
  };

  let [columnCount, setColumnCount] = useCookie("columnCount", 3);
  const onColumnCountChange = (event: any, newValue: number | number[]) => {
    let val = newValue as number;
    setColumnCount(val);
    props.onColumnCountChange(val);
  };
  // props.onColumnCountChange(columnCount);

  //TODO: Layout
  return (
    <Grid container spacing={2}>
      <Grid item xs container>
        {hostFilters.map((filter) => {
          return (
            <Chip
              clickable
              key={filter.host}
              className={classes.chip}
              label={filter.host}
              onClick={() => onChipClick(filter)}
              color={"primary"}
              variant={filter.enabled ? "default" : "outlined"}
            />
          );
        })}
      </Grid>
      <Grid item>
        <Typography id="continuous-slider">Columns</Typography>
        <Slider
          marks
          value={columnCount}
          step={1}
          min={1}
          max={5}
          getAriaValueText={(v) => v.toString()}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          className={classes.slider}
          onChange={onColumnCountChange}
        />
      </Grid>
      <Grid item style={{ paddingRight: "0px" }}>
        <Typography id="select-label">Sorting</Typography>
        <Select
          disableUnderline
          value={sortingOption.key}
          onChange={(ev) => onSortingOptionChange(ev.target.value as number)}
        >
          {sortingOptions.map((opt) => {
            return (
              <MenuItem key={opt.key} value={opt.key}>
                {opt.label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid item style={{ paddingLeft: "0px" }}>
        <IconButton
          onClick={onSortingDirectionToggle}
          className={classes.sortArrow}
        >
          {sortedAscending ? <ArrowDownward /> : <ArrowUpward />}
        </IconButton>
      </Grid>
    </Grid>
  );
}
