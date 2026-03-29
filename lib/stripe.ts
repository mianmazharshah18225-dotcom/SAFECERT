import Stripe from 'stripe'

// Initialize Stripe on the server side
// Use a placeholder key during build if not set
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build'

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2026-03-25.dahlia',
  typescript: true,
})

// Helper function to format amount for Stripe (convert to pence/cents)
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

// Helper function to format amount for display (convert from pence/cents)
export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}
