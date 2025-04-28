import { screen } from "@testing-library/react";

import { WalletConnect } from "@/components/crypto/wallet/wallet-connect";
import { renderWithProvider } from "@/tests/utils";

describe("WalletConnect", () => {
  it("renders connect wallet button", () => {
    renderWithProvider(<WalletConnect />);
    expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
  });
});
