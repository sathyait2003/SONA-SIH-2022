import { Center, Group, Paper, RingProgress, SimpleGrid, Text, createStyles, Title, ScrollArea } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight, IconCircle1, IconCircle2, IconCircle3, TablerIcon } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";
import IndiaMap from "./IndiaMap";
import MyResponsiveBar from "./MyResponsiveBar";
import MyResponsiveBarCase from "./MyResponsiveBarCase";
import MyResponsivePie from "./MyResponsivePie";
import MyResponsiveRadar from "./MyResponsiveRadar";

interface StatsRingProps {
    data: {
      label: string;
      stats: string;
      progress: number;
      color: string;
      icon: 'up' | 'down';
    }[];
}

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

export function StatsRing({ data }: StatsRingProps) {
    const stats = data.map((stat) => {
      const Icon = icons[stat.icon];
      return (
        <Paper withBorder radius="md" p="xs" key={stat.label}>
          <Group>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: stat.progress, color: stat.color }]}
              label={
                <Center>
                  <Icon size={22} stroke={1.5} />
                </Center>
              }
            />
  
            <div>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {stat.label}
              </Text>
              <Text weight={700} size="xl">
                {stat.stats}
              </Text>
            </div>
          </Group>
        </Paper>
      );
    });
    return (
      <SimpleGrid mt={30} cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {stats}
      </SimpleGrid>
    );
}

const useStyles = createStyles((theme) => ({
    root: {
      backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
        theme.colors[theme.primaryColor][7]
      } 100%)`,
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      display: 'flex',
  
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column',
      },
    },
  
    icon: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing.lg,
      color: theme.colors[theme.primaryColor][6],
    },
  
    stat: {
      minWidth: 98,
      paddingTop: theme.spacing.xl,
      minHeight: 140,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: theme.white,
    },
  
    label: {
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: theme.fontSizes.xs,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      color: theme.colors.gray[6],
      lineHeight: 1.2,
    },
  
    value: {
      fontSize: theme.fontSizes.sm,
      fontWeight: 700,
      color: theme.black,
    },
  
    count: {
      color: theme.colors.gray[6],
    },
  
    day: {
      fontSize: 44,
      fontWeight: 700,
      color: theme.white,
      lineHeight: 1,
      textAlign: 'center',
      marginBottom: 5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    month: {
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      lineHeight: 1,
      marginBottom: 5,
      textAlign: 'center',
    },
  
    controls: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing.xl * 2,
  
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 0,
        marginBottom: theme.spacing.xl,
      },
    },
  
    date: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  
    control: {
      height: 28,
      width: '100%',
      color: theme.colors[theme.primaryColor][2],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.radius.md,
      transition: 'background-color 50ms ease',
  
      [theme.fn.smallerThan('xs')]: {
        height: 34,
        width: 34,
      },
  
      '&:hover': {
        backgroundColor: theme.colors[theme.primaryColor][5],
        color: theme.white,
      },
    },
  
    controlIcon: {
      [theme.fn.smallerThan('xs')]: {
        transform: 'rotate(-90deg)',
      },
    },
}));

function Standings({label, data}: {label: string, data: {icon: TablerIcon, label: string, value: number}[]}) {
    const { classes } = useStyles();

    const stats = data.map((stat) => (
        <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label}>
          <stat.icon size={45} className={classes.icon} stroke={1.5} />
          <div>
            <Text className={classes.label}>{stat.label}</Text>
            <Text size="xs" className={classes.count}>
              <span className={classes.value}>{stat.value} cases</span>
            </Text>
          </div>
        </Paper>
    ));

    return(
        <div className={classes.root}>
            <div className={classes.controls}>
                <div className={classes.date}>
                <Text className={classes.month}>Lawyers with most</Text>
                <Text className={classes.day}>{label.toUpperCase()}</Text>
                <Text className={classes.month}>cases</Text>
                </div>
            </div>
            <Group sx={{ flex: 1 }}>{stats}</Group>
        </div>
    )
}

function Analytics() {

    const [totalStats, setTotalStats] = useState<any | null>(null)
    const [advocateStats, setAdvocateStats] = useState<{name: string, disposed_cases: number, pending_cases: number}[]>([])
    const [yearwiseStats, setYearwiseStats] = useState<any | null>(null)
    const [categorywiseStats, setCategorywiseStats] = useState<any | null>(null)
    const [judgement, setJudgement] = useState<any | null>(null)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/analytics`)
            .then((response) => setTotalStats(response.data))
            .catch((err) => {
                toast.error("Error occured while fetching stats.")
                console.log(err)
            })
        axios.get(`${BACKEND_URL}/analytics/advocate`)
            .then((response) => setAdvocateStats(response.data))
            .catch((err) => {
                toast.error("Error occured while fetching stats.")
                console.log(err)
            })
        axios.get(`${BACKEND_URL}/analytics/yearwise`)
            .then((response) => setYearwiseStats(response.data))
            .catch((err) => {
                toast.error("Error occured while fetching stats.")
                console.log(err)
            })
        axios.get(`${BACKEND_URL}/analytics/categorywise`)
            .then((response) => setCategorywiseStats(response.data))
            .catch((err) => {
                toast.error("Error occured while fetching stats.")
                console.log(err)
            })
        axios.get(`${BACKEND_URL}/analytics/judgement`)
            .then((response) => setJudgement(response.data))
            .catch((err) => {
                toast.error("Error occured while fetching stats.")
                console.log(err)
            })
    }, [])

    const pendingSort = [...advocateStats].sort((a, b) => b.pending_cases - a.pending_cases)
    const disposedSort = [...advocateStats].sort((a, b) => b.disposed_cases - a.disposed_cases)

    let yearwiseRadarData = null;
    if(yearwiseStats !== null) {
      yearwiseRadarData = []
      for(var i = 2018; i <= 2022; i++) {
        yearwiseRadarData.push({
          year: i,
          disposed: yearwiseStats.disposed[2022-i].value,
          pending: yearwiseStats.pending[2022-i].value,
          total: yearwiseStats.disposed[2022-i].value + yearwiseStats.pending[2022-i].value
        })
      }
    }

    let winCount = 0, lossCount = 0;
    if(judgement !== null) {
      const data = Array.from(Object.values(judgement))
      for(i = 0; i < data.length; i++) {
        if(data[i] === 0) winCount++
        else lossCount++
      }
    }

    return(
        <ScrollArea>
            <div className="analytics">
                <h2>Legal Management System</h2>
                {totalStats !== null && (
                    <StatsRing data={[
                        {label: 'Total disposed cases', stats: totalStats.total_disposed_cases, progress: (totalStats.total_disposed_cases/totalStats.total_cases)*100, icon: 'up', color: 'green'},
                        {label: 'Total pending cases', stats: totalStats.total_pending_cases, progress: (totalStats.total_pending_cases/totalStats.total_cases)*100, icon: 'down', color: 'red'},
                        {label: 'Total advocates', stats: totalStats.total_advocates, progress: 100, icon: 'up', color: 'yellow'}
                    ]} />
                )}
                {advocateStats.length >= 3 && (
                    <div className="standings-grp">
                        <Standings label="disposed" data={[
                            { icon: IconCircle1, label: disposedSort[0].name, value: disposedSort[0].disposed_cases },
                            { icon: IconCircle2, label: disposedSort[1].name, value: disposedSort[1].disposed_cases },
                            { icon: IconCircle3, label: disposedSort[2].name, value: disposedSort[2].disposed_cases },
                        ]} />
                        <Standings label="pending" data={[
                            { icon: IconCircle1, label: pendingSort[0].name, value: pendingSort[0].pending_cases },
                            { icon: IconCircle2, label: pendingSort[1].name, value: pendingSort[1].pending_cases },
                            { icon: IconCircle3, label: pendingSort[2].name, value: pendingSort[2].pending_cases },
                        ]} />
                    </div>
                )}
                {advocateStats.length > 0 && (
                  <Paper className="graph-wrap-paper long" withBorder radius='xs' p='md' mt={50}>
                    <Title align="center">Lawyer Performance</Title>
                    <MyResponsiveBar data={disposedSort.slice(0, 10)} />
                  </Paper>
                )}
                {yearwiseRadarData !== null && (
                  <div className="graph-grp">
                      <Paper className="graph-wrap-paper long" withBorder radius='xs' p='md' mt={50}>
                        <Title align="center">Yearwise Case Performance</Title>
                        <MyResponsiveRadar data={yearwiseRadarData} />
                      </Paper>
                      <Paper className="graph-wrap-paper long" withBorder radius='xs' p='md' mt={50}>
                        <Title align="center">Yearwise Case Performance</Title>
                        <MyResponsiveBarCase data={yearwiseRadarData} />
                      </Paper>
                  </div>
                )}
                {yearwiseStats !== null && (
                    <div className="graph-grp">
                        <Paper className="graph-wrap-paper" withBorder radius='xs' p='md' mt={50}>
                            <Title align="center">Year-wise disposed cases</Title>
                            <MyResponsivePie data={yearwiseStats.disposed} />
                        </Paper>
                        <Paper className="graph-wrap-paper" withBorder radius='md' p='md' mt={50}>
                            <Title align="center">Year-wise pending cases</Title>
                            <MyResponsivePie data={yearwiseStats.pending} />
                        </Paper>
                    </div>
                )}
                {categorywiseStats !== null && (
                    <div className="graph-grp">
                        <Paper className="graph-wrap-paper" withBorder radius='xs' p='md' mt={50}>
                            <Title align="center">Category-wise disposed cases</Title>
                            <MyResponsivePie data={categorywiseStats.disposed} />
                        </Paper>
                        <Paper className="graph-wrap-paper" withBorder radius='md' p='md' mt={50}>
                            <Title align="center">Category-wise pending cases</Title>
                            <MyResponsivePie data={categorywiseStats.pending} />
                        </Paper>
                    </div>
                )}
                {judgement !== null && (
                  <Paper className="graph-wrap-paper long" withBorder radius='md' p='md' mt={50}>
                    <Title align="center">Win/Loss</Title>
                    <MyResponsivePie 
                      data={[
                        {id: "Win", label: "Win", value: winCount},
                        {id: "Loss", label: "Loss", value: lossCount},
                      ]}
                    />
                </Paper>
                )}
                <h2 className="india-title">Statewise distribution of legal cases</h2>
                <IndiaMap />
            </div>
        </ScrollArea>
    )
}

export default Analytics