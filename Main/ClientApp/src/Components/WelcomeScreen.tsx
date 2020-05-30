import React, { useState, useEffect, ReactNode } from "react";
import PanelWideMessage from "./Common/PanelWideMessage";
import Layout from "./Layout";
import authService from "../Authorization/AuthorizeService";
import { Redirect, Link } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  makeStyles,
  Theme,
  createStyles,
  Card,
  Grid,
} from "@material-ui/core";
import AddCollectionImage from "../assets/images/home/addcollection.png";
import AddLinkImage from "../assets/images/home/addlink.png";
import { Variant } from "@material-ui/core/styles/createTypography";
import Center from "./Common/Center";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "2em 20vw 0 20vw",
    },
  })
);

export default function WelcomeScreen() {
  const classes = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function populateState() {
      setIsAuthenticated(await authService.isAuthenticated());
    }
    populateState();
    const subscription = authService.subscribe(() => populateState());

    return () => {
      authService.unsubscribe(subscription);
    };
  }, []);

  return (
    <Layout>
      {/* {isAuthenticated === true ? (
        <Redirect to={"/collections"} />
      ) : (
        <PanelWideMessage text="Log in to get started" />
      )} */}
      <Box className={classes.root}>
        <Paragraph titleVariant="h3" title="About this app">
          This website will let you organize links into collections, so you can
          easily save them and find later.
        </Paragraph>
        <Paragraph title="Create a collection" imagePath={AddCollectionImage}>
          You can create many collections to group your link thematically, or
          however fits your needs. Once you log in, Use the left-side menu to
          create and access your locations.
        </Paragraph>
        <Paragraph title="Add links" imagePath={AddLinkImage}>
          Use the floating button to add links to your collections. Give them a
          name to make them stand out!
        </Paragraph>
        <Paragraph title="Share">
          Share your collection so other users can contribute. You can give each
          user individual access to viewing or editing the collection you share.
        </Paragraph>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ padding: "3em 0 3em 0" }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            component={Link}
            to={isAuthenticated ? "/collections" : "/authentication/register"}
          >
            Get started
          </Button>
        </Grid>
      </Box>
    </Layout>
  );
}

type ParagraphProps = {
  title: string;
  titleVariant?: Variant;
  imagePath?: string;
  children: ReactNode;
};

function Paragraph(props: ParagraphProps) {
  return (
    <Box style={{ marginTop: "2em" }}>
      <Typography variant={props.titleVariant ?? "h4"}>
        {props.title}
      </Typography>
      <Grid container spacing={3} style={{ marginTop: "1em" }}>
        <Grid item xs={7}>
          <Typography variant="body1">{props.children}</Typography>
        </Grid>
        {props.imagePath && (
          <Grid item xs={5}>
            <Card>
              <img
                src={props.imagePath}
                alt={props.imagePath}
                style={{ width: "100%", height: "auto" }}
              ></img>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
