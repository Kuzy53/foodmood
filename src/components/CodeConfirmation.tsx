import React, { useState, useEffect, useRef } from 'react';
import s from './CodeConfirmation.module.scss';

interface CodeConfirmationProps {
  displayText: string;
  didntGetText: string;
  codeLength?: number;
  confirmButtonText: string;      
  resendButtonText: string;      
  onConfirm: (code: string) => void;
  onResend: () => void;
  isConfirmLoading?: boolean;     
  errorMessage?: string;          
  isResendTimerActive?: boolean;  
  initialResendTime?: number;     
}

const CodeConfirmation: React.FC<CodeConfirmationProps> = ({
  displayText,
  didntGetText,
  codeLength = 4,
  confirmButtonText,
  resendButtonText,
  onConfirm,
  onResend,
  isConfirmLoading = false,
  errorMessage,
  isResendTimerActive = false,
  initialResendTime = 59,
}) => {
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(initialResendTime);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (isResendTimerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isResendTimerActive, timeLeft]);

  const fullCode = code.join('');

  const handleInputChange = (index: number, value: string) => {
    if (/^[0-9a-zA-Z]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value.toUpperCase();
      setCode(newCode);
      if (value && index < codeLength - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      !code[index] &&
      index > 0
    ) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isConfirmDisabled = (fullCode.length < codeLength) || isConfirmLoading;
  const isResendDisabled = isResendTimerActive && timeLeft > 0;

  const handleConfirmClick = () => {
    onConfirm(fullCode);
  };

  const handleResendClick = () => {
    onResend();
    setTimeLeft(initialResendTime);
  };

  return (
    <div className={s.confirmationContainer}>
      <p className={s.confirmationText}>{displayText}</p>

      <div className={s.codeInputWrapper}>
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            className={s.codeInput}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>

      <div className={s.didntGetWrapper}>
        <span className={s.didntGet}>{didntGetText}</span>
      </div>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
      )}

      <button
        className={s.mainButton}
        onClick={handleConfirmClick}
        disabled={isConfirmDisabled}
      >
        {isConfirmLoading ? 'Loading...' : confirmButtonText}
      </button>

      <button
        className={s.secondButton}
        onClick={handleResendClick}
        disabled={isResendDisabled}
      >
        {isResendTimerActive && timeLeft > 0
          ? `Send via ${timeLeft}s`
          : resendButtonText}
      </button>
    </div>
  );
};

export default CodeConfirmation;
