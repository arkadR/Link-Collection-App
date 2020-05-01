import React, { ReactNode, useState, useEffect } from "react";
import { Collection } from "../Model/Collection";
import { Element } from "../Model/Element";
import ElementWrapper from "./ElementWrapper";
import { GridList, GridListTile, Divider } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { GetUserFriendlyHostname } from "../Infrastructure/UrlUtilities";
import {
  ElementControlMenu,
  sortDefault,
  ElementOrderFunc,
} from "./ElementControlMenu";

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

export default function BaseCollectionView(props: BaseCollectionViewProps) {
  const classes = useStyles();

  let elements = props.collection?.elements ?? [];
  let allHosts = Array.from(
    new Set(elements.map((el) => GetUserFriendlyHostname(el.link) ?? ""))
  );

  let [sortedAscending, setSortedAscending] = useState(true);
  let [selectedHosts, setSelectedHosts] = useState(allHosts);
  let [elementOrderFunction, setElementOrderFunction] = useState(sortDefault);

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

  return (
    <>
      <ElementControlMenu
        hosts={allHosts}
        onHostFilterChange={(hosts) => setSelectedHosts(hosts)}
        onSortingOptionChange={(orderFunc) =>
          setElementOrderFunction(orderFunc)
        }
        onSortingDirectionChange={(isAsc) => setSortedAscending(isAsc)}
      />
      <Divider />
      <GridList
        cols={3}
        cellHeight="auto"
        spacing={50}
        className={classes.list}
      >
        {GridColumnList(displayedElements.filter((el, idx) => idx % 3 === 0))}
        {GridColumnList(displayedElements.filter((el, idx) => idx % 3 === 1))}
        {GridColumnList(displayedElements.filter((el, idx) => idx % 3 === 2))}
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
