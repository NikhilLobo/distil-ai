import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { weekNavigation as weekData } from "../../data/mockData.js";
import dynamic from "next/dynamic";
const DonutChart = dynamic(() => import("./DonutChart"), { ssr: false });
const TrackingChart = dynamic(() => import("./TrackingChart.jsx"), {
  ssr: false,
});

import AssignmentIcon from "@mui/icons-material/Assignment";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import StorageIcon from "@mui/icons-material/Storage";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

const Dashboard: React.FC = () => {
  const [activeWeekLabel, setActiveWeekLabel] = useState(weekData[0].label);
  const [activeTab, setActiveTab] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Optimize re-renders using useMemo
  const activeWeek = useMemo(
    () =>
      weekData.find((week) => week.label === activeWeekLabel) || weekData[0],
    [activeWeekLabel]
  );

  // ✅ Prevent unnecessary re-renders using useCallback
  const handleWeekClick = useCallback(
    (label: string) => {
      if (label !== activeWeekLabel) {
        setActiveWeekLabel(label);
      }
    },
    [activeWeekLabel]
  );

  // ✅ Scroll Function
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // ✅ Force scroll position check after scrolling
      setTimeout(() => {
        checkScrollButtons();
      }, 200); // Ensure the state updates correctly
    }
  };

  // ✅ Detect Scroll Position to Hide/Show Arrows
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollContainerRef.current) {
        checkScrollButtons();
      }
    };
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: "#EAEAEA",
      }}
    >
      {/* Top Section - Week Navigation */}
      <Paper
        sx={{ p: 2, mb: 1, overflowX: "hidden", backgroundColor: "#EAEAEA" }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "##000000", fontWeight: "bold" }}
        >
          Next 5 Weeks
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          {canScrollLeft && (
            <IconButton onClick={() => handleScroll("left")}>
              {" "}
              <ArrowBackIosIcon sx={{ fontSize: "28px" }} />{" "}
            </IconButton>
          )}
          <Box
            ref={scrollContainerRef}
            display="flex"
            gap={1}
            alignItems="center"
            overflow="auto"
            sx={{
              maxWidth: "100%",
              flexGrow: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {weekData.map((week) => (
              <Box
                key={week.label}
                onClick={() => handleWeekClick(week.label)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  minWidth: { xs: 100, md: 180 },
                  cursor: "pointer",
                  borderBottom:
                    activeWeekLabel === week.label ? "3px solid black" : "none",
                  fontWeight:
                    activeWeekLabel === week.label ? "bold" : "normal",
                  backgroundColor:
                    activeWeekLabel === week.label || week.label === "+1 Week"
                      ? "#fff"
                      : "#EAEAEA",
                  transition:
                    "background-color 0.3s ease, border-bottom 0.3s ease",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight:
                        activeWeekLabel === week.label ? "bold" : "normal",
                    }}
                  >
                    {week.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#7d7d7d" }}>
                    {week.date}
                  </Typography>
                </Box>
                {/* ✅ Restore Green and Red Values */}
                <Box textAlign="right">
                  <Typography
                    variant="body2"
                    sx={{ color: "#A8CF45", fontWeight: "bold" }}
                  >
                    {week.valueGreen}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#E65045", fontWeight: "bold" }}
                  >
                    {week.valueRed}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {canScrollRight && (
            <IconButton onClick={() => handleScroll("right")}>
              {" "}
              <ArrowForwardIosIcon sx={{ fontSize: "28px" }} />{" "}
            </IconButton>
          )}
        </Box>
      </Paper>

      {/* ✅ Dynamic Week Title */}
      <Typography
        variant="h6"
        sx={{ p: 2, backgroundColor: "#EAEAEA", fontWeight: "bold" }}
      >
        Week of {activeWeek.date}
      </Typography>

      {/* ✅ Tabs Section */}
      <Box sx={{ overflowX: "hidden", maxWidth: "100vw" }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 35,
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "flex-start",
            "& .MuiTabs-scroller": {
              marginLeft: "0 !important",
            },
            "& .MuiTabs-flexContainer": {
              display: "flex",
              justifyContent: "flex-start",
            },
            "& .MuiTabs-scrollButtons": {
              width: "auto",
              "& svg": {
                fontSize: "48px",
              },
              "&.Mui-disabled": {
                opacity: 0.3,
              },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              minWidth: 150,
              textAlign: "left",
              backgroundColor: "#EAEAEA",
              marginRight: "15px",
              borderRadius: "6px 6px 0 0",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease-in-out",
              fontSize: "14px",
              fontWeight: "500",
              color: "#666",
              "&.Mui-selected": {
                backgroundColor: "#fff",
                color: "#AFB5A0",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                "& svg": { color: "#A8CF45" },
              },
              "& svg": { color: "#666" },
            },
          }}
        >
          <Tab icon={<AssignmentIcon />} iconPosition="start" label="Summary" />
          <Tab
            icon={<MonitorHeartIcon />}
            iconPosition="start"
            label="Diagnostic View"
          />
          <Tab
            icon={<TrendingUpIcon />}
            iconPosition="start"
            label="Marketing View"
          />
          <Tab
            icon={<EventNoteIcon />}
            iconPosition="start"
            label="Reservations View"
          />
          <Tab
            icon={<StorageIcon />}
            iconPosition="start"
            label="Operations View"
          />
          <Tab
            icon={<DonutLargeIcon />}
            iconPosition="start"
            label="Data View"
          />
        </Tabs>
      </Box>

      {/* ✅ Tab Content Section */}
      <Paper
        sx={{
          p: { md: 3 },
          mt: 0,
          backgroundColor: "#fff",
          minHeight: 200,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        {activeTab === 0 && (
          <Typography variant="body1" component="div">
            {" "}
            <Paper
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                gap: { xs: 1, md: 3 },
                p: { xs: 1, sm: 1, md: 3 },
                backgroundColor: "#fff",
              }}
            >
              {/* Left Side - Donut Chart */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Season Patterns this week
                </Typography>
                <Typography variant="body2">
                  Based on typical seasonal patterns, across your{" "}
                  <b>100 Restaurants</b> (2,700 Services)
                </Typography>
                {/* ✅ Section for Busy, Average, and Quiet with Vertical Lines */}
                <Box display="flex" gap={8} mt={2} alignItems="center">
                  {/* Busy */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 4,
                        height: 35,
                        backgroundColor: "#97A5B1",
                        borderRadius: 1,
                      }}
                    />
                    <Box display="flex" flexDirection="column">
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#97A5B1",
                          fontWeight: "bold",
                          lineHeight: 1.1,
                          pt: 0.5,
                        }}
                      >
                        25%
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#5A5A5A" }}>
                        Busy
                      </Typography>
                    </Box>
                  </Box>

                  {/* Average */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 4,
                        height: 35,
                        backgroundColor: "#A8CF45",
                        borderRadius: 1,
                      }}
                    />
                    <Box display="flex" flexDirection="column">
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#A8CF45",
                          fontWeight: "bold",
                          lineHeight: 1.1,
                          pt: 0.5,
                        }}
                      >
                        50%
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#5A5A5A" }}>
                        Average
                      </Typography>
                    </Box>
                  </Box>

                  {/* Quiet */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 4,
                        height: 35,
                        backgroundColor: "#E65045",
                        borderRadius: 1,
                      }}
                    />
                    <Box display="flex" flexDirection="column">
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#E65045",
                          fontWeight: "bold",
                          lineHeight: 1.1,
                          pt: 0.5,
                        }}
                      >
                        25%
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#5A5A5A" }}>
                        Quiet
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <br />

                <Box mb={1}>
                  <Divider />
                </Box>

                <Typography variant="caption">
                  This is based on Restaurant, Service, Day Of Week, Maximum and
                  Minimum.
                </Typography>
                <DonutChart />
              </Box>

              <Box>
                <TrackingChart />
              </Box>
            </Paper>
          </Typography>
        )}
        {activeTab === 1 && (
          <Typography variant="body1">Diagnostic View Content</Typography>
        )}
        {activeTab === 2 && (
          <Typography variant="body1">Marketing View Content</Typography>
        )}
        {activeTab === 3 && (
          <Typography variant="body1">Reservations View Content</Typography>
        )}
        {activeTab === 4 && (
          <Typography variant="body1">Operations View Content</Typography>
        )}
        {activeTab === 5 && (
          <Typography variant="body1">Data View Content</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
