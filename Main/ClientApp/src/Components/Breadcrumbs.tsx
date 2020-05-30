import React, { useState, useEffect } from "react";
import { Breadcrumbs as MaterialBreadcrumbs, Button } from "@material-ui/core";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CollectionsStore from "../Stores/CollectionsStore";
import { Collection } from "../Model/Collection";

export default function Breadcrumbs() {
  return (
    //   https://material-ui.com/components/breadcrumbs/
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);

        return (
          <MaterialBreadcrumbs
            maxItems={4}
            separator={
              <NavigateNextIcon
                // fontSize="small"
                style={{ fill: "white" }}
              />
            }
            aria-label="breadcrumb"
          >
            {/* uncomment if home page is active */}
            {/* <Button size="large" component={Link} to="/">
              Home
            </Button> */}
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isNumber = !isNaN(Number(value));

              return (
                <Button
                  style={{ color: "white" }}
                  component={Link}
                  to={to}
                  key={to}
                >
                  {isNumber ? (
                    <BreadcrumbsCollectionValue value={Number(value)} />
                  ) : (
                    value
                  )}
                </Button>
              );
            })}
          </MaterialBreadcrumbs>
        );
      }}
    </Route>
  );
}

type BreadcrumbsCollectionValueProps = { value: number };

function BreadcrumbsCollectionValue(props: BreadcrumbsCollectionValueProps) {
  const [collection, setCollection] = useState<Collection | null>(
    CollectionsStore.getCollection(props.value)
  );

  useEffect(() => {
    const collectionChangeHandler = () => {
      setCollection(CollectionsStore.getCollection(props.value));
    };

    CollectionsStore.addChangeListener(collectionChangeHandler);

    return () => {
      CollectionsStore.removeChangeListener(collectionChangeHandler);
    };
  }, [props.value]);

  if (collection === null) return <>{`${props.value}`}</>;
  return <>{collection.name}</>;
}
