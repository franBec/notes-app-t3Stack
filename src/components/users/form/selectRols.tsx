import { trpc } from '../../../utils/trpc'
import ErrorComponent from '../../utils/errors/errorComponent'

import Multiselect from 'multiselect-react-dropdown'
import { Rol } from '@prisma/client'
import { useState } from 'react'

const SelectRols = () => {
  //select stuff
  interface selectOptionsInterface {
    id: number
    name: string
  }
  const options: selectOptionsInterface[] = []
  const [optionsSelected, setOptionsSelected] = useState<Rol[]>()

  const handleSelectOption = (selected: Rol[]) => {
    setOptionsSelected(selected)
  }

  //fetch rols
  const { isLoading, isError, error, data } = trpc.useQuery(['rol.all'])

  //render
  if (isLoading) {
    return <p>Loading rols...</p>
  }

  if (isError) {
    return <ErrorComponent message={error.message} />
  }

  if (data) {
    data.map((it) => options.push({ id: it.id, name: it.name }))
    return (
      <Multiselect
        options={data}
        displayValue="name"
        showArrow={true}
        onSelect={handleSelectOption}
        onRemove={handleSelectOption}
        placeholder="Select rol/s (not required)"
      />
    )
  }

  return <ErrorComponent message="Component didn't know what to render" />
}

export default SelectRols
