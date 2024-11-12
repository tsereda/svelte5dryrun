import * as d3 from 'd3';

interface DataPoint {
  label: string;
  value: number;
}

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Scales {
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number>;
}

export const createScales = (
  data: DataPoint[], 
  width: number, 
  height: number, 
  margin: Margin
): Scales => {
  const x = d3.scaleBand<string>()
    .domain(data.map(d => d.label))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) ?? 0])
    .nice()
    .range([height - margin.bottom, margin.top]);

  return { x, y };
};

export const updateChart = (
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: DataPoint[],
  scales: Scales
): void => {
  selection.selectAll<SVGRectElement, DataPoint>('rect')
    .data(data)
    .join('rect')
      .transition()
      .duration(750)
      .attr('x', d => scales.x(d.label) ?? 0)
      .attr('y', d => scales.y(d.value))
      .attr('height', d => scales.y(0) - scales.y(d.value))
      .attr('width', scales.x.bandwidth());
};