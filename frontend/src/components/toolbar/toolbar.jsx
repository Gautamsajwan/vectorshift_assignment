"use client";

import { useStore } from "../store";
import { DraggableNode } from "../draggable-node";
import { SubmitButton } from "../submit";
import { nodes } from "./nodes-nav";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { HamburgerButton } from "./hamburger-button";

const selector = (state) => ({
  isCustomEdge: state.isCustomEdge,
  isAnimated: state.isAnimated,
  toggleEdgeType: state.toggleEdgeType,
  toggleAnimation: state.toggleAnimation,
});

export const PipelineToolbar = () => {
  const { isCustomEdge, isAnimated, toggleEdgeType, toggleAnimation } =
    useStore(selector);

  return (
    <Card className="bg-[#222831] rounded-none border-none py-5 px-4">
      <div className="flex items-center justify-between">
          <div className="flex-shrink-0 w-16 h-16 text-white flex justify-center items-center font-semibold bg-[#8B5DFF] text-4xl rounded-lg">
            <span>VS</span>
          </div>

          <div className="hidden lg:grid grid-flow-col auto-cols-[minmax(60px,1fr)] gap-4 items-center">
            {nodes.map((node) => (
              <DraggableNode
                key={node.type}
                className="w-full"
                type={node.type}
                label={node.label}
                icon={node.icon}
              />
            ))}
        </div>

        <div className="flex items-center gap-6">
          <HamburgerButton />
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-center space-y-2 w-16">
              <Switch
                id="edge-type"
                checked={isCustomEdge}
                onCheckedChange={toggleEdgeType}
                className="data-[state=checked]:bg-[#8b5dff] data-[state=unchecked]:bg-[#6b717a]"
              />
              <Label
                htmlFor="edge-type"
                className="text-xs text-gray-100 text-center w-full px-1"
              >
                Deletable Edges
              </Label>
            </div>
            <div className="flex flex-col items-center space-y-2 w-16">
              <Switch
                id="edge-animation"
                checked={isAnimated}
                onCheckedChange={toggleAnimation}
                className="data-[state=checked]:bg-[#8b5dff] data-[state=unchecked]:bg-[#6b717a]"
              />
              <Label
                htmlFor="edge-animation"
                className="text-xs text-gray-100 text-center w-full px-1"
              >
                Animated Edges
              </Label>
            </div>
            <SubmitButton className="w-full aspect-square" />
          </div>
        </div>
      </div>
    </Card>
  );
};
