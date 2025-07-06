import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Facebook, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Login form state
  const [loginData, setLoginData] = useState({
    phoneOrEmail: "",
    password: "",
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    phoneOrEmail: "",
    password: "",
    confirmPassword: "",
  });

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.phoneOrEmail.trim()) {
      newErrors.phoneOrEmail =
        authMethod === "phone"
          ? "Phone number is required"
          : "Email is required";
    } else if (
      authMethod === "email" &&
      !loginData.phoneOrEmail.includes("@")
    ) {
      newErrors.phoneOrEmail = "Please enter a valid email address";
    } else if (authMethod === "phone" && loginData.phoneOrEmail.length < 10) {
      newErrors.phoneOrEmail = "Please enter a valid phone number";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};

    if (!signupData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!signupData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!signupData.phoneOrEmail.trim()) {
      newErrors.phoneOrEmail =
        authMethod === "phone"
          ? "Phone number is required"
          : "Email is required";
    } else if (
      authMethod === "email" &&
      !signupData.phoneOrEmail.includes("@")
    ) {
      newErrors.phoneOrEmail = "Please enter a valid email address";
    } else if (authMethod === "phone" && signupData.phoneOrEmail.length < 10) {
      newErrors.phoneOrEmail = "Please enter a valid phone number";
    }

    if (!signupData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!signupData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateLogin()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Login successful:", loginData);

      // Simulate successful login
      setIsSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrors({ general: "Login failed. Please check your credentials." });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateSignup()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Signup successful:", signupData);

      // Simulate successful signup
      setIsSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrors({ general: "Signup failed. Please try again." });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // In a real app, this would redirect to the OAuth provider
    alert(
      `Login with ${provider} - This would redirect to ${provider} OAuth in a real app`,
    );
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-900 mb-4">
              Welcome to Explore BD!
            </h2>
            <p className="text-emerald-700 mb-6">
              You have been successfully logged in. Redirecting to homepage...
            </p>
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Auth Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">
              Welcome to Explore BD
            </h1>
            <p className="text-emerald-700">
              Sign in to book tours and share your travel stories
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-emerald-900">
                Login or Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Error Display */}
                    {errors.general && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={authMethod === "phone" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setAuthMethod("phone");
                          setErrors({});
                        }}
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Button>
                      <Button
                        type="button"
                        variant={authMethod === "email" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setAuthMethod("email");
                          setErrors({});
                        }}
                        className="flex-1"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    <div>
                      {authMethod === "phone" ? (
                        <Input
                          placeholder="Enter your phone number"
                          value={loginData.phoneOrEmail}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              phoneOrEmail: e.target.value,
                            })
                          }
                          className={`border-emerald-200 focus:border-emerald-500 ${
                            errors.phoneOrEmail ? "border-red-500" : ""
                          }`}
                        />
                      ) : (
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={loginData.phoneOrEmail}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              phoneOrEmail: e.target.value,
                            })
                          }
                          className={`border-emerald-200 focus:border-emerald-500 ${
                            errors.phoneOrEmail ? "border-red-500" : ""
                          }`}
                        />
                      )}
                      {errors.phoneOrEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phoneOrEmail}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className={`border-emerald-200 focus:border-emerald-500 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Logging in...
                        </div>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  {/* Sign Up Form */}
                  <form onSubmit={handleSignup} className="space-y-4">
                    {/* Error Display */}
                    {errors.general && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="First Name"
                          value={signupData.firstName}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              firstName: e.target.value,
                            })
                          }
                          className={`border-emerald-200 focus:border-emerald-500 ${
                            errors.firstName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Last Name"
                          value={signupData.lastName}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              lastName: e.target.value,
                            })
                          }
                          className={`border-emerald-200 focus:border-emerald-500 ${
                            errors.lastName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={authMethod === "phone" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setAuthMethod("phone");
                          setErrors({});
                        }}
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Button>
                      <Button
                        type="button"
                        variant={authMethod === "email" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setAuthMethod("email");
                          setErrors({});
                        }}
                        className="flex-1"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    <div>
                      {authMethod === "phone" ? (
                        <Input
                          placeholder="Enter your phone number"
                          value={signupData.phoneOrEmail}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              phoneOrEmail: e.target.value,
                            })
                          }
                          className={`border-emerald-200 focus:border-emerald-500 ${
                            errors.phoneOrEmail ? "border-red-500" : ""
                          }`}
                        />
                      ) : (
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={signupData.phoneOrEmail}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              phoneOrEmail: e.target.value,
                            })
                          }
                          className={`border-emerald-200 focus:border-emerald-500 ${
                            errors.phoneOrEmail ? "border-red-500" : ""
                          }`}
                        />
                      )}
                      {errors.phoneOrEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phoneOrEmail}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        className={`border-emerald-200 focus:border-emerald-500 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`border-emerald-200 focus:border-emerald-500 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Options */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={isLoading}
                >
                  <Facebook className="w-5 h-5 mr-2 text-blue-600" />
                  Continue with Facebook
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
