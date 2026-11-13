import {
    Image,
    ImageSourcePropType,
    Text,
    TouchableOpacity,
} from "react-native";

type SocialButtonProps = {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

const SocialButton = ({ title, image, onPress }: SocialButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-center w-full px-4 py-4 border border-gray-100 rounded-full"
    >
      <Image source={image} className="w-6 h-6" resizeMode="contain" />
      <Text className="text-base font-semibold mx-2">Sign In with {title}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;