import { writable, type Writable } from 'svelte/store';

export interface DataPoint {
  label: string;
  value: number;
}

export interface ChartConfig {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const chartData: Writable<DataPoint[]> = writable([]);

export const chartConfig: Writable<ChartConfig> = writable({
  width: 600,
  height: 400,
  margin: { 
    top: 20, 
    right: 20, 
    bottom: 30, 
    left: 40 
  }
});