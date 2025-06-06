"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    fetch("/api/setup-admin")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Setup already completed");
      })
      .then((data) => {
        if (data.allowed) {
          router.replace("/setup-admin");
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      await res.json();
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
      <div className="bg-white p-4 p-md-5 rounded shadow-sm w-100" style={{ maxWidth: 400 }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <Image src="/images/logo2.png" alt="logo" width={180} height={50} style={{ objectFit: "contain" }} />
        </div>

        {/* Headings */}
        <h4 className="h4 text-center mb-2">Hello! Let’s get started</h4>
        <p className="text-muted text-center mb-4">Sign in to continue.</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4 input-group">
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
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={submitting}
          >
            {submitting ? (
              <span className="spinner-border spinner-border-sm" role="status" />
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
