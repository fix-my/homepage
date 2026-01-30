import { useForm } from './hooks/useForm';
import { FormInput } from './components/FormInput';

export default function App() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onSubmit = (formValues: typeof values) => {
    alert('회원가입 성공! 🎉');
    console.log('제출된 값:', formValues);
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '700' }}>
        회원가입
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="이메일"
          name="email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />

        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />

        <FormInput
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          가입하기
        </button>
      </form>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#dcfce7',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0, fontWeight: '600', marginBottom: '8px' }}>
          ✅ 해결됨
        </p>
        <p style={{ margin: 0, color: '#78716c' }}>
          입력할 때마다 실시간으로 에러 메시지가 표시됩니다.
        </p>
      </div>
    </div>
  );
}
