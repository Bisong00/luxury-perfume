import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function MobileAuth() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="mt-6 flex flex-col gap-4 border-t pt-6">

        <Link
          href="/login"
          className="
            text-lg
            font-medium
            transition
            hover:text-[#B88A44]
          "
        >
          Login
        </Link>


        <Link
          href="/register"
          className="
            rounded-full
            bg-black
            px-6
            py-3
            text-center
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
    <div className="mt-6 flex flex-col gap-4 border-t pt-6">

      <Link
        href="/account"
        className="
          text-lg
          font-medium
          transition
          hover:text-[#B88A44]
        "
      >
        My Account
      </Link>


      <form action="/api/auth/logout" method="POST">

        <button
          type="submit"
          className="
            text-left
            text-lg
            font-medium
            transition
            hover:text-red-500
          "
        >
          Logout
        </button>

      </form>


    </div>
  );
}