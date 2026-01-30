interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  error,
  onChange
}: FormInputProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500'
        }}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      {error && (
        <p
          style={{
            color: '#ef4444',
            fontSize: '12px',
            marginTop: '4px'
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
