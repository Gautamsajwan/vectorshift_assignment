import { Position } from "@xyflow/react";
import { NodeWrapper } from "./node-wrapper";
import { Textarea } from "../ui/textarea";
import { Wand2 } from "lucide-react";

export const TransformNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
      label: "Input",
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      label: "Transformed",
    },
  ];

  return (
    <NodeWrapper id={id} title="Transform Node" handles={handles} icon={Wand2}>
      <Textarea
        placeholder="Enter transformation logic..."
        className="h-20 border-[#38393a] bg-[#3E3F29] focus-visible:ring-2 focus-visible:ring-[#706d51]"
      />
    </NodeWrapper>
  );
};
