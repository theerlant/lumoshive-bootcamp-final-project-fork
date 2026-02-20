/*
	CATATAN:
	- Test component hanya di section masing-masing agar tidak terjadi merge conflict
	- Jangan mengubah style, menambah elemen diluar zona
*/
export default function ComponentSandbox() {
	return (
		<div className="flex flex-col gap-8 p-10 min-h-screen bg-gray-50">
			<div className="w-full bg-red-600 text-white rounded-lg">
				<h1 className="p-4 text-3xl font-bold text-center">
					UI Component Sandbox
				</h1>
			</div>

			{/* ========================================= */}
			{/* SECTION 1: Theerlan */}
			{/* ========================================= */}
			<section className="p-6 bg-white rounded-lg shadow-sm border border-red-200">
				<h2 className="text-xl font-bold mb-4 text-red-600">SECT 1</h2>
				<div className="flex flex-wrap gap-4 items-end">
					{/* Taruh component disini */}
				</div>
			</section>

			{/* ========================================= */}
			{/* SECTION 2: Ferdinand */}
			{/* ========================================= */}
			<section className="p-6 bg-white rounded-lg shadow-sm border border-red-200">
				<h2 className="text-xl font-bold mb-4 text-red-600">SECT 2</h2>

				<div className="flex flex-wrap gap-4 items-end">
					{/* Taruh component disini */}
				</div>
			</section>

			{/* ========================================= */}
			{/* SECTION 3: Ferdyawan */}
			{/* ========================================= */}
			<section className="p-6 bg-white rounded-lg shadow-sm border border-blue-200">
				<h2 className="text-xl font-bold mb-4 text-blue-600">SECT 3</h2>
				<div className="flex flex-col gap-6 max-w-md">
					{/* Taruh component disini */}
				</div>
			</section>

			{/* ========================================= */}
			{/* SECTION 4: Ilham */}
			{/* ========================================= */}
			<section className="p-6 bg-white rounded-lg shadow-sm border border-green-200">
				<h2 className="text-xl font-bold mb-4 text-green-600">SECT 4</h2>
				<div className="flex flex-col gap-6 max-w-md">
					{/* Taruh component disini */}
				</div>
			</section>
		</div>
	);
}
