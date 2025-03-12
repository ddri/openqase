import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface UseFormOptions<T> {
  initialValues: T
  onSubmit: (values: T) => Promise<void>
  successMessage?: string
  errorMessage?: string
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  successMessage = 'Operation successful',
  errorMessage = 'Operation failed'
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(values)
      
      toast({
        title: 'Success',
        description: successMessage,
        duration: 3000,
      })

      // Reset form
      setValues(initialValues)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
  }

  return {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setValues,
  }
} 