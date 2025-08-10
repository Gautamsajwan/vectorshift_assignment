from typing import List, Optional, Any
from pydantic import BaseModel

class Position(BaseModel):
    x: float = 0
    y: float = 0

class Style(BaseModel):
    strokeWidth: Optional[int] = None
    stroke: Optional[str] = None
    class Config:
        extra = "allow"

class MarkerEnd(BaseModel):
    type: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None
    color: Optional[str] = None
    class Config:
        extra = "allow"

class NodeData(BaseModel):
    id: Optional[str] = None
    nodeType: Optional[str] = None
    class Config:
        extra = "allow"

class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Position = Position()
    data: NodeData = NodeData()
    width: Optional[int] = None
    height: Optional[int] = None
    selected: Optional[bool] = False
    dragging: Optional[bool] = False
    class Config:
        extra = "allow"

class Edge(BaseModel):
    id: str
    type: Optional[str] = None
    deletable: Optional[bool] = None
    style: Optional[Style] = None
    markerEnd: Optional[MarkerEnd] = None
    animated: Optional[bool] = False
    source: str
    sourceHandle: Optional[str] = None
    target: str
    targetHandle: Optional[str] = None
    class Config:
        extra = "allow"

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    is_pipeline: bool
    dag_validation_messages: List[str]
    pipeline_validation_messages: List[str]