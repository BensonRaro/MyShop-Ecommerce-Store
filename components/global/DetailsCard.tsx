import { cn } from "@/lib/utils";

const DetailsCard = ({
  use,
  item,
  index,
  selectedValue,
  select,
}: {
  use: "size" | "color";
  item: string;
  index: number;
  selectedValue?: string;
  select?: (
    filter: "size" | "color" | "category",
    value: string,
    selected: string
  ) => void;
}) => {
  return (
    <li
      className={cn(
        selectedValue === item &&
          use === "color" &&
          "border border-primary p-0.5",
        use === "color" ? "rounded-full" : "rounded-lg"
      )}
      onClick={() => select && select(use, item, selectedValue || "")}
    >
      <div
        className={cn(
          "p-2 border rounded-lg w-fit h-12 text-center cursor-pointer",
          use === "color" && "w-12 rounded-full",
          selectedValue === item && use === "size" && "border-primary"
        )}
        style={{ backgroundColor: item }}
      >
        <span className={use === "color" ? "hidden" : "block"}>{item}</span>
      </div>
    </li>
  );
};

export default DetailsCard;
