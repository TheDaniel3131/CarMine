import "../globals.css";
import CookiesPolicyPage from "@/components/cookies/CookiesPolicy";

export default function Cookies() {
  return (
    <div className="flex flex-col min-h-screen">
      <CookiesPolicyPage />
    </div>
  );
}
