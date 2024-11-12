<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  interface DataPoint {
    label: string;
    value: number;
  }

  export let data: DataPoint[] = [];
  let svgElement: SVGSVGElement;

  $: width = 600;
  $: height = 400;
  $: margin = { top: 20, right: 20, bottom: 30, left: 40 };

  onMount(() => {
    const svg = d3.select<SVGSVGElement, unknown>(svgElement);
    
    // Create scales
    const x = d3.scaleBand<string>()
      .domain(data.map(d => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add bars
    svg.selectAll<SVGRectElement, DataPoint>('rect')
      .data(data)
      .join('rect')
        .attr('x', d => x(d.label) ?? 0)
        .attr('y', d => y(d.value))
        .attr('height', d => y(0) - y(d.value))
        .attr('width', x.bandwidth())
        .attr('fill', 'steelblue');

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  });
</script>

<svg
  bind:this={svgElement}
  {width}
  {height}
/>

<style>
  svg {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
</style>