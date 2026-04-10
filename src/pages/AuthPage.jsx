import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(false);

  const isSignup = mode === "signup";


  const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert("Login successful!");
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (error) {
            alert(error.message);
        }
    };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        if (isSignup) {

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password);

        alert("Account created!");
        navigate("/");

        } else {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login successful!");
        navigate("/");

        }

    } catch (error) {
        alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-stone-100 to-gray-200 px-4 py-12">
      <div
        className="w-full max-w-md bg-white rounded-2xl border border-black/10 px-8 py-10
                   shadow-[0_8px_40px_rgba(0,0,0,0.07)]
                   animate-[fadeSlideUp_0.5s_cubic-bezier(.22,.68,0,1.2)_both]"
      >
        {/* Brand */}
        <div className="flex flex-col items-center mb-7">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <h1 className="text-[22px] font-medium text-gray-900 tracking-tight">TripUnite</h1>
          <p className="text-sm text-gray-400 mt-0.5">Find your perfect travel companion</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-stone-100 rounded-xl p-1 mb-7">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-[10px] transition-all duration-200
                ${mode === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {tab === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="animate-[tabSlide_0.25s_ease_both]"
          key={mode}
        >
          {/* Email */}
          <div className="mb-4">
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-sm border border-black/15 rounded-xl bg-stone-50
                         text-gray-900 placeholder-gray-300 outline-none
                         focus:border-gray-900 focus:ring-[3px] focus:ring-black/7 focus:bg-white
                         transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-sm border border-black/15 rounded-xl bg-stone-50
                         text-gray-900 placeholder-gray-300 outline-none
                         focus:border-gray-900 focus:ring-[3px] focus:ring-black/7 focus:bg-white
                         transition-all duration-200"
            />
          </div>

          {/* Confirm Password (signup only) */}
          {isSignup && (
            <div className="mb-4">
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required={isSignup}
                className="w-full px-4 py-2.5 text-sm border border-black/15 rounded-xl bg-stone-50
                           text-gray-900 placeholder-gray-300 outline-none
                           focus:border-gray-900 focus:ring-[3px] focus:ring-black/7 focus:bg-white
                           transition-all duration-200"
              />
            </div>
          )}

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded accent-black cursor-pointer"
              />
              Remember me
            </label>
            {!isSignup && (
              <a
                href="#"
                className="text-sm font-medium text-gray-900 hover:underline transition-all"
              >
                Forgot password?
              </a>
            )}
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-xl
                       hover:bg-gray-800 active:scale-[0.98] hover:scale-[1.02]
                       transition-all duration-200 mb-4"
          >
            {isSignup ? "Create account" : "Log in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4 text-[11px] text-gray-300">
            <span className="flex-1 h-px bg-black/10" />
            OR
            <span className="flex-1 h-px bg-black/10" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2.5 py-2.5
                       border border-black/15 rounded-xl text-sm font-medium text-gray-700
                       bg-white hover:bg-stone-50 active:scale-[0.98] hover:scale-[1.02]
                       transition-all duration-200 mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-400">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(isSignup ? "login" : "signup")}
              className="text-gray-900 font-medium underline hover:text-gray-600 transition-colors"
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
        </form>
      </div>

      {/* Keyframe styles — add these to your global CSS or tailwind config */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabSlide {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}