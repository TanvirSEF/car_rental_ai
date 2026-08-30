/**
 * Dashboard & Analytics Configurations & Baseline Constants
 * Centralized constant definitions decoupled from UI components.
 */

export interface RegionConfig {
  name: string
  x: string
  y: string
  hitArea: string
}

export const DASHBOARD_REGIONS: Record<string, RegionConfig> = {
  africa: {
    name: "Africa",
    x: "52%",
    y: "38%",
    hitArea: "left-[45%] top-[30%] w-[18%] h-[40%]",
  },
  usa: {
    name: "United States",
    x: "18%",
    y: "28%",
    hitArea: "left-[8%] top-[15%] w-[22%] h-[30%]",
  },
  brazil: {
    name: "Brazil",
    x: "27%",
    y: "68%",
    hitArea: "left-[19%] top-[52%] w-[18%] h-[38%]",
  },
  saudi: {
    name: "Middle East",
    x: "58%",
    y: "42%",
    hitArea: "left-[54%] top-[30%] w-[10%] h-[25%]",
  },
  china: {
    name: "China",
    x: "74%",
    y: "30%",
    hitArea: "left-[64%] top-[15%] w-[22%] h-[35%]",
  },
  indonesia: {
    name: "Indonesia",
    x: "81%",
    y: "62%",
    hitArea: "left-[72%] top-[52%] w-[18%] h-[25%]",
  },
}

export interface TimeframeSummary {
  multiplier: number
  trend: number
  trendPeriod: string
  regions: Record<string, number>
}

export const DEFAULT_TIMEFRAME_SALES: Record<string, TimeframeSummary> = {
  "This Week": {
    multiplier: 1,
    trend: 48,
    trendPeriod: "compare to last week",
    regions: {
      africa: 3455,
      usa: 2890,
      china: 2140,
      brazil: 1650,
      saudi: 1120,
      indonesia: 940,
    },
  },
  "This Month": {
    multiplier: 4.2,
    trend: 32,
    trendPeriod: "compare to last month",
    regions: {
      africa: 14520,
      usa: 12150,
      china: 9800,
      brazil: 7200,
      saudi: 4900,
      indonesia: 3800,
    },
  },
  "This Year": {
    multiplier: 52,
    trend: 65,
    trendPeriod: "compare to last year",
    regions: {
      africa: 178400,
      usa: 148200,
      china: 112500,
      brazil: 86400,
      saudi: 58200,
      indonesia: 44100,
    },
  },
  "All Time": {
    multiplier: 110,
    trend: 84,
    trendPeriod: "overall growth",
    regions: {
      africa: 382000,
      usa: 315000,
      china: 245000,
      brazil: 189000,
      saudi: 128000,
      indonesia: 96000,
    },
  },
}

export const DEFAULT_MONTHLY_CHART = [
  { month: "Jan", revenue: 24000 },
  { month: "Feb", revenue: 31000 },
  { month: "Mar", revenue: 17500 },
  { month: "Apr", revenue: 21500 },
  { month: "May", revenue: 20500 },
  { month: "Jun", revenue: 30000 },
  { month: "July", revenue: 20000 },
  { month: "Aug", revenue: 18500 },
  { month: "Sep", revenue: 17500 },
]
