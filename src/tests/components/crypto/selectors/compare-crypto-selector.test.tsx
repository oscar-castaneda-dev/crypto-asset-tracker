import { screen } from "@testing-library/react";
import { CompareCryptoSelector } from "@/components/crypto/selectors/compare-crypto-selector";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { mockCoins } from "@/tests/mocks/mockData";

function renderWithMockStore(ui: React.ReactNode) {
  const store = configureStore({
    reducer: {
      crypto: () => ({
        coins: mockCoins,
        loading: false,
        error: null,
      }),
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("CompareCryptoSelector", () => {
  it("renders enabled select trigger with Bitcoin selected", () => {
    renderWithMockStore(
      <CompareCryptoSelector onSelect={() => {}} selectedCoin="bitcoin" />
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
    expect(combobox).toBeEnabled();
    expect(screen.getByText(/bitcoin \(btc\)/i)).toBeInTheDocument();
  });
});
