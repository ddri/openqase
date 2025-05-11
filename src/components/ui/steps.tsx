import * as React from "react"

interface StepProps {
  number: number
  title: string
  children: React.ReactNode
}

const Step = ({
  number,
  title,
  children
}: StepProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3">
        <span className="text-[hsl(var(--primary))] font-medium text-lg">
          Step {number}.
        </span>
        <h3 className="text-[var(--text-primary)] font-semibold text-lg border-b border-[var(--border)] pb-1">
          {title}
        </h3>
      </div>
      <div className="mt-4 text-[var(--text-secondary)] leading-7">
        {children}
      </div>
    </div>
  )
}

interface StepsProps {
  children: React.ReactNode
}

export const Steps = ({
  children
}: StepsProps) => {
  // Clone children to automatically number the steps
  const steps = React.Children.map(children, (child, index) => {
    if (React.isValidElement<StepProps>(child)) {
      return React.cloneElement(child, {
        number: index + 1,
        title: child.props.title,
        children: child.props.children
      })
    }
    return child
  })

  return (
    <div className="my-8">
      {steps}
    </div>
  )
}

export { Step } 