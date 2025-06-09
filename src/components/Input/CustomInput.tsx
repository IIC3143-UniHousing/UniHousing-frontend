import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
    return (
        <div className='flex flex-col gap-1'>
            {label && <label className='block text-sm font-medium text-gray-600 mb-1'>{label}</label>}
            <input
            {...props}
            className='
                w-full
                px-4
                py-2
                border
                border-gray-300
                rounded-md
                text-gray-900
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-[#3B82F6]
                focus:border-transparent'
            />
        </div>
    )
}

export default CustomInput;