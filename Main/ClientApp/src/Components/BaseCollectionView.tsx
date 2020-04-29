import React, { ReactNode, useState, useEffect } from "react";
import { Collection } from "../Model/Collection";
import { Element } from "../Model/Element";
import ElementWrapper from "./ElementWrapper";
import { GridList, GridListTile, Chip, Divider } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { GetHostnameLink } from "../Infrastructure/UrlUtilities";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: "25px 30px 25px 30px",
    },
  })
);

type BaseCollectionViewProps = {
  collection: Collection | null;
  children?: ReactNode;
};

type HostFilter = {
  host: string;
  enabled: boolean;
};

export default function BaseCollectionView(props: BaseCollectionViewProps) {
  const classes = useStyles();

  let elements =
    props.collection?.elements.sort((el1, el2) => {
      if (el1.sequence === null) return 1;
      if (el2.sequence === null) return -1;
      return el1.sequence - el2.sequence;
    }) ?? [];

  // TODO: try to make a distinct() on Array prototype
  let [hostFilters, setHostFilters] = useState<HostFilter[]>(
    Array.from(new Set(elements.map((el) => GetHostnameLink(el.link)))).map(
      (host) => {
        return { host: host, enabled: true } as HostFilter;
      }
    )
  );

  useEffect(() => {
    let elems = props.collection?.elements;
    setHostFilters(
      Array.from(new Set(elems?.map((el) => GetHostnameLink(el.link)))).map(
        (host) => {
          return { host: host, enabled: true } as HostFilter;
        }
      )
    );
  }, [props.collection]);

  let onChipClick = (label: string) => {
    setHostFilters(
      hostFilters.map((filter) => {
        if (filter.host === label)
          return { host: filter.host, enabled: !filter.enabled } as HostFilter;
        else return filter;
      })
    );
  };

  console.log(hostFilters);

  let filteredElements = elements.filter((el) => {
    let filter = hostFilters.find(
      (filter) => filter.host === GetHostnameLink(el.link)
    );
    return filter?.enabled;
  });

  return (
    <>
      {hostFilters.map((filter) => {
        return (
          <Chip
            clickable
            label={filter.host}
            onClick={() => onChipClick(filter.host)}
            color={"primary"}
            variant={filter.enabled ? "default" : "outlined"}
          />
        );
      })}
      <Divider />
      <GridList
        cols={3}
        cellHeight="auto"
        spacing={50}
        className={classes.list}
      >
        {GridColumnList(filteredElements.filter((el, idx) => idx % 3 === 0))}
        {GridColumnList(filteredElements.filter((el, idx) => idx % 3 === 1))}
        {GridColumnList(filteredElements.filter((el, idx) => idx % 3 === 2))}
      </GridList>
      {props.children}
    </>
  );
}

function GridColumnList(elements: Element[]) {
  return (
    <GridListTile>
      <GridList cols={1} cellHeight="auto" spacing={20}>
        {elements.map((element) => {
          return (
            <GridListTile key={element.id}>
              <ElementWrapper element={element} />
            </GridListTile>
          );
        })}
      </GridList>
    </GridListTile>
  );
}
