export const dynamic = "force-dynamic";
import dbConnect from "@/utils/chatbot/db";
import Transaction from "@/models/chatbot/transaction";
import stripe from "@/utils/chatbot/stripe";

export async function POST(req: Request) {
  await dbConnect();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const transaction = new Transaction({
        sessionId: session.id,
        customerId: session.customer,
        invoiceId: session.invoice,
        subscriptionId: session.subscription,
        mode: session.mode,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        status: session.status,
      });

      await transaction.save();

      return Response.json({
        message: "Event processed successfully",
      });
    } else {
      return Response.json(
        {
          message: "Unhandled event type",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error handling webhook event:", error);

    return Response.json(
      {
        message: `Webhook error: ${error.message}`,
      },
      { status: 400 }
    );
  }
}
