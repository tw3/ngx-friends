import { D3Graph, D3GraphLink, D3GraphNode } from './d3-graph-data.model';
import { deepCloneObj } from '@ngf/shared-ui';
import { ForceDirectedGraph } from '../../models/force-directed-graph.model';

export class D3GraphDataGenerator {
  private readonly hasData: boolean;

  constructor(private readonly friendsGraph: ForceDirectedGraph) {
    this.hasData = this.getHasData();
  }

  generate(): D3Graph {
    if (!this.hasData) {
      return {
        nodes: [],
        links: []
      };
    }

    const d3Nodes: D3GraphNode[] = this.getD3GraphNodesFromForceDirectedGraph();
    const d3Links: D3GraphLink[] = this.getD3GraphLinksFromForceDirectedGraph();
    return {
      nodes: deepCloneObj(d3Nodes),
      links: deepCloneObj(d3Links)
    };
  }

  private getD3GraphNodesFromForceDirectedGraph(): D3GraphNode[] {
    const numFriendsHash: Record<string, number> = this.getNumFriendsHash();
    return this.friendsGraph.nodes.map(node => {
      const userName = node.value;
      return {
        id: userName,
        numFriends: numFriendsHash[userName] || 0
      };
    });
  }

  private getD3GraphLinksFromForceDirectedGraph(): D3GraphLink[] {
    return this.friendsGraph.links;
  }

  private getNumFriendsHash(): Record<string, number> {
    const numFriendsHash = {};

    for (const link of this.friendsGraph.links) {
      numFriendsHash[link.source] = (numFriendsHash[link.source] || 0) + 1;
    }

    return numFriendsHash;
  }

  private getHasData(): boolean {
    return (
      this.friendsGraph &&
      Array.isArray(this.friendsGraph.nodes) &&
      Array.isArray(this.friendsGraph.links)
    );
  }

}
