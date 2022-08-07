import { useFormik } from "formik";

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Обовязкове поле !';
    } else if (values.name.length < 2) {
        errors.name = 'Мінімум 2 стимвола для заповнення'
    }

    if (!values.email) {
        errors.name = 'Обовязкове поле !';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Не вірна адреса';
    }

    return errors;
}

const FormikForm = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
        },
        validate,
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Донати на ЗСУ</h2>
            <label htmlFor="name">Ваше ім'я</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="amount">Кількість</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    <option value="">Виберіть валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
            </select>
            <label htmlFor="text">Ваше повідомлення</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                Погоджуєтесь з політикою конфіденційності?
            </label>
            <button type="submit">Відправити</button>
        </form>
    )
}

export default FormikForm;

// import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
// import * as Yup from 'yup';

// const MyTextInput = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//     <>
//         <label htmlFor={props.name}>{label}</label>
//         <input {...field} {...props} />
//         {meta.touched && meta.error ? (
//             <div className="error">{meta.error}</div>
//         ) : null}
//     </>
//     );
// };

// const MyCheckbox = ({ children, ...props }) => {
//     const [field, meta] = useField({ ...props, type: 'checkbox' });
//     return (
//     <>
//         <label className="checkbox">
//             <input type="checkbox" {...field} {...props} />
//             {children}
//         </label>
//         {meta.touched && meta.error ? (
//             <div className="error">{meta.error}</div>
//         ) : null}
//     </>
//     );
// };

// const CustomForm = () => {

//     return (
//         <Formik
//         initialValues = {{
//             name: '',
//             email: '',
//             amount: 0,
//             currency: '',
//             text: '',
//             terms: false
//         }}
//         validationSchema = {Yup.object({
//             name: Yup.string()
//                     .min(2, 'Минимум 2 символа для заполнения')
//                     .required('Обязательное поле!'),
//             email: Yup.string()
//                     .email('Неправильный email адрес')
//                     .required('Обязательное поле!'),
//             amount: Yup.number()
//                     .required('Сумма обязательна')
//                     .min(5, 'Не менее 5'),
//             currency: Yup.string().required('Выберите валюту'),
//             text: Yup.string()
//                     .min(10, 'Не менее 10 символов'),
//             terms: Yup.boolean()
//                     .required('Необходимо согласие')
//                     .oneOf([true], "Необходимо согласие")
//         })}
//         onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
//         >
//             <Form className="form">
//                 <h2>Отправить пожертвование</h2>
//                 <MyTextInput
//                     label="Ваше имя"
//                     id="name"
//                     name="name"
//                     type="text"
//                     autoComplete="off"
//                 />
//                 <MyTextInput
//                     label="Ваша почта"
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="off"
//                 />
//                 <label htmlFor="amount">Количество</label>
//                 <Field
//                     id="amount"
//                     name="amount"
//                     type="number"
//                     autoComplete="off"
//                 />
//                 <ErrorMessage component="div" className="error" name="amount"/>
//                 <label htmlFor="currency">Валюта</label>
//                 <Field
//                     id="currency"
//                     name="currency"
//                     as="select"
//                     >
//                         <option value="">Выберите валюту</option>
//                         <option value="USD">USD</option>
//                         <option value="UAH">UAH</option>
//                         <option value="RUB">RUB</option>
//                 </Field>
//                 <ErrorMessage component="div" className="error" name="currency"/>
//                 <label htmlFor="text">Ваше сообщение</label>
//                 <Field 
//                     id="text"
//                     name="text"
//                     as="textarea"
//                 />
//                 <ErrorMessage component="div" className="error" name="text"/>
//                 <MyCheckbox name="terms">
//                     Соглашаетесь с политикой конфиденциальности?
//                 </MyCheckbox>
//                 <button type="submit">Отправить</button>
//             </Form>
//         </Formik>
//     )
// }

// export default CustomForm;