import { screen } from "@testing-library/react";
import { TopMovers } from "@/components/crypto/top-movers/top-movers";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { mockCoins } from "@/tests/mocks/mockData";

function renderWithMockStore(
  ui: React.ReactNode,
  {
    coins = [],
    loading = false,
    error = null,
  }: { coins?: any[]; loading?: boolean; error?: string | null } = {}
) {
  const store = configureStore({
    reducer: {
      crypto: () => ({
        topCoins: {
          data: coins,
          loading,
          error,
        },
      }),
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("TopMovers", () => {
  it("renders skeleton when loading", () => {
    const { container } = renderWithMockStore(<TopMovers />, {
      coins: [],
      loading: true,
      error: null,
    });

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });

  it("renders error message when error exists", () => {
    renderWithMockStore(<TopMovers />, {
      coins: [],
      loading: false,
      error: "Unable to fetch top coins",
    });

    expect(screen.getByText(/unable to fetch top coins/i)).toBeInTheDocument();
  });

  it("renders TopMovers with coins data", () => {
    renderWithMockStore(<TopMovers />, {
      coins: mockCoins,
      loading: false,
      error: null,
    });

    expect(
      screen.getByText(/top 2 cryptocurrencies by market cap/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /bitcoin/i })).toBeInTheDocument();
    expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
    expect(screen.getByText(/btc/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /ethereum/i })).toBeInTheDocument();
    expect(screen.getByText(/ethereum/i)).toBeInTheDocument();
  });
});
