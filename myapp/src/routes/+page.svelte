<script lang="ts">
    import BarChart from '$lib/components/charts/BarChart.svelte';
    import LineChart from '$lib/components/charts/LineChart.svelte';
    import ScatterPlot from '$lib/components/charts/ScatterPlot.svelte';
    import type { DataPoint } from '$lib/stores/chartStore';
  
    const data: DataPoint[] = [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'C', value: 15 },
      { label: 'D', value: 25 }
    ];
  
    function handlePointClick(event: CustomEvent<{ data: DataPoint; event: MouseEvent }>) {
      console.log('Point clicked:', event.detail.data);
    }
  </script>
  
  <div class="grid gap-8">
    <section>
      <h2>Bar Chart</h2>
      <BarChart {data} />
    </section>
  
    <section>
      <h2>Line Chart</h2>
      <LineChart {data} />
    </section>
  
    <section>
      <h2>Scatter Plot</h2>
      <ScatterPlot 
        {data} 
        on:pointClick={handlePointClick}
      />
    </section>
  </div>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  
    h2 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
  </style>