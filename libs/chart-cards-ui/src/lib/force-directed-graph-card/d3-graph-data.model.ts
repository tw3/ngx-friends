export interface D3Graph {
  nodes: D3GraphNode[],
  links: D3GraphLink[];
}

export interface D3GraphNode {
  id: string;
  numFriends: number;
}

export interface D3GraphLink {
  source: string;
  target: string;
}
