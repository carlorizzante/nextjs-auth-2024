import { withChildren } from '@/lib/types';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

type FormErrorProps = withChildren;

export const FormError = ({ children }: FormErrorProps) => {
  if (!children) return null;
  return (
    <div className="flex items-center gap-x-2 text-sm text-destructive bg-destructive/15 p-3 rounded-md">
      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
      <p>
        {children}
      </p>
    </div>
  );
}
