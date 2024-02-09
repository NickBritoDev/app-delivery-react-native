import { Pressable, Text, PressableProps } from "react-native";
import { clsx } from "clsx";

type CategoryButton = PressableProps & {
  title: string;
  isSelected?: boolean;
}


export function CategoryButton({ title, isSelected, ...rest }: CategoryButton) {
  return (
    <Pressable {...rest} className={clsx("bg-slate-800 px-4 justify-center rounded-md h-10", 
    isSelected && "border-2 border-lime-300"
    )}>
      <Text className=" font-subtitle text-sm text-slate-100">{title}</Text>
    </Pressable>
  )
}
