"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-xl font-mono font-semibold">{orderNumber}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <Package className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">Processing</p>
                      <p className="text-sm text-muted-foreground">We're preparing your order</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">Shipping</p>
                      <p className="text-sm text-muted-foreground">5-7 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              You'll receive an email confirmation shortly with your order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
