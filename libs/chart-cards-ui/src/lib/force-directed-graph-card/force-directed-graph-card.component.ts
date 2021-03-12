import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import * as D3 from 'd3';
import { chartColorScheme } from '../chart-color-scheme';
import { D3GraphDataGenerator } from './d3-graph-data-generator';
import { D3Graph, D3GraphNode } from './d3-graph-data.model';

@Component({
  selector: 'ngf-force-directed-graph-card',
  templateUrl: './force-directed-graph-card.component.html',
  styleUrls: ['./force-directed-graph-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForceDirectedGraphCardComponent implements OnInit, OnChanges {
  @Input() friendsGraph: ForceDirectedGraph;
  @Input() title: string; // TODO: use this value

  private svg;
  private simulation;
  private width = 900;
  private height = 350;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['friendsGraph']) {
      // Ideally we would not re-draw the whole graph when the friend graph changes
      this.createSvg();

      const d3Graph: D3Graph = this.getD3GraphFromForceDirectedGraph(this.friendsGraph);
      this.drawGraph(d3Graph);
    }
  }

  private getD3GraphFromForceDirectedGraph(friendsGraph: ForceDirectedGraph): D3Graph {
    const generator: D3GraphDataGenerator = new D3GraphDataGenerator(friendsGraph);
    return generator.generate();
  }

  private createSvg() {
    D3.select('figure.dag-container').html('');

    this.svg = D3.select('figure.dag-container')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('display', 'inline-block')
      .attr('position', 'absolute')
      .attr('top', '0')
      .attr('left', '0');
  }

  private drawGraph(graph: D3Graph): void {
    this.simulation = D3.forceSimulation()
      .force('link', D3.forceLink().id(d => d['id']).distance(80))
      .force('charge', D3.forceManyBody().strength(-30))
      .force('center', D3.forceCenter(this.width / 2, this.height / 2));

    const link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#999');

    const node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graph.nodes)
      .enter().append('g');

    const circles = node.append('circle')
      .attr('r', (d: D3GraphNode) => {
        return 8 + d.numFriends;
      })
      .attr('fill', (d: D3GraphNode, i) => {
        const numColors = chartColorScheme.domain.length;
        const modIdx = i % numColors;
        return chartColorScheme.domain[modIdx];
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#fff');


    // .call(D3.drag()
    //   .on('start', this.onDragStart)
    //   .on('drag', this.onDrag)
    //   .on('end', this.onDragEnd));
    // TODO: Fix drag functionality if I have time

    const labels = node.append('text')
      .text(function(d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', (d: D3GraphNode) => (d.numFriends + 15))
      .attr('font-size', '12px');

    node.append('title')
      .text(function(d) {
        return d.id;
      });

    this.simulation
      .nodes(graph.nodes)
      .on('tick', ticked);

    this.simulation.force('link')
      .links(graph.links);

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
    }
  }

  private onDragStart(d) {
    if (!D3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  private onDrag(d) {
    d.fx = D3.event.x;
    d.fy = D3.event.y;
  }

  private onDragEnd(d) {
    if (!D3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

}

interface ForceDirectedGraph {
  nodes: ForceDirectedGraphNode[];
  links: ForceDirectedGraphLink[];
}

interface ForceDirectedGraphLink {
  source: ForceDirectedGraphLinkSource,
  target: ForceDirectedGraphLinkTarget
}

type ForceDirectedGraphLinkSource = string;

type ForceDirectedGraphLinkTarget = string;

interface ForceDirectedGraphNode {
  value: string
}
