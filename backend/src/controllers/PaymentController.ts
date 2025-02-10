import { Request, Response, Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// 初始化 Stripe（使用后端密钥）
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
});

class PaymentController {
  public path = "/payments";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create-payment-intent`,
      this.createPaymentIntent
    );
    this.router.post(`${this.path}/webhook`, this.handleWebhook);
  }

  // 🎯 处理前端支付请求，创建 PaymentIntent
  private async createPaymentIntent(req: Request, res: Response) {
    try {
      const { items } = req.body; // 获取购物车数据

      // 计算订单总金额
      const subtotal = items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      const tax = subtotal * 0.15;
      const shipping = 10;
      const totalAmount = Math.round((subtotal + tax + shipping) * 100); // Stripe 以 "分" 计价

      console.log("💰 Creating PaymentIntent for:", totalAmount);

      // 创建 PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("❌ Error creating PaymentIntent:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  }

  // 🎯 处理 Stripe Webhook 事件（可选，用于处理订单状态更新）
  private async handleWebhook(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );

      if (event.type === "payment_intent.succeeded") {
        console.log("✅ Payment successful:", event.data.object);
        // ✅ 在这里更新数据库中的订单状态
      }

      res.json({ received: true });
    } catch (error) {
      console.error("❌ Webhook error:", error);
      res.status(400).json({ error: "Webhook handler failed" });
    }
  }
}

export default PaymentController;
