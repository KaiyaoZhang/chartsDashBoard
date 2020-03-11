import React, { useState } from "react";
import {
  Grid,
  Paper,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { useTheme } from "@material-ui/styles";
import Highcharts from "highcharts";
import Chart from "highcharts-react-official";
// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";

const areaChartOptions = {
  chart: {
    type: 'areaspline'
  },
  title: {
    text: ''
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 150,
    y: 100,
    floating: true,
    borderWidth: 1,
    backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul'
  ]
  },
  yAxis: {
      title: {
          text: ''
      },
      labels: {
          formatter: function () {
              return this.value + 'k';
          }
      }
  },
  tooltip: {
    shared: true,
    valueSuffix: 'K'
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    areaspline: {
        fillOpacity: 0.5
    }
  },
  series: [{
    name: 'Main CMS',
    data: [3, 4, 3, 5, 4, 10, 12]
  }, {
      name: 'Music CMS',
      data: [1, 3, 4, 3, 3, 5, 4]
  }]
  }

const PieChartoptions = {
  chart: {
    type: "pie"
  },
  title: {
    text: ''
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [
    {
      data: [
        {
          name:'Total Spent',
          y: 100
        },
        {
          name: 'Money Saved',
          y: 50
        }
      ]
    }
  ]
}

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      <PageTitle title="Overview" />
      <Grid container spacing={4}>
        {mock.bigStat.map(stat => (
          <Grid item lg={4} md={8} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))}
      
        <Grid item lg={8} xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Views
                </Typography>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Last 6 months</MenuItem>
                </Select>
              </div>
            }
          >
              <Chart highcharts={Highcharts} options={areaChartOptions} height={160} />
          </Widget>
        </Grid>

        <Grid item lg={4} sm={6} xs={12}>
          <Widget title="Money" subtitle='Total Budget' number='$50000' className={classes.card}>
            <Divider/>
            <Grid container direction="column" justify='center' spacing={4}>
              <Grid item xs>
                  <Chart highcharts={Highcharts} options={PieChartoptions} />
              </Grid>
              <Grid item xs>
                <Grid container direction='row' alignItems='center' justify='space-between'>
                    <Grid item>
                      <text className={classes.text1}>Total Spent: $3600</text>
                    </Grid>
                    <Grid item>
                      <text className={classes.text2}>Total Saved: $1300</text>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
              </Grid>
            </Grid>
            <Divider/>
            <Grid container direction='column' alignItems='center' justify='center'>
              <Grid item xs>{" "}</Grid>
              <Grid item xs>
                <text className={classes.text3}>
                  View Full Reports
                </text>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={7} xs={12}>
          <Widget
            title="Referrer"
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
        <Grid item lg={5} xs={12}>
          <Widget
              bodyClass={classes.mainChartBody}
              header={
                <div className={classes.mainChartHeader}>
                  <Typography
                    variant="h5"
                    color="text"
                    colorBrightness="secondary"
                  >
                    Subscribers
                  </Typography>
                  <Select
                    value={mainChartState}
                    onChange={e => setMainChartState(e.target.value)}
                    input={
                      <OutlinedInput
                        labelWidth={0}
                        classes={{
                          notchedOutline: classes.mainChartSelectRoot,
                          input: classes.mainChartSelect,
                        }}
                      />
                    }
                    autoWidth
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Last 6 months</MenuItem>
                  </Select>
                </div>
              }
            >
                <Chart highcharts={Highcharts} options={areaChartOptions} height={160} />
            </Widget>
        </Grid>
      </Grid>
    </>
  );
}

