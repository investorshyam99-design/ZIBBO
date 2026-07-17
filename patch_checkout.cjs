const fs = require('fs');
let code = fs.readFileSync('src/views/CheckoutView.tsx', 'utf8');

code = code.replace(
  `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const productNames = cart.map(i => \`\${i.product.name} (x\${i.quantity})\`).join(', ');
    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    
    const codCharge = paymentMode === 'cod' ? 50 : 0;
    const finalTotal = subtotal + codCharge;

    await addOrder({
      customerName: formData.fullName,
      mobile: formData.mobile,
      email: '',
      address: \`\${formData.address}, Pincode: \${formData.pincode}\`,
      productNames,
      items: cart,
      quantity: totalQty,
      paymentStatus: paymentMode === 'cod' ? 'Advance Paid (COD)' : 'Prepaid',
      orderStatus: 'Processing',
      dateTime: new Date().toLocaleString(),
      total: finalTotal,
      status: 'Processing',
      createdAt: Date.now()
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };`,
  `  const placeOrder = async (productNames: string, totalQty: number, finalTotal: number) => {
    await addOrder({
      customerName: formData.fullName,
      mobile: formData.mobile,
      email: '',
      address: \`\${formData.address}, Pincode: \${formData.pincode}\`,
      productNames,
      items: cart,
      quantity: totalQty,
      paymentStatus: paymentMode === 'cod' ? 'Advance Paid (COD)' : 'Prepaid',
      orderStatus: 'Processing',
      dateTime: new Date().toLocaleString(),
      total: finalTotal,
      status: 'Processing',
      createdAt: Date.now()
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const productNames = cart.map(i => \`\${i.product.name} (x\${i.quantity})\`).join(', ');
    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    
    const codCharge = paymentMode === 'cod' ? 50 : 0;
    const finalTotal = subtotal + codCharge;
    const amountToPay = paymentMode === 'cod' ? advanceAmount : finalTotal;

    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountToPay * 100 })
      });
      const orderData = await res.json();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_StypktCPqE3yKw',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ZIBBO',
        description: 'Purchase from ZIBBO',
        order_id: orderData.id,
        handler: async function (response: any) {
          await placeOrder(productNames, totalQty, finalTotal);
        },
        prefill: {
          name: formData.fullName,
          contact: formData.mobile,
        },
        theme: {
          color: '#0f172a'
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false);
          }
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert('Payment failed: ' + response.error.description);
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Failed to initialize payment. Please try again.');
      setIsSubmitting(false);
    }
  };`
);

fs.writeFileSync('src/views/CheckoutView.tsx', code);
