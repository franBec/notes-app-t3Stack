import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const homeCard = ({
  icon,
  title,
  link,
}: {
  icon: IconProp
  title: string
  link: string
}) => {
  return (
    <button className="border-2 border-black rounded-lg shadow-lg transition duration-150 ease-in-out hover:scale-105">
      <Link href={link}>
        <a>
          <div className="flex items-center justify-center p-4">
            <FontAwesomeIcon icon={icon} className="fa-solid fa-5x" />
          </div>
          <div className="px-6 py-4">
            <h4 className="mb-2 text-xl font-semibold tracking-tight">
              {title}
            </h4>
          </div>
        </a>
      </Link>
    </button>
  )
}

export default homeCard
