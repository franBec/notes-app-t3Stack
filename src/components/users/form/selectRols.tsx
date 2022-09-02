import { trpc } from '../../../utils/trpc'
import ErrorComponent from '../../utils/errors/errorComponent'
import ReactSelect from 'react-select'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

const SelectRols = ({
  field,
}: {
  field: ControllerRenderProps<FieldValues, 'rols'>
}) => {
  interface selectOptionsInterface {
    value: string
    label: string
  }

  const options: selectOptionsInterface[] = []
  const { isLoading, isError, error, data } = trpc.useQuery(['rol.all'])

  if (isLoading) {
    return <p>Loading rols...</p>
  }

  if (isError) {
    return <ErrorComponent message={error.message} />
  }

  if (data) {
    data.map((it) => options.push({ value: it.id.toString(), label: it.name }))
    return <ReactSelect isClearable {...field} options={options} />
  }

  return <ErrorComponent message="Component didn't know what to render" />
}

export default SelectRols
