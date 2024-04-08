import { withChildren } from '@/lib/types';
import { CheckCircledIcon } from '@radix-ui/react-icons';

type FormSuccessProps = withChildren;

export const FormSuccess = ({ children }: FormSuccessProps) => {
  if (!children) return null;
  return (
    <div className="flex items-center gap-x-2 text-sm text-emerald-500 bg-emerald-500/15 p-3 rounded-md">
      <CheckCircledIcon className="w-4 h-4 mr-1" />
      <p>
        {children}
      </p>
    </div>
  );
}
