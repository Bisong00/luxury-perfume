"use client";

import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: number;
}

const steps = [
  {
    id: 1,
    title: "Information",
  },
  {
    id: 2,
    title: "Shipping",
  },
  {
    id: 3,
    title: "Payment",
  },
  {
    id: 4,
    title: "Review",
  },
];

export default function CheckoutStepper({
  currentStep,
}: CheckoutStepperProps) {
  return (
    <div className="mb-16">

      <div className="flex items-center justify-between">

        {steps.map((step, index) => {

          const completed =
            currentStep > step.id;

          const active =
            currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    text-sm
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      completed
                        ? "border-[#B88A44] bg-[#B88A44] text-white"
                        : active
                        ? "border-[#B88A44] text-[#B88A44]"
                        : "border-neutral-300 text-neutral-400"
                    }
                  `}
                >
                  {completed ? (
                    <Check size={20} />
                  ) : (
                    step.id
                  )}
                </div>

                <p
                  className={`
                    mt-4
                    text-sm
                    font-medium

                    ${
                      active
                        ? "text-black"
                        : "text-neutral-500"
                    }
                  `}
                >
                  {step.title}
                </p>

              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    mx-4
                    h-[2px]
                    flex-1
                    transition-all

                    ${
                      completed
                        ? "bg-[#B88A44]"
                        : "bg-neutral-300"
                    }
                  `}
                />
              )}

            </div>
          );

        })}

      </div>

    </div>
  );
}