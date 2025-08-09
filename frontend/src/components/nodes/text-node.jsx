import { useState, useEffect, useMemo } from "react";
import { FileText } from "lucide-react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { NodeWrapper } from "./node-wrapper";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { useNodeHandles } from "../../hooks/useNodeHandles";

const extractVariables = (text) => {
  const variableRegex = /{{(.*?)}}/g;
  return Array.from(text.matchAll(variableRegex))
    .map((match) => match[1].trim())
    .filter(Boolean);
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractVariables(text), [text]);
  const handles = useNodeHandles(id, variables);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables, updateNodeInternals]);

  return (
    <NodeWrapper id={id} title="Text Node" icon={FileText} handles={handles}>
      <AutosizeTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full text-white border-[#38393a] bg-[#3E3F29] focus:ring-2 focus:ring-[#706d51]"
        placeholder="Enter text with variables like {{variable}}"
      />
    </NodeWrapper>
  );
};
