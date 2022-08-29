import PulsatingNote, {
  TextColorsEnum,
} from '../../utils/loading/pulsatingNote'

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center">
      <PulsatingNote textColor={TextColorsEnum.gray} />
    </div>
  )
}

export default LoadingScreen
