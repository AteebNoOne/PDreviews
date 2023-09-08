import { BrowserRouter, Route, Routes } from "react-router-dom";
import React  from "react";
import ThemeProvider from "./theme";
import Home from "./pages/Home";

export default function App() {

  return (
    <>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <>
                <Route
                  exact
                  path="*"
                  element={<Home />}
                />
              </>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
    </>
  );
}
