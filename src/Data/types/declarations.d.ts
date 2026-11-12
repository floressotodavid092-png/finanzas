declare module "react-native-onboarding-swiper" {
  import { ComponentType, ReactElement } from "react";

  interface Page {
    backgroundColor: string;
    image: ReactElement;
    title: string | ReactElement;
    subtitle: string | ReactElement;
  }

  interface OnboardingProps {
    pages: Page[];
    onDone?: () => void;
    onSkip?: () => void;
    [key: string]: any;
  }

  const Onboarding: ComponentType<OnboardingProps>;
  export default Onboarding;
}