import { Text, TouchableOpacity } from 'react-native';


type PrimaryButtonProps = {
    title:string;
    onPress: () => void;
}
const PrimaryButton = ({ title, onPress }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}
    className='w-full py-4 bg-primary rounded-full items-center justify-center'
    >
            <Text className='text-base font-semibold text-white'>{title}</Text>
    </TouchableOpacity>
    
  )
}

export default PrimaryButton
