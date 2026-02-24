/**
 *
 * @param {string} avatarUrl
 * @param {string} name
 * @param {string} email
 */
export default function UserCard({ avatarUrl = "", name = "", email = "" }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2.5">
      <img
        src={avatarUrl}
        alt="User avatar"
        className="w-[32px] h-[32px] rounded-full"
      />
      <div>
        <p className="text-xs">{name}</p>
        <p className="text-[10px]">{email}</p>
      </div>
    </div>
  );
}
