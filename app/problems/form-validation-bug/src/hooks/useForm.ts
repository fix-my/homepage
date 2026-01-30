import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export function useForm(initialValues: FormValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const validate = () => {
    const newErrors: Partial<FormValues> = {};

    if (!values.email.includes("@")) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }
    if (values.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =
    (onSubmit: (values: FormValues) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        onSubmit(values);
      }
    };

  return { values, errors, handleChange, handleSubmit };
}
