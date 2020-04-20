import React, { ReactNode } from "react";
import { Collection } from "../Model/Collection";
import { Element } from "../Model/Element";
import ElementWrapper from "./ElementWrapper";
import { GridList, GridListTile } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

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

  let elements =
    props.collection?.elements.sort((el1, el2) => {
      if (el1.sequence === null) return 1;
      if (el2.sequence === null) return -1;
      return el1.sequence - el2.sequence;
    }) ?? [];
  return (
    <>
      <GridList
        cols={3}
        cellHeight="auto"
        spacing={50}
        className={classes.list}
      >
        {GridColumnList(elements.filter((el, idx) => idx % 3 === 0))}
        {GridColumnList(elements.filter((el, idx) => idx % 3 === 1))}
        {GridColumnList(elements.filter((el, idx) => idx % 3 === 2))}
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
