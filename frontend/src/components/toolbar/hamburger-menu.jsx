"use client";

import { useStore } from "../store";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { SubmitButton } from "../submit";
import { DraggableNode } from "../draggable-node";
import { nodes } from "./nodes-nav";

export const HamburgerMenu = () => {
  const { isCustomEdge, isAnimated, toggleEdgeType, toggleAnimation } =
    useStore(
      (state) => ({
        isCustomEdge: state.isCustomEdge,
        isAnimated: state.isAnimated,
        toggleEdgeType: state.toggleEdgeType,
        toggleAnimation: state.toggleAnimation,
        toggleMenu: state.toggleMenu,
      })
    );

  return (
    <div className="-mt-1 absolute top-0 right-0 bottom-0 w-56 md:w-64 lg:hidden bg-[#222831] z-10">
      <div className="p-4 text-white md:px-5 flex flex-col h-full">
        <div className="mb-4 md:mb-6 flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">Pipeline</h3>
            <p className="text-xs md:text-sm text-muted">
              Customize your pipeline here.
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto p-1">
          {nodes.map((node) => (
            <DraggableNode
              key={node.type}
              className="!w-full !h-full !min-w-[60px] md:!min-w-[80px]"
              type={node.type}
              label={node.label}
              icon={node.icon}
            />
          ))}
        </div>

        <div className="space-y-4 md:space-y-6 pt-4 md:pt-8">
          <div className="flex items-center justify-between">
            <Label htmlFor="edge-type-mobile" className="text-xs md:text-base">
              Deletable Edges
            </Label>
            <Switch
              size={"sm"}
              id="edge-type-mobile"
              checked={isCustomEdge}
              onCheckedChange={toggleEdgeType}
              className="data-[state=checked]:bg-[#8b5dff] data-[state=unchecked]:bg-[#6b717a]"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="edge-animation-mobile"
              className="text-xs md:text-base"
            >
              Animated Edges
            </Label>
            <Switch
              size={"sm"}
              id="edge-animation-mobile"
              checked={isAnimated}
              onCheckedChange={toggleAnimation}
              className="data-[state=checked]:bg-[#8b5dff] data-[state=unchecked]:bg-[#6b717a]"
            />
          </div>

          <SubmitButton className="w-full h-12 md:h-16 mt-2 md:mt-4" />
        </div>
      </div>
    </div>
  );
};
