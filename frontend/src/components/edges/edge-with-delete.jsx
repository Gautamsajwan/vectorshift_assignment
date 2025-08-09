import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";
import { XCircle } from "lucide-react";
import { useStore } from "../store";

const EdgeWithDelete = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style = {},
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 8,
    offset: 8,
  });

  const { setEdges } = useStore((state) => ({
    setEdges: state.setEdges,
  }));

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <div
            className="backdrop-blur-sm rounded-full p-[5px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setEdges((eds) => eds.filter((e) => e.id !== id));
            }}
          >
            <XCircle className="h-8 w-8 text-white hover:text-yellow-300" />
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default EdgeWithDelete;
