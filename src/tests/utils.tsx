// src/tests/utils.tsx
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { store } from "@/store";

export function renderWithProvider(children: ReactNode) {
  return render(<Provider store={store}>{children}</Provider>);
}
