import css from "./ContactForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";
import { selectContacts } from "../../redux/contactsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const initialValues = {
    name: "",
    number: "",
  };

//   const handleSubmit = (values, { resetForm }) => {
//     dispatch(
//         selectContacts({
//           id: Date.now().toString(),
//           name: values.name,
//           number: values.number,
//         })
//       );
//     resetForm();
//   };

const handleSubmit = (values, { resetForm }) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${values.name} is already in contacts`);
    } else {
      dispatch(addContact({ name: values.name, number: values.number }));
      resetForm();
    }
  };

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.formContainer}>
        <div className={css.inputWrap}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field className={css.input} id={nameFieldId} type="text" name="name" autoComplete="name" />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css.inputWrap}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field className={css.input} id={numberFieldId} type="text" name="number" autoComplete="name" />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>
        <button className={css.button} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}