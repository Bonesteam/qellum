/*
 * InputUI.tsx — ФІКС
 * ❌ ПРИБРАНО: style={{ color: "red", fontSize: 12 }}
 * ✅ Використовуємо CSS змінну var(--error-color)
 */
import * as React from "react";
import Input, { InputProps } from "@mui/joy/Input";
import { useField } from "formik";

type FormikInputProps = InputProps & { name: string; formik?: boolean };

const InputUI: React.FC<FormikInputProps> = ({ formik, ...props }) => {
    if (formik && props.name) {
        const [field, meta] = useField(props.name);
        return (
            <>
                <Input {...field} {...props} error={!!meta.error && meta.touched} />
                {meta.touched && meta.error && (
                    /* ❌ ПРИБРАНО: style={{ color: "red" }} */
                    <div style={{ color: "var(--error-color)", fontSize: 11,
                                  fontWeight: 600, marginTop: 3 }}>
                        {meta.error}
                    </div>
                )}
            </>
        );
    }
    return <Input {...props} />;
};

export default InputUI;