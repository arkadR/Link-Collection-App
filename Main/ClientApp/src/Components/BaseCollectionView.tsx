import React, { ReactNode, useState, useEffect } from "react";
import { Collection } from "../Model/Collection";
import { Element } from "../Model/Element";
import ElementWrapper from "./ElementWrapper";
import { GridList, GridListTile, Divider, Box } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { GetUserFriendlyHostname } from "../Infrastructure/UrlUtilities";
import { ElementControlMenu, sortDefault } from "./ElementControlMenu";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "25px 30px 25px 30px",
    },
  })
);

type BaseCollectionViewProps = {
  collection: Collection | null;
  children?: ReactNode;
};

export default function BaseCollectionView(props: BaseCollectionViewProps) {
  const classes = useStyles();

  let elements = props.collection?.elements ?? [];
  let allHosts = Array.from(
    new Set(elements.map((el) => GetUserFriendlyHostname(el.link) ?? ""))
  );

  let [sortedAscending, setSortedAscending] = useState(true);
  let [selectedHosts, setSelectedHosts] = useState(allHosts);
  let [elementOrderFunction, setElementOrderFunction] = useState(sortDefault);
  let columnCountCookieContent = Cookies.get("columnCount");
  let columns =
    columnCountCookieContent === undefined
      ? 3
      : parseInt(columnCountCookieContent);
  let [columnCount, setColumnCount] = useState(columns);

  useEffect(() => {
    let elems = props.collection?.elements ?? [];
    let hosts = Array.from(
      new Set(elems.map((el) => GetUserFriendlyHostname(el.link) ?? ""))
    );
    setSelectedHosts(hosts);
  }, [props.collection]);

  let displayedElements = elements
    .filter((el) =>
      selectedHosts.includes(GetUserFriendlyHostname(el.link) ?? "")
    )
    .sort(elementOrderFunction.orderFunc);
  if (sortedAscending === false) {
    displayedElements.reverse();
  }

  let columnRange = Array.from({ length: columnCount }, (x, i) => i);

  return (
    <Box className={classes.root}>
      <ElementControlMenu
        hosts={allHosts}
        onHostFilterChange={(hosts) => setSelectedHosts(hosts)}
        onSortingOptionChange={(orderFunc) =>
          setElementOrderFunction(orderFunc)
        }
        onSortingDirectionChange={(isAsc) => setSortedAscending(isAsc)}
        onColumnCountChange={(newColCount) => setColumnCount(newColCount)}
      />
      <Divider />
      <GridList cols={columnCount} cellHeight="auto" spacing={30}>
        {columnRange.map((i) => {
          return GridColumnList(
            displayedElements.filter((el, idx) => idx % columnCount === i),
            i
          );
        })}
      </GridList>
      {props.children}
    </Box>
  );
}

function GridColumnList(elements: Element[], key: number) {
  return (
    <GridListTile key={key}>
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
