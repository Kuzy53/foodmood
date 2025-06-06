import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import './style.css'; 

interface IMobilePhoneProps {
  value: string;
  onChange: (value: string) => void;
  touched?: boolean;    
  error?: string;      
}

const MobilePhone: React.FC<IMobilePhoneProps> = (props) => {
  const { value, onChange, touched, error } = props;

  return (
    <div className="tel_container">
      <PhoneInput
        specialLabel=""
        country="th"
        value={value}
        onChange={onChange}
        containerStyle={{
          border: touched && error ? '1px solid red' : '1px solid #818181',
          borderRadius: '12px'

        }}
        
        inputStyle={{
          width: '100%',
        }}
      />
      {touched && error && (
        <p style={{ color: 'red', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default MobilePhone;
