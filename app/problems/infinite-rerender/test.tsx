import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App';

describe('무한 렌더링 문제', () => {
  it('사용자 정보가 정상적으로 표시된다', async () => {
    // Arrange & Act
    render(<App />);

    // Assert - page title
    expect(screen.getByText(/대시보드/i)).toBeInTheDocument();

    // Assert - user data loads
    expect(await screen.findByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
  });
});
