import { screen } from "@testing-library/react";
import { CoinDetails } from "@/components/crypto/coin-details/coin-details";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { mockSelectedCoin } from "@/tests/mocks/mockData";

function renderWithMockStore(
  ui: React.ReactNode,
  {
    selectedCoin = mockSelectedCoin,
    loading = false,
    error = null,
  }: { selectedCoin?: any; loading?: boolean; error?: string | null } = {}
) {
  const store = configureStore({
    reducer: {
      crypto: () => ({
        selectedCoin,
        loading,
        error,
      }),
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("CoinDetails", () => {
  it("renders coin details correctly when Bitcoin is selected", () => {
    renderWithMockStore(<CoinDetails />);

    expect(screen.getByRole("img", { name: /bitcoin/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /bitcoin/i
    );
    expect(screen.getByText(/btc/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50,000/i)).toBeInTheDocument();
    expect(screen.getByText(/\+2\.50%/i)).toBeInTheDocument();
    expect(
      screen.getByText(/bitcoin is a decentralized digital currency/i)
    ).toBeInTheDocument();
  });

  it("renders skeleton when loading", () => {
    const { container } = renderWithMockStore(<CoinDetails />, {
      selectedCoin: null,
      loading: true,
      error: null,
    });

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });

  it("renders error message when error occurs", () => {
    renderWithMockStore(<CoinDetails />, {
      selectedCoin: mockSelectedCoin,
      loading: false,
      error: "something went wrong",
    });

    expect(
      screen.getByText(/failed to load cryptocurrency details/i)
    ).toBeInTheDocument();
  });
});
