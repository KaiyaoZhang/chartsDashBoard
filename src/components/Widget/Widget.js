import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";

// styles
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  number,
  subtitle,
  ...props
}) {
  var classes = useStyles();

  // local
  var [moreButtonRef, setMoreButtonRef] = useState(null);

  return (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        <div className={classes.widgetHeader}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Grid container direction='column'>
                <Grid item>
                  <Typography variant="h5" color="textSecondary">
                    {title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction='row' alignItems='center' justify='space-between'>
                    <Grid item>
                      <Typography variant='subtitle1'>
                        {subtitle}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <div className={classes.number}>
                        {number}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
}
