import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RadioGroup = ({ label, name, options, formik, ...props }) => {
  // Access the current value, error, and touched state for this field from Formik
  const value = formik.values[name];
  const error = formik.errors[name];
  const touched = formik.touched[name];

  return (
    <div className="mb-4">
      {/* Label for the radio group */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-3">
        {/* Map through options to create individual picker items */}
        {options.map((option) => (
          <div
            key={option.value} // Unique key for each option
            className={`
              flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
              ${value === option.value ? 'border-blue-500 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 font-semibold' : 'border-gray-300 dark:border-gray-500 bg-white dark:bg-transparent text-gray-700 hover:border-blue-400'}
              transition-all duration-200 ease-in-out
            `}
            onClick={() => {
              // Update Formik field value when an option is clicked
              formik.setFieldValue(name, option.value);
              // Manually mark the field as touched to trigger validation immediately
              formik.setFieldTouched(name, true);
            }}
          >
            {/* Hidden radio input for accessibility and form semantics.
                The visual selection is handled by the parent div's styling. */}
            <input
              type="radio"
              id={`${name}-${option.value}`} // Unique ID for each radio input
              name={name}
              value={option.value}
              checked={value === option.value} // Controlled component: checked state based on Formik value
              onChange={formik.handleChange} // Allows Formik to track changes (though click handles value)
              onBlur={formik.handleBlur}     // Allows Formik to track blur events for validation
              className="hidden" // Hide the default browser radio button
              {...props}
            />
            {/* Label linked to the hidden radio input for accessibility */}
            <label htmlFor={`${name}-${option.value}`} className="cursor-pointer text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {/* Display validation error message using Formik's ErrorMessage component */}
      <ErrorMessage name={name}>
        {msg => <div className="text-red-500 text-xs italic mt-1">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default RadioGroup;

// Define color options for the custom picker
const colorOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'non-teachS', label: 'Non Teaching Staff' },
  { value: 'teachS', label: 'Teaching Staff' },
];
//
// // Component for the Color Picker Form
// const ColorPickerForm = () => {
//   return (
//     <Formik
//       initialValues={{
//         favoriteColor: '', // Initial value for the color picker
//       }}
//       validationSchema={Yup.object({
//         favoriteColor: Yup.string() // Validation rule for the color picker
//           .oneOf(
//             colorOptions.map(opt => opt.value), // Ensure selected value is one of the valid options
//             'Invalid Color'
//           )
//           .required('Please select a color'), // Make the field required
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           // Custom message box to display submitted values instead of alert()
//           const messageBox = document.createElement('div');
//           messageBox.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center';
//           messageBox.innerHTML = `
//             <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto text-center">
//               <h3 class="text-lg font-bold mb-4">Form Submitted!</h3>
//               <pre class="bg-gray-100 p-3 rounded text-left text-sm overflow-auto max-h-48">${JSON.stringify(values, null, 2)}</pre>
//               <button id="closeMessageBox" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Close
//               </button>
//             </div>
//           `;
//           document.body.appendChild(messageBox);
//
//           document.getElementById('closeMessageBox').onclick = () => {
//             document.body.removeChild(messageBox);
//           };
//
//           setSubmitting(false); // End submission process
//         }, 400);
//       }}
//     >
//       {/* Formik's render prop provides the formik object with state and helpers */}
//       {(formik) => (
//         <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Select Your Favorite Color</h2>
//
//           {/* Render the custom radio group picker */}
//           <MyRadioGroup
//             label="Favorite Color"
//             name="favoriteColor"
//             options={colorOptions}
//             formik={formik} // Pass the formik object to the custom component
//           />
//
//           {/* Submit Button */}
//           <div className="flex items-center justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//               disabled={formik.isSubmitting} // Disable button during submission
//             >
//               {formik.isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };
//
// // Main App Component to render the ColorPickerForm
// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
//       <ColorPickerForm />
//     </div>
//   );
// }
