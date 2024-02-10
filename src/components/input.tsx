import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

export default function Input({ ...rest }: TextInputProps) {
    return <TextInput
        multiline
        textAlignVertical="top"
        placeholderTextColor={colors.slate[400]}
        className="mt-2 h-24 bg-slate-700 rounded-md px-4 py-3 font-body text-white text-sm"
        {...rest} />
}
