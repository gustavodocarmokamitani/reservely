import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "@mui/material";
import { Check, Star } from "lucide-react";
import Button from "../Button/Button";
import { PricingContainer } from "./Pricing.styles";

interface Plan {
  name: string;
  price: string;
  discountedPrice?: string;
  per: string;
  popular?: boolean;
  features: string[];
  planId: number;
}

interface PlansData {
  monthly: Plan[];
  annually: Plan[];
}

interface PricingProps {
  plansData: PlansData;
  handleSubscribe: (planId: number) => Promise<void>;
  handleUpdateSubscribe: (planId: number) => Promise<void>;
  isSubscriptionActive: boolean;
}

export default function Pricing({
  plansData,
  handleSubscribe,
  handleUpdateSubscribe,
  isSubscriptionActive,
}: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<keyof PlansData>("monthly");
  const currentPlans = plansData[billingCycle];

  const variants = {
    enter: { opacity: 0, y: 50, scale: 0.95 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.95 },
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "3rem",
          color: "white",
          backgroundColor: "#2c2c2c",
          padding: "0.5rem 1rem",
          borderRadius: "9999px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.9)",
          cursor: "pointer",
        }}
        onClick={() =>
          setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")
        }
      >
        <span style={{ color: "#ffffff" }}>Mensal</span>
        <Switch
          style={{ color: "#F16855" }}
          checked={billingCycle === "annually"}
          onChange={(e) =>
            setBillingCycle(e.target.checked ? "annually" : "monthly")
          }
        />

        <span
          style={{
            backgroundColor: "#F16855",
            color: "white",
            padding: "0.125rem 1rem",
            borderRadius: "9999px",
            display: "flex",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#2c2c2c",
              marginRight: "0.5rem",
              fontWeight: "500",
            }}
          >
            Anual
          </span>
          Economize 8.33%
        </span>
      </div>

      <AnimatePresence mode="wait">
        <PricingContainer
          key={billingCycle}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            duration: 0.15,
            staggerChildren: 0.1,
          }}
        >
          {currentPlans.map((plan: Plan, index: number) => (
            <motion.div
              key={plan.name}
              style={{
                borderRadius: "0.75rem",
                padding: "2rem",
                border: "2px solid",
                borderColor: plan.popular ? "#F16855" : "#374151",
                backgroundColor: plan.popular ? "white" : "#2c2c2c",
                transition: "all 0.3s",
                boxShadow: "0 8px 18px rgba(0,0,0,0.9)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 25px rgba(0,0,0,0.8)",
              }}
              variants={{
                enter: { opacity: 0, y: 50, scale: 0.95 },
                center: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -50, scale: 0.95 },
              }}
              transition={{ duration: 0.15, delay: index * 0.25 }}
            >
              {plan.popular && (
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "#F16855",
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      padding: "0.25rem 1rem",
                      borderRadius: "9999px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    <Star style={{ width: "1rem", height: "1rem" }} />
                    Mais Popular
                  </span>
                </div>
              )}
              <span
                style={{
                  display: "block",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "0.5rem",
                  color: plan.popular ? "#2C2C2C" : "white",
                }}
              >
                {plan.name}
              </span>
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  color: plan.popular ? "#4b5563" : "#9ca3af",
                }}
              >
                {`Ideal para ${
                  plan.name === "Essencial"
                    ? "equipes pequenas."
                    : plan.name === "Profissional"
                    ? "negócios em crescimento."
                    : "grandes operações."
                }`}
              </span>
              {plan.per === "/ano" && (
                <div
                  style={{
                    marginTop: "2rem",
                    textAlign: "end",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".875rem",
                      fontWeight: "bold",
                      color: plan.popular ? "#b1aeae" : "#b1aeae",
                    }}
                  >
                    de R$
                  </span>
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: plan.popular ? "#b1aeae" : "#b1aeae",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      marginLeft: "0.1rem",
                      color: plan.popular ? "#b1aeae" : "#b1aeae",
                      fontSize: ".675rem",
                    }}
                  >
                    {plan.per}
                  </span>
                </div>
              )}
              <div style={{ textAlign: "center", marginBottom: "0rem" }}>
                <span
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                    color: plan.popular ? "#2C2C2C" : "white",
                  }}
                >
                  R$
                </span>
                <span
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: plan.popular ? "#2C2C2C" : "white",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    marginLeft: "0.25rem",
                    color: plan.popular ? "#6b7280" : "#9ca3af",
                  }}
                >
                  {plan.per}
                </span>
              </div>
              {plan.per === "/ano" && (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: "bold",
                      color: plan.popular ? "#f16855" : "#f16855",
                    }}
                  >
                    Economize{" "}
                    <span
                      style={{
                        fontSize: "1.15rem",
                        color: plan.popular ? "#2c2c2c" : "#fff",
                      }}
                    >
                      8.33%
                    </span>{" "}
                    com <br />
                    plano anual
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1.2rem 0",
                }}
              >
                <Button
                  $isBuy
                  type="submit"
                  onClick={() => {
                    isSubscriptionActive
                      ? handleUpdateSubscribe(plan.planId)
                      : handleSubscribe(plan.planId);
                  }}
                />
              </div>
              <ul
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {plan.features.map((feature: string) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      color: plan.popular ? "#4b5563" : "#d1d5db",
                    }}
                  >
                    <Check
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        marginTop: "0.25rem",
                        flexShrink: 0,
                        color: plan.popular ? "#22c55e" : "#f16855",
                      }}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </PricingContainer>
      </AnimatePresence>
    </>
  );
}
