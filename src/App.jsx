import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComponentSandbox from "./sandbox/Sandbox";

function App() {
	// Sandboxing routes
	return (
		<BrowserRouter>
			<Routes>
				{process.env.NODE_ENV === "development" && (
					<Route path="/sandbox" element={<ComponentSandbox />} />
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
