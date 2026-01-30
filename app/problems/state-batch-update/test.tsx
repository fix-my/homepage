import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('카운터 배치 업데이트', () => {
  it('+3 증가 버튼을 클릭하면 카운터가 3씩 증가한다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    const incrementButton = screen.getByRole('button', { name: /\+3 증가/i });

    // Act - first click
    await user.click(incrementButton);

    // Assert
    expect(await screen.findByText('3')).toBeInTheDocument();

    // Act - second click
    await user.click(incrementButton);

    // Assert
    expect(await screen.findByText('6')).toBeInTheDocument();
  });
});
