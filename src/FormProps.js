import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className="checkbox">
            <input type="checkbox" {...field} {...props} />
            {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

const PropsForm = () => {

    return (
        <Formik
        initialValues = {{
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        }}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .min(3, 'Мінімум 3 символа для заповнення')
                    .required("Обов'язкове поле"),
            email: Yup.string() 
                    .email('Невірна адреса')
                    .required("Обов'язкове поле"),
            amount: Yup.number() 
                    .required("Обов'язкове поле")
                    .min(5, 'Не менше 5'),
            currency: Yup.string()
                    .required('Виберіть валюту'), 
            text: Yup.string()
                    .min(10, 'Не менше 10 символів'),
            terms: Yup.boolean()
                    .required("Необхідна згода")
                    .oneOf([true], 'Необхідно вибір'),
        })}
        onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Донати на ЗСУ</h2>
                <MyTextInput
                    label="Ваше ім'я"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                />
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                />
                <label htmlFor="amount">Кількість</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                    autoComplete="off"
                />
                <ErrorMessage component="div" className="error" name="amount"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Виберіть валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                </Field>
                <ErrorMessage component="div" className="error" name="currency"/>
                <label htmlFor="text">Ваше повідомлення</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage component="div" className="error" name="text"/>
                <MyCheckbox name="terms">
                    Погоджуєтесь з політикою конфіденційності ?
                </MyCheckbox>
                <button type="submit">Відправити</button>
            </Form>
        </Formik>
    )
}

export default PropsForm;
