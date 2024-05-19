import { WithClassName } from '@/lib/types';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { CardWrapper } from './card-wrapper';

type CardWrapperProps = WithClassName;

export const ErrorCard = ({ className }: CardWrapperProps) => (
  <CardWrapper
    headerLabel="Error"
    backButtonLabel="Back to login"
    backButtonHref="/auth/login"
  >
    <div className="flex justify-center items-center w-full">
      <ExclamationTriangleIcon className="w-12 h-12 text-destructive" />
    </div>
  </CardWrapper>
);
