import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const DraggableNode = ({ type, label, icon: Icon, className }) => {
  const onDragStart = (event, nodeType) => {
    event.stopPropagation();
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType })
    );
    event.dataTransfer.effectAllowed = "move";

    // Add dragging cursor to body to maintain during drag
    document.body.style.cursor = "grabbing";
  };

  const onDragEnd = () => {
    document.body.style.cursor = "default";
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={onDragEnd}
      className="cursor-grab active:cursor-grabbing"
    >
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <Button
              variant="secondary"
              className={cn(
                "flex flex-col items-center bg-[#FCF259] h-16 w-16 justify-center gap-1 aspect-square p-2 pointer-events-none rounded-xl",
                className
              )}
            >
              <Icon className="h-6 w-6" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
