"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number
  children: React.ReactNode
}

export function Steps({ currentStep, children, className, ...props }: StepsProps) {
  const steps = React.Children.toArray(children)

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={cn("flex-1 h-1 mx-2", index < currentStep ? "bg-primary" : "bg-muted")} />}
          {step}
        </React.Fragment>
      ))}
    </div>
  )
}

interface StepProps {
  title: string
  description?: string
}

export function Step({ title, description }: StepProps) {
  const stepContext = React.useContext(StepContext)
  const { currentStep, stepIndex } = stepContext || { currentStep: 1, stepIndex: 0 }

  const isActive = stepIndex + 1 === currentStep
  const isCompleted = stepIndex + 1 < currentStep

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
          isCompleted
            ? "bg-primary text-primary-foreground"
            : isActive
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
        )}
      >
        {isCompleted ? "✓" : stepIndex + 1}
      </div>
      <div className="mt-2 text-center">
        <div
          className={cn("text-sm font-medium", isActive || isCompleted ? "text-foreground" : "text-muted-foreground")}
        >
          {title}
        </div>
        {description && <div className="text-xs text-muted-foreground mt-1">{description}</div>}
      </div>
    </div>
  )
}

interface StepContextValue {
  currentStep: number
  stepIndex: number
}

const StepContext = React.createContext<StepContextValue | null>(null)

export function StepProvider({ children, currentStep, stepIndex }: StepContextValue & { children: React.ReactNode }) {
  return <StepContext.Provider value={{ currentStep, stepIndex }}>{children}</StepContext.Provider>
}
