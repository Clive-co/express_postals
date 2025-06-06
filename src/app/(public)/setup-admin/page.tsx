"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // 1) Ensure setup is allowed (no users exist yet)
  useEffect(() => {
    fetch("/api/setup-admin")
      .then((res) => {
        if (!res.ok) throw new Error("Setup not allowed");
        return res.json();
      })
      .then((data) => {
        if (!data.allowed) throw new Error("Not allowed");
        setLoading(false);
      })
      .catch(() => {
        // Already initialized → send to login
        router.replace("/login");
      });
  }, [router]);

  // 2) Handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      username: fd.get("username"),
      email:    fd.get("email"),
      password: fd.get("password"),
    };

    try {
      const res = await fetch("/api/setup-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Setup failed");
      }
      // success → dashboard
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p className="text-muted">Preparing…</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
      <div
        className="bg-white p-4 p-md-5 rounded shadow-sm w-100"
        style={{ maxWidth: 400 }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <Image
            src="/images/logo2.png"
            alt="logo"
            width={180}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Headings */}
        <h4 className="h4 text-center mb-2">New here?</h4>
        <p className="text-muted text-center mb-4">
          Signing up is easy. It only takes a few steps
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="form-control"
            />
          </div>

          {/* Password input-group */}
          <div className="mb-3 input-group">
            <input
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setPasswordVisible((v) => !v)}
              tabIndex={-1}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={submitting}
          >
            {submitting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              />
            ) : (
              "SIGN UP"
            )}
          </button>

          <div className="text-center" style={{ fontSize: 14 }}>
            Already have an account?{" "}
            <Link href="/login" className="fw-medium text-primary">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
