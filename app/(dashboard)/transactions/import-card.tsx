type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: string[]) => void;
}

export const ImportCard = ({
  data,
  onCancel,
  onSubmit
}: Props) => {
  return (
    <div>
      Import Card
    </div>
  )
}