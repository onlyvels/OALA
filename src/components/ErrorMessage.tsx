interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
      <div className="flex">
        <div className="flex-1">
          <p className="text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
}