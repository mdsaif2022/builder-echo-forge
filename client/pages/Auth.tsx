import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Facebook } from "lucide-react";
import { useState } from "react";

export default function Auth() {
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");

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
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        variant={authMethod === "phone" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAuthMethod("phone")}
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Button>
                      <Button
                        variant={authMethod === "email" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAuthMethod("email")}
                        className="flex-1"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    {authMethod === "phone" ? (
                      <Input
                        placeholder="Enter your phone number"
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    ) : (
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    )}

                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="border-emerald-200 focus:border-emerald-500"
                    />

                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
                      Login
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  {/* Sign Up Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                      <Input
                        placeholder="Last Name"
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={authMethod === "phone" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAuthMethod("phone")}
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Button>
                      <Button
                        variant={authMethod === "email" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAuthMethod("email")}
                        className="flex-1"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    {authMethod === "phone" ? (
                      <Input
                        placeholder="Enter your phone number"
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    ) : (
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    )}

                    <Input
                      type="password"
                      placeholder="Create password"
                      className="border-emerald-200 focus:border-emerald-500"
                    />

                    <Input
                      type="password"
                      placeholder="Confirm password"
                      className="border-emerald-200 focus:border-emerald-500"
                    />

                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
                      Create Account
                    </Button>
                  </div>
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
