interface FormFieldProps {
  modifier: string;
  children?: React.ReactNode;
}

const FormField = ({ modifier, children }: FormFieldProps) => {
  return (
    <div className={`form__field form--${modifier}__field`}>{children}</div>
  );
};

export default FormField;
