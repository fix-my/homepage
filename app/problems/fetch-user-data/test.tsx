import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App';

describe('사용자 데이터 Fetch', () => {
  it('사용자 목록이 올바르게 표시된다', async () => {
    // Arrange & Act
    render(<App />);

    // Assert - wait for data to load
    expect(await screen.findByText('김철수')).toBeInTheDocument();

    // Assert - all users visible
    expect(screen.getByText('chulsoo@example.com')).toBeInTheDocument();
    expect(screen.getByText('이영희')).toBeInTheDocument();
    expect(screen.getByText('박민수')).toBeInTheDocument();

    // Assert - no [object Promise] bug
    expect(screen.queryByText('[object Promise]')).not.toBeInTheDocument();
  });
});
