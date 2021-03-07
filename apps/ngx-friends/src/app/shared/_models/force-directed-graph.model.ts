export interface ForceDirectedGraph {
  links: ForceDirectedGraphLink[];
  nodes: ForceDirectedGraphNode[];
}

export interface ForceDirectedGraphLink {
  source: ForceDirectedGraphLinkSource,
  target: ForceDirectedGraphLinkTarget
}

export interface ForceDirectedGraphLinkSource {
  name: string
}

export type ForceDirectedGraphLinkTarget = string;

export interface ForceDirectedGraphNode {
  value: string
}
