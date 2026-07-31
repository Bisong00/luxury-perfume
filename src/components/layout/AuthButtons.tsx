import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function AuthButtons() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium hover:text-[#B88A44]"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="
            rounded-full
            bg-black
            px-5
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#B88A44]
          "
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <Link
        href="/account"
        className="text-sm font-medium hover:text-[#B88A44]"
      >
        My Account
      </Link>

      <form action="/api/auth/logout" method="POST">
        <button
          type="submit"
          className="text-sm font-medium hover:text-red-500"
        >
          Logout
        </button>
      </form>
    </div>
  );
}