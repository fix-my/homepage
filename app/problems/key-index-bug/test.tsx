import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('Key Index 버그', () => {
  it('첫 번째 상품을 삭제하면 두 번째 상품의 수량이 유지된다', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<App />);

    // Assert initial products
    expect(screen.getByText('노트북')).toBeInTheDocument();
    expect(screen.getByText('마우스')).toBeInTheDocument();
    expect(screen.getByText('키보드')).toBeInTheDocument();

    // Act - change quantity of second product
    const quantityInputs = screen.getAllByPlaceholderText(/수량/i) as HTMLInputElement[];
    await user.clear(quantityInputs[1]);
    await user.type(quantityInputs[1], '5');

    // Assert quantity changed
    expect(quantityInputs[1]).toHaveValue(5);

    // Act - delete first product
    const deleteButtons = screen.getAllByRole('button', { name: /삭제/i });
    await user.click(deleteButtons[0]);

    // Assert - first product deleted
    await waitFor(() => {
      expect(screen.queryByText('노트북')).not.toBeInTheDocument();
    });

    // Assert - remaining products exist
    expect(screen.getByText('마우스')).toBeInTheDocument();
    expect(screen.getByText('키보드')).toBeInTheDocument();

    // Assert - quantity preserved (key bug test)
    const remainingInputs = screen.getAllByPlaceholderText(/수량/i) as HTMLInputElement[];
    expect(remainingInputs[0]).toHaveValue(5);
  });
});
