import { useSelector } from "react-redux";

/**
 *
 * @param {string} avatarUrl
 * @param {string} name
 * @param {string} email
 * @param {string} role - 'admin' | 'staff' | 'customer'
 */
export default function UserCard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2.5">
      <img
        src={user?.profile?.avatar_url ?? "/avatar_placeholder.png"}
        alt="User avatar"
        className="w-[32px] h-[32px] rounded-full object-cover"
      />
      <div>
        <p className="text-xs">{user?.profile?.full_name ?? "Demo"}</p>
        <p className="text-[10px]">{user?.email ?? "demo@demo.com"}</p>
      </div>
    </div>
  );
}
