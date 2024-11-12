<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import type { DataPoint } from '$lib/stores/chartStore';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher<{
      pointClick: { data: DataPoint; event: MouseEvent };
    }>();
  
    export let data: DataPoint[] = [];
    let svgElement: SVGSVGElement;
  
    $: width = 600;
    $: height = 400;
    $: margin = { top: 20, right: 20, bottom: 30, left: 40 };
  
    function handleClick(event: MouseEvent, d: DataPoint) {
      dispatch('pointClick', { data: d, event });
    }
  
    onMount(() => {
      const svg = d3.select<SVGSVGElement, unknown>(svgElement);
  
      const x = d3.scalePoint<string>()
        .domain(data.map(d => d.label))
        .range([margin.left, width - margin.right]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) ?? 0])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      svg.selectAll<SVGCircleElement, DataPoint>('circle')
        .data(data)
        .join('circle')
          .attr('cx', d => x(d.label) ?? 0)
          .attr('cy', d => y(d.value))
          .attr('r', 5)
          .attr('fill', 'steelblue')
          .on('click', (event, d) => handleClick(event, d));
  
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