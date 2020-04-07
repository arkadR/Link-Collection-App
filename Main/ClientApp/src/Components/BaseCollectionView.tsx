import React, { ReactNode } from "react";
import { Collection } from "../Model/Collection";
import ElementCreator from "./ElementCreator";
import { GridList, GridListTile, Fab } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: "25px 30px 25px 30px"
    }
  })
);

type BaseCollectionViewProps = {
  collection: Collection | null | undefined;
  children?: ReactNode;
};

export default function BaseCollectionView(props: BaseCollectionViewProps) {
  const classes = useStyles();

  return (
    <>
      <GridList
        cols={3}
        cellHeight="auto"
        spacing={50}
        className={classes.list}
      >
        {GridColumnList(0, props.collection)}
        {GridColumnList(1, props.collection)}
        {GridColumnList(2, props.collection)}
      </GridList>
      {props.children}
    </>
  );
}

function GridColumnList(
  modulo: number,
  collection: BaseCollectionViewProps["collection"]
) {
  return (
    <GridListTile key={modulo}>
      <GridList cols={1} cellHeight="auto" spacing={50}>
        {collection?.elements.map(element => {
          if (element.sequence != null && element.sequence % 3 == modulo) {
            return (
              <GridListTile key={element.id}>
                <ElementCreator element={element} />
              </GridListTile>
            );
          }
        })}
      </GridList>
    </GridListTile>
  );
}
