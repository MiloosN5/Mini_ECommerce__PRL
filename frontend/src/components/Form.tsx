import Button from "./Button";
import FormField from "./FormField";

interface FieldsetData {
    id: string;
    fields: React.ReactNode[];
}

interface FormProps {
    modifier: string;
    fieldsets?: FieldsetData[];
    buttonName: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ modifier, fieldsets, buttonName, handleSubmit }: FormProps) => {
    return (
        <form onSubmit={handleSubmit} className={`form form--${modifier}`}>
            {fieldsets &&
                fieldsets.map(({ id, fields }) => (
                    <fieldset key={id} id={id}>
                        {fields.map((field, index) => (
                            <FormField key={index} modifier={modifier}>
                                {field}
                            </FormField>
                        ))}
                    </fieldset>
                ))}
            <Button orientation="col" mode="outlined">
                <span>{buttonName}</span>
            </Button>
        </form>
    );
};

export default Form;
