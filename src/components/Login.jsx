import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function Login() {
  const { setLoginUser, registerUser, loginUser } = useContext(Auth);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginUser) {
      navigate("/home");
    }
  }, [loginUser, navigate]);

  if (loginUser) {
    return null;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleFormSubmit = ({ email, password }) => {
    const user = registerUser.find(
      (elem) => elem.email === email && elem.password === password
    );
    if (!user) {
      setLoginError("Invalid email or password");
      reset();
      return;
    }

    setLoginUser(user);
    localStorage.setItem("sm_session", JSON.stringify(user));
    setLoginError("");
    reset();
    navigate("/home");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#020202] text-white selection:bg-[#cef00f] selection:text-black">
      {/* Left Column: Branding and Catchphrase */}
      <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-[#cef00f]/5" />

        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10 flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-[#cef00f] rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(206,240,15,0.4)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight">Sky<span className="text-[#cef00f]">Mart</span></span>
        </motion.div>

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#cef00f]">Welcome back</span>
            <h1 className="text-6xl md:text-7xl font-black font-heading tracking-tight leading-[0.85] mt-4">
              Shop the future. <br />
              <span className="text-[#cef00f] drop-shadow-[0_0_15px_rgba(206,240,15,0.3)]">Today.</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-sm max-w-sm leading-relaxed font-medium"
          >
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-3 pt-8"
          >
            {[
              { label: "Products", value: "20K+" },
              { label: "Users", value: "50K+" },
              { label: "Rating", value: "4.9★" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl group hover:border-[#cef00f]/30 transition-all duration-300">
                <div className="text-xl font-heading font-black text-white group-hover:text-[#cef00f] transition-colors">{stat.value}</div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 text-[10px] text-white/20 font-bold uppercase tracking-widest">
          &copy; 2025 SkyMart Global Ltd.
        </div>
      </div>

      {/* Right Column: Form Card */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
           <div className="w-8 h-8 bg-[#cef00f] rounded-lg flex items-center justify-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
           </div>
           <span className="font-heading font-bold text-lg">SkyMart</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-heading font-black tracking-tight text-white">Sign in</h2>
            <p className="text-sm text-white/40 font-medium">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#cef00f] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-[#cef00f]/50 focus:bg-black transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold uppercase pl-2">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#cef00f] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters required" },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium outline-none focus:border-[#cef00f]/50 focus:bg-black transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] font-bold uppercase pl-2">{errors.password.message}</p>
              )}
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold text-center"
              >
                {loginError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-4 bg-[#cef00f] text-black font-black font-heading rounded-2xl shadow-[0_10px_30px_rgba(206,240,15,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 group"
            >
              Sign in <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-white/30 text-xs font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#cef00f] font-bold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
