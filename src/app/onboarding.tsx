import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Dimensions, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { onboardingData } from "../Data/onboardingData";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const router = useRouter();

  const handleDone = () => {
    router.replace("/AuthScreen");
  };

  return (
    <View style={{ flex: 1 }}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        pages={onboardingData.map((item) => ({
          backgroundColor: item.backgroundColor,
          title: item.title,
          subtitle: item.subtitle,
          image: (
            <View style={{ width: width * 0.7, height: width * 0.7 }}>
              <LottieView
                source={item.lottie}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          ),
        }))}
      />
    </View>
  );
};

export default OnboardingScreen;