import { useState, useRef, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  reconnectEdge,
  MarkerType,
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { CustomBaseEdge } from "./edges/base-edge";
import { useStore } from "./store";
import { InputNode } from "./nodes/input-node";
import { LLMNode } from "./nodes/llm-node";
import { OutputNode } from "./nodes/output-node";
import { TextNode } from "./nodes/text-node";

import { AggregateNode } from "./nodes/aggregate-node";
import { DebugNode } from "./nodes/debug-node";
import { FilterNode } from "./nodes/filter-node";
import { HttpNode } from "./nodes/http-node";
import { TransformNode } from "./nodes/transform-node";
import { Card } from "./ui/card";
import EdgeWithDelete from "./edges/edge-with-delete";

const gridSize = 30;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  aggeregate: AggregateNode,
  debug: DebugNode,
  filter: FilterNode,
  http: HttpNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setEdges: state.setEdges,
  isCustomEdge: state.isCustomEdge,
  isAnimated: state.isAnimated,
});

const edgeTypes = {
  custom: EdgeWithDelete,
  base: CustomBaseEdge,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const edgeReconnectSuccessful = useRef(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setEdges,
    isCustomEdge,
    isAnimated,
  } = useStore(selector);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => {
        const reconnected = reconnectEdge(oldEdge, newConnection, els);
        return reconnected.map((edge) => ({
          ...edge,
          type: isCustomEdge ? "custom" : "base",
          deletable: isCustomEdge,
        }));
      });
    },
    [setEdges, isCustomEdge],
  );

  const onReconnectEnd = useCallback(
    (event, edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
      edgeReconnectSuccessful.current = true;
    },
    [setEdges],
  );

  return (
    <Card ref={reactFlowWrapper} className="absolute inset-0 rounded-none -m-1 border-none">
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: isCustomEdge ? "custom" : "base",
          deletable: isCustomEdge,
          style: {
            strokeWidth: 2,
            stroke: "#b1b1b7",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 12,
            height: 12,
            color: "#b1b1b7",
          },
          animated: isAnimated,
        }}
        minZoom={0.2}
        maxZoom={4}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        className="h-full"
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Card>
  );
};
