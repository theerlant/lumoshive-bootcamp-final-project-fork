/**
 * @param {import("react").ReactNode} icon - gunakan lib Lucide Icon yg penting sesuaikan dengan figma
 * @param {string} title - title dari nav item
 * @param {boolean} active
 * @param {string} href - url untuk menuju nav tujuan
 */

const baseClasses = ""; // class tailwind base
const activeClasses = ""; // tambahan jika sedang active

export default function NavItem({
	icon,
	title = "Nav Item",
	active = false,
	href = "#",
}) {
	return (
		<a href={href} className={`${baseClasses} ${active ? activeClasses : ""}`}>
			{/* Active pill di kiri, refer ke figma */}
			{active ? <ActivePill /> : null}
			{icon}
			<span>{title}</span>
		</a>
	);
}

function ActivePill() {
	return <div>TODO</div>;
}
