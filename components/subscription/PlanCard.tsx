import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SignInButton } from "@clerk/nextjs";
import { useAuth } from "@/hooks/useAuth";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface PlanCardProps {
  plan: {
    type: string;
    name: string;
    price: number;
    credits: number;
    features: string[];
  };
  onSelect: () => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const annualPrice = Math.round(plan.price * 12 * 0.8); // 20% discount
  const { isAuthenticated } = useAuth();
  const isPremium = plan.type === "premium";
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onSelect();
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="p-8 rounded-2xl shadow-xl transition-all duration-300 ease-out hover:shadow-md hover:shadow-purple-600/50 border border-gray-200 dark:border-gray-700 transform hover:scale-102 hover:brightness-110">
      {/* Plan Name */}
      <div>
      <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">
        {plan.name}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
            One-time payment for {plan.credits} credits
          </p>
      </div>

      {/* Pricing & Toggle */}
      <div className="flex items-baseline gap-1 mt-4">
          <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            ${plan.price}
          </span>
          <span className="text-gray-500 dark:text-gray-400">one-time</span>
      </div>

      {/* Features List */}
      <ul className="my-6 space-y-2">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
          >
            <CheckIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Select Plan Button */}

      {isAuthenticated ? (
      <Button
      className={`w-full py-6 rounded-xl font-medium tracking-wide shadow-lg transition-all duration-300 cursor-pointer
        ${
          isPremium
            ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white hover:scale-[1.02] hover:shadow-xl"
            : "bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:scale-[1.02] hover:shadow-xl"
        }`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin" />
          Processing...
        </div>
      ) : (
        `Get ${plan.credits} Credits`
      )}
    </Button>
      ) : (
        <SignInButton mode="modal">
            <Button
              className={`w-full py-6 rounded-xl font-medium tracking-wide shadow-lg transition-all duration-300 cursor-pointer
                ${
                  isPremium
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white hover:scale-[1.02] hover:shadow-xl"
                    : "bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:scale-[1.02] hover:shadow-xl"
                }`}
            >
              Sign in to Purchase
            </Button>
          </SignInButton>
      )}
    </Card>
  );
}
