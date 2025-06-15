import React from 'react';

type FormInputProps = {
  label: React.ReactNode;
  /**
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  name: string;
  id?: string;
  error?: string;
  /**
   * @default false
   */
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'id' | 'placeholder' | 'value' | 'onChange'>;

const MyFormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  name,
  id,
  error,
  required = false,
  placeholder = ' ',
  value,
  onChange,
  className = '',
  ...rest
}) => {
  const inputId = id || name;
  const hasError = !!error;

  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={inputId}
        value={value}
        onChange={onChange}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray-900 dark:border-gray-600 focus:outline-none focus:ring-0 peer
          ${hasError 
            ? 'border-red-500 dark:border-red-500 focus:border-red-600 dark:focus:border-red-500' 
            : 'border-gray-300 focus:border-blue-600 dark:focus:border-blue-500'
          }
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
      
      <label 
        htmlFor={inputId} 
        className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6
          ${hasError 
            ? 'text-red-500 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500' 
            : 'text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'
          }
        `.trim().replace(/\s+/g, ' ')}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {hasError && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

type FormProps = {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
} & React.FormHTMLAttributes<HTMLFormElement>;

const MyForm: React.FC<FormProps> = ({
  children,
  onSubmit,
  title,
  className = '',
  ...rest
}) => {
  return (
    <div className="max-w-md mx-auto">
      {title && (
        <h2 className="text-2xl font-bold text-black dark:text-black mb-6 text-center">
          {title}
        </h2>
      )}
      <form 
        onSubmit={onSubmit}
        className={`space-y-4 ${className}`}
        {...rest}
      >
        {children}
      </form>
    </div>
  );
};

export { MyFormInput, MyForm };