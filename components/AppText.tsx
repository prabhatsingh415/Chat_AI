import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  className?: string;
}

export default function AppText({ className = "", ...props }: AppTextProps) {
  return <Text className={`font-inter ${className}`} {...props} />;
}
