/**
 * refer ke Figma untuk memastikan styling variant
 * @param {string} variant - 'primary' | 'secondary' | 'outlined'
 * @param {import("react").ReactNode} children - konten button
 * @param {boolean} disabled
 * @callback onClick
 */

// deklarasi base class tailwind untuk semua variant
const baseClasses = "";

// deklarasi class tailwind untuk variant
const variantClasses = {
	primary: "",
	secondary: "",
	outlined: "",
	transparent: "",
};

export default function Button({
	variant = "primary",
	disabled = false,
	onClick = () => {},
	children,
}) {
	return (
		<button
			type="button"
			className={`${baseClasses} ${variantClasses[variant]}`}
			disabled={disabled}
			onClick={(e) => {
				e.preventDefault();
				onClick();
			}}
		>
			{children}
		</button>
	);
}
