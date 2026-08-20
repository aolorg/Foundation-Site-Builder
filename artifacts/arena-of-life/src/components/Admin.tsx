import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Lock, LogOut, RefreshCw, Inbox } from "lucide-react";
import {
  useAdminSession,
  useAdminLogin,
  useAdminLogout,
  useListContactSubmissions,
  getAdminSessionQueryKey,
  getListContactSubmissionsQueryKey,
} from "@workspace/api-client-react";

function formatDate(value: Date | string): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function LoginScreen() {
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useAdminLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await mutateAsync({ data: { password } });
      await queryClient.invalidateQueries({ queryKey: getAdminSessionQueryKey() });
    } catch {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(215,65%,16%)] px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[hsl(43,85%,50%)] mx-auto flex items-center justify-center mb-5">
            <Lock size={22} className="text-[hsl(215,70%,8%)]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Admin Access
          </h1>
          <p className="text-white/50 text-sm">
            The Arena of Life Foundation
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-7 space-y-5"
          data-testid="admin-login-form"
        >
          <input
            type="text"
            name="username"
            autoComplete="username"
            value="admin"
            readOnly
            hidden
            aria-hidden="true"
          />
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              autoComplete="current-password"
              placeholder="Enter password"
              className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-[hsl(215,65%,16%)] placeholder:text-gray-400 focus:outline-none focus:border-[hsl(43,85%,50%)] focus:ring-2 focus:ring-[hsl(43,85%,50%,0.15)] transition-all"
              data-testid="input-admin-password"
            />
          </div>

          {error && (
            <p
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
              data-testid="text-admin-error"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-[hsl(215,65%,16%)] text-[hsl(43,85%,50%)] font-bold tracking-widest uppercase text-sm rounded-lg hover:bg-[hsl(215,65%,20%)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            data-testid="btn-admin-login"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  const queryClient = useQueryClient();
  const { mutateAsync: logout } = useAdminLogout();
  const {
    data: submissions,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useListContactSubmissions();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      await queryClient.invalidateQueries({ queryKey: getAdminSessionQueryKey() });
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)]">
      {/* Top bar */}
      <header className="bg-[hsl(215,65%,16%)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-white">
              Contact Messages
            </h1>
            <p className="text-white/50 text-xs">The Arena of Life Foundation</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold tracking-widest uppercase px-3 py-2 rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
              data-testid="btn-admin-refresh"
            >
              <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[hsl(43,85%,50%)] hover:text-[hsl(43,85%,60%)] text-xs font-semibold tracking-widest uppercase px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
              data-testid="btn-admin-logout"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {isLoading ? (
          <p className="text-gray-500 text-sm py-20 text-center">Loading messages...</p>
        ) : isError ? (
          <p
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
            data-testid="text-admin-load-error"
          >
            Could not load messages. Please refresh and try again.
          </p>
        ) : !submissions || submissions.length === 0 ? (
          <div className="text-center py-24" data-testid="admin-empty">
            <div className="w-14 h-14 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-5">
              <Inbox size={22} className="text-gray-400" />
            </div>
            <h2 className="font-display text-lg font-bold text-[hsl(215,65%,16%)] mb-1">
              No messages yet
            </h2>
            <p className="text-gray-500 text-sm">
              New contact form submissions will appear here.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-5">
              {submissions.length}{" "}
              {submissions.length === 1 ? "Message" : "Messages"}
            </p>
            <div className="space-y-4" data-testid="admin-submissions">
              {submissions.map((s) => (
                <article
                  key={s.id}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
                  data-testid={`submission-${s.id}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[hsl(215,65%,16%)]">
                        {s.name}
                      </h3>
                      <span className="inline-block mt-1 text-[10px] font-bold tracking-widest uppercase text-[hsl(43,85%,40%)] bg-[hsl(43,85%,50%,0.12)] px-2.5 py-1 rounded">
                        {s.inquiryType}
                      </span>
                    </div>
                    <time className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(s.createdAt)}
                    </time>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4 text-sm">
                    <a
                      href={`mailto:${s.email}`}
                      className="text-[hsl(215,65%,30%)] hover:text-[hsl(43,85%,45%)] font-medium underline-offset-2 hover:underline"
                    >
                      {s.email}
                    </a>
                    {s.phone && (
                      <a
                        href={`tel:${s.phone}`}
                        className="text-[hsl(215,65%,30%)] hover:text-[hsl(43,85%,45%)] font-medium"
                      >
                        {s.phone}
                      </a>
                    )}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {s.message}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function Admin() {
  const { data, isLoading } = useAdminSession();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(215,65%,16%)]">
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    );
  }

  return data?.authenticated ? <Dashboard /> : <LoginScreen />;
}
