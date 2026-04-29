import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="w-full md:w-5/12 bg-navy flex flex-col items-center justify-center gap-6 px-8 py-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/4 translate-y-1/3 -translate-x-1/3"></div>

        {/* Logo Ring */}
        <div className="w-18 h-18 bg-accent rounded-full flex items-center justify-center text-4xl font-bold font-rajdhani letter-spacing-tight relative z-10 box-shadow-lg ring-6 ring-offset-4 ring-accent-2/25">
          ⊙
        </div>

        {/* Brand Box */}
        <div className="bg-white text-navy px-7 py-2.5 rounded-lg text-center relative z-10">
          <h1 className="font-rajdhani text-5xl font-bold letter-spacing-widest text-navy">
            ACDP
          </h1>
          <p className="font-barlow-cond text-xs letter-spacing-wider text-gray-600 mt-0.5">
            CONSUMER GOODS TRADING
          </p>
        </div>

        {/* Tagline */}
        <div className="font-rajdhani text-lg letter-spacing-wider text-center text-off-white text-uppercase relative z-10">
          <div>Cold Chain Connect</div>
          <div>System</div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:flex-1 flex items-center justify-center px-6 py-8 md:py-12">
        <div className="bg-white rounded-2xl px-8 md:px-10 py-8 md:py-10 w-full max-w-sm md:max-w-md flex flex-col items-center gap-6 shadow-lg md:shadow-xl border border-border">
          {/* Card Logo */}
          <div className="w-13 h-13 bg-navy rounded-full flex items-center justify-center text-white font-rajdhani text-2xl font-bold">
            ⊙
          </div>

          <h2 className="font-rajdhani text-2xl text-navy letter-spacing-wider">
            COLD CHAIN CONNECT
          </h2>

          <form className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 letter-spacing-tight">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 border-2 border-blue-200 rounded-lg text-sm text-navy bg-blue-50 transition-colors focus:outline-none focus:border-accent"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 letter-spacing-tight">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border-2 border-blue-200 rounded-lg text-sm text-navy bg-blue-50 transition-colors focus:outline-none focus:border-accent"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-navy text-white rounded-xl font-rajdhani text-xl letter-spacing-widest font-semibold cursor-pointer transition-colors hover:bg-navy-mid mt-2"
            >
              Login
            </button>

            <div className="text-center text-xs text-gray-500 mt-1">
              Forgot credentials? Contact Administrator
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
