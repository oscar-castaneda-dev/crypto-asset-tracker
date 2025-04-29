import { screen } from "@testing-library/react";
import { PriceChart } from "@/components/crypto/charts/price-chart";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { mockHistoricalData } from "@/tests/mocks/mockData";

vi.mock("@/hooks/useAppDispatch", () => ({
  useAppDispatch: () => () => Promise.resolve(),
}));

function renderWithMockStore(
  ui: React.ReactNode,
  {
    historicalData = {},
    loading = false,
  }: { historicalData?: any; loading?: boolean } = {}
) {
  const store = configureStore({
    reducer: {
      crypto: () => ({
        historicalData,
        loading,
      }),
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("PriceChart", () => {
  it("renders loading skeleton when chart is loading", () => {
    const { container } = renderWithMockStore(<PriceChart coinId="bitcoin" />, {
      loading: true,
    });

    expect(screen.getByText(/price history/i)).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).toBeInTheDocument();
  });

  it("renders chart when historical data is loaded", () => {
    renderWithMockStore(<PriceChart coinId="bitcoin" />, {
      historicalData: mockHistoricalData,
      loading: false,
    });

    expect(screen.getByText(/price history/i)).toBeInTheDocument();
  });
});
