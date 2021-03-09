export interface ForceDirectedGraph {
  nodes: ForceDirectedGraphNode[];
  links: ForceDirectedGraphLink[];
}

export interface ForceDirectedGraphLink {
  source: ForceDirectedGraphLinkSource,
  target: ForceDirectedGraphLinkTarget
}

export type ForceDirectedGraphLinkSource = string;

export type ForceDirectedGraphLinkTarget = string;

export interface ForceDirectedGraphNode {
  value: string
}
