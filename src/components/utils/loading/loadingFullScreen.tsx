import PulsatingNote, {
  TextColorsEnum,
} from '../../utils/loading/pulsatingNote'

const LoadingFullScreen = () => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          <div className="border-0 rounded-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
            <PulsatingNote textColor={TextColorsEnum.white} />
          </div>
        </div>
      </div>

      <div className="opacity-70 fixed inset-0 z-30 bg-black"></div>
    </>
  )
}

export default LoadingFullScreen
