import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const { registerUser, setRegisterUser, loginUser } = useContext(Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleFormSubmit = ({ name, email, password }) => {
    const id = Math.floor(10000000 + Math.random() * 90000000);
    const avatar = name?.trim()?.charAt(0).toUpperCase() || "";
    const joinedAt = new Date().toISOString();
    const newUser = [...registerUser, { name, email, password, id, avatar, joinedAt }];
    setRegisterUser(newUser);
    localStorage.setItem("sm_users", JSON.stringify(newUser));

    reset();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white p-6 relative selection:bg-[#cef00f] selection:text-black">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#cef00f]/5 via-transparent to-transparent" />

      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center gap-2 mb-12"
      >
        <div className="w-10 h-10 bg-[#cef00f] rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(206,240,15,0.4)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <span className="font-heading font-bold text-2xl tracking-tight">Sky<span className="text-[#cef00f]">Mart</span></span>
      </motion.div>

      {/* Register Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="space-y-2 mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-heading font-black tracking-tight text-white">Create account</h2>
          <p className="text-sm text-white/40 font-medium">Join SkyMart and start shopping</p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-1">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#cef00f] transition-colors">
                <User size={18} />
              </div>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Full name"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-[#cef00f]/50 focus:bg-black transition-all"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-[10px] font-bold uppercase pl-2">{errors.name.message}</p>
            )}
          </div>

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
                placeholder="Password (min 6 chars)"
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

          <div className="space-y-1">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#cef00f] transition-colors">
                <Lock size={18} />
              </div>
              <input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value, formValues) => value === formValues.password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium outline-none focus:border-[#cef00f]/50 focus:bg-black transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[10px] font-bold uppercase pl-2">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-4 bg-[#cef00f] text-black font-black font-heading rounded-2xl shadow-[0_10px_30px_rgba(206,240,15,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 group mt-4"
          >
            Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-[#cef00f] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
