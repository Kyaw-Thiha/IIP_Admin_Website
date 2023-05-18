import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function useAuthRedirect() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Replace this condition with your actual authentication check
    const isAuthenticated = session;

    if (!isAuthenticated) {
      void router.push("/sign-in"); // Redirect to login page
    }
  }, [session, router]);
}

export default useAuthRedirect;
