<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import type { DataPoint } from '$lib/stores/chartStore';
  
    export let data: DataPoint[] = [];
    let svgElement: SVGSVGElement;
  
    $: width = 600;
    $: height = 400;
    $: margin = { top: 20, right: 20, bottom: 30, left: 40 };
  
    onMount(() => {
      const svg = d3.select<SVGSVGElement, unknown>(svgElement);
  
      const x = d3.scalePoint<string>()
        .domain(data.map(d => d.label))
        .range([margin.left, width - margin.right]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) ?? 0])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      const line = d3.line<DataPoint>()
        .x(d => x(d.label) ?? 0)
        .y(d => y(d.value));
  
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);
  
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