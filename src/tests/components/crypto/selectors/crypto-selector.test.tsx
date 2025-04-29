import { screen } from "@testing-library/react";
import CryptoSelector from "@/components/crypto/selectors/crypto-selector";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { mockCoins } from "@/tests/mocks/mockData";

interface RenderOptions {
  coins?: typeof mockCoins;
  loading?: boolean;
  error?: string | null;
}

function renderWithMockStore(
  ui: React.ReactNode,
  { coins = mockCoins, loading = false, error = null }: RenderOptions = {}
) {
  const store = configureStore({
    reducer: {
      crypto: () => ({
        coins,
        loading,
        error,
      }),
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("CryptoSelector", () => {
  it("renders enabled select trigger with Bitcoin selected", () => {
    renderWithMockStore(
      <CryptoSelector onSelect={() => {}} selectedCoin="bitcoin" />
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
    expect(combobox).toBeEnabled();
    expect(screen.getByText(/bitcoin \(btc\)/i)).toBeInTheDocument();
  });

  it("renders skeleton when loading", () => {
    const { container } = renderWithMockStore(
      <CryptoSelector onSelect={() => {}} selectedCoin="" />,
      { coins: [], loading: true, error: null }
    );

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });

  it("renders error message when error occurs", () => {
    renderWithMockStore(
      <CryptoSelector onSelect={() => {}} selectedCoin="" />,
      { coins: [], loading: false, error: "Something went wrong" }
    );

    expect(
      screen.getByText(/failed to load cryptocurrency options/i)
    ).toBeInTheDocument();
  });
});
