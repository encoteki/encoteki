export default function DefaultButton({
  wording,
  isPrimary,
  action,
  className,
}: {
  wording: string
  isPrimary: boolean
  action?: () => void
  className?: string
}) {
  return (
    <button
      onClick={action}
      className={`${className} rounded-[32px] border ${isPrimary ? 'border-primary-green bg-primary-green hover:bg-green-10' : 'border-primary-green bg-white hover:bg-green-90'} duration-300`}
    >
      <span
        className={`text-base font-medium ${isPrimary ? 'text-white' : 'text-primary-green'}`}
      >
        {wording}
      </span>
    </button>
  )
}
