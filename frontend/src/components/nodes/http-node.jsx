import { useState } from "react";
import { Position } from "@xyflow/react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { NodeWrapper } from "./node-wrapper";
import { Globe } from "lucide-react";

export const HttpNode = ({ id }) => {
  const [method, setMethod] = useState("GET");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
      label: "Request",
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      label: "Response",
    },
  ];

  return (
    <NodeWrapper id={id} title="HTTP Node" handles={handles} icon={Globe}>
      <div className="space-y-3">
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger className="border-[#38393a] bg-[#3E3F29] focus:ring-2 focus:ring-[#706d51]">
            <SelectValue placeholder="HTTP Method" />
          </SelectTrigger>
          <SelectContent>
            {["GET", "POST", "PUT", "DELETE"].map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="Enter URL..." className="border-[#38393a] bg-[#3E3F29] focus:ring-2 focus:ring-[#706d51]" />
      </div>
    </NodeWrapper>
  );
};
