interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <p className="text-sm text-red-600 mt-1">{message}</p>
  );
}