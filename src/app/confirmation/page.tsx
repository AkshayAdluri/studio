import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
      <Card className="w-full text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
             <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold font-headline">
            Thank you for your order!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Your order has been placed successfully. We've sent a confirmation email to you.
          </p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
