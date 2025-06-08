import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaSearch, FaBook, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import style from './BookSearchForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const BookSearchForm = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  const validationSchema = Yup.object({
    searchTerm: Yup.string()
      .min(2, 'Please enter at least 2 characters')
      .required('Search term is required'),
    category: Yup.string(),
    author: Yup.string(),
    year: Yup.number()
      .min(1800, 'Please enter a valid year')
      .max(new Date().getFullYear(), 'Please enter a valid year')
  });

  const initialValues = {
    searchTerm: '',
    category: '',
    author: '',
    year: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = {
      ...values,
      year: selectedYear ? selectedYear.getFullYear() : values.year
    };
    console.log('Searching for:', formData);
    // Here search API will be called
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className={style.form}>
              <div className={style.formHeader}>
                <div className={style.headerLeft}>
                  <FaBook className={style.headerIcon} />
                  <h2 className={style.formTitle}>Find Your Next Book</h2>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={style.submitButton}
                >
                  <FaSearch />
                  {isSubmitting ? 'Searching...' : 'Search Books'}
                </button>
              </div>

              {/* Main Search Field */}
              <div className={style.mainSearchGroup}>
                <div className={style.inputWrapper}>
                  <FaSearch className={style.inputIcon} />
                  <Field
                    type="text"
                    name="searchTerm"
                    placeholder="Book title, author, ISBN..."
                    className={style.mainInput}
                  />
                </div>
                <ErrorMessage name="searchTerm" component="div" className={style.errorMessage} />
              </div>

              {/* Advanced Filters */}
              <div className={style.filtersSection}>
                <div className={style.filtersGrid}>
                  <div className={style.inputGroup}>
                    <Field
                      as="select"
                      name="category"
                      className={style.selectInput}
                    >
                      <option value="">All Categories</option>
                      <option value="fiction">Fiction</option>
                      <option value="non-fiction">Non-Fiction</option>
                      <option value="science-fiction">Science Fiction</option>
                      <option value="history">History</option>
                      <option value="philosophy">Philosophy</option>
                      <option value="science">Science</option>
                      <option value="art">Art</option>
                    </Field>
                  </div>

                  <div className={style.inputGroup}>
                    <Field
                      type="text"
                      name="author"
                      placeholder="Author name"
                      className={style.textInput}
                    />
                  </div>

                  <div className={style.inputGroup}>
                    <div className={style.yearPickerWrapper}>
                      <FaCalendarAlt className={style.calendarIcon} />
                      <DatePicker
                        selected={selectedYear}
                        onChange={(date) => {
                          setSelectedYear(date);
                          setFieldValue('year', date ? date.getFullYear() : '');
                        }}
                        showYearPicker
                        dateFormat="yyyy"
                        yearItemNumber={9}
                        placeholderText="Publication year"
                        className={style.yearPicker}
                        minDate={new Date('1800-01-01')}
                        maxDate={new Date()}
                      />
                    </div>
                    <ErrorMessage name="year" component="div" className={style.errorMessage} />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookSearchForm; 