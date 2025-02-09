import {
  FormProvider,
  UseFormReturn,
  SubmitHandler,
  FieldValues
} from 'react-hook-form';
import styled from 'styled-components';

interface ComponentProps<T extends FieldValues> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit?: SubmitHandler<T>;
  onError?: (errors: any) => void;
  hasDefaultMargin?: boolean;
}

function Component<T extends FieldValues>({
  children,
  form,
  onSubmit,
  onError,
  hasDefaultMargin = true
}: ComponentProps<T>) {
  return (
    <FormProvider {...form}>
      <Form
        onSubmit={form.handleSubmit(
          onSubmit ?? (() => {}), // onSubmit이 없으면 빈 함수 사용
          onError ?? (() => {}) // onError가 없으면 빈 함수 사용
        )}
        $hasDefaultMargin={hasDefaultMargin ?? false} // hasDefaultMargin이 없으면 기본값 false
      >
        {children}
      </Form>
    </FormProvider>
  );
}

const Form = styled.form<{
  $hasDefaultMargin: boolean;
  maxWidth?: string | number;
}>`
  ${({ $hasDefaultMargin }) => {
    if ($hasDefaultMargin) {
      return `
        & > * {
          margin-bottom: 24px;

          &:last-child {
            margin-bottom: 0;
          }
        }`;
    }
  }}

  max-width: ${({ maxWidth }) =>
    maxWidth
      ? typeof maxWidth === 'string'
        ? maxWidth
        : `${maxWidth}px`
      : '100%'};
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ButtonItem = styled.div`
  ${({ theme }) => theme.responsive('sm')} {
    margin: 0 16px;
  }
`;

export default Component;
