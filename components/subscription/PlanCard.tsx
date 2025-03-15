import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SignInButton } from "@clerk/nextjs";
import { useAuth } from "@/hooks/useAuth";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

interface PlanCardProps {
  plan: {
    type: string;
    name: string;
    price: number;
    credits: number;
    features: string[];
  };
  onSelect: (isAnnual: boolean) => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const annualPrice = Math.round(plan.price * 12 * 0.8); // 20% discount
  const { isAuthenticated } = useAuth();

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
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium tracking-wide shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:from-blue-500 dark:to-blue-400"
        onClick={() => onSelect(isAnnual)}
      >
        Select Plan
      </Button>
      ) : (
        <SignInButton mode="modal">
            <Button
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium tracking-wide shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:from-blue-500 dark:to-blue-400"
            >
              Sign in to Purchase
            </Button>
          </SignInButton>
      )}
    </Card>
  );
}
