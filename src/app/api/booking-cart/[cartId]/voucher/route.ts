import { NextRequest, NextResponse } from 'next/server';

interface VoucherPayload {
  voucherCode: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;
    const body: VoucherPayload = await request.json();
    const { voucherCode } = body;

    if (!voucherCode || voucherCode.trim() === '') {
      return NextResponse.json(
        { error: 'Voucher code is required' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Validate the voucher code against a database
    // 2. Check if the voucher is valid and not expired
    // 3. Check if the voucher has remaining uses
    // 4. Calculate the discount amount based on voucher
    // 5. Update the cart with the discount

    // For now, we'll simulate a discount based on voucher code
    let discountAmount = 0;
    if (voucherCode.toUpperCase() === 'SAVE10') {
      discountAmount = 100; // Example discount
    } else if (voucherCode.toUpperCase() === 'SAVE20') {
      discountAmount = 200;
    } else {
      return NextResponse.json(
        { error: 'Invalid voucher code' },
        { status: 400 }
      );
    }

    const discount = {
      voucherCode: voucherCode.toUpperCase(),
      discountAmount: discountAmount,
      appliedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Voucher applied successfully',
      data: {
        cartId,
        voucher: discount,
        discountAmount: discountAmount
      }
    });
  } catch (error) {
    console.error('Error applying voucher:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;

    // In a real application, you would:
    // 1. Remove the voucher from the cart
    // 2. Restore any original pricing

    return NextResponse.json({
      success: true,
      message: 'Voucher removed successfully',
      data: {
        cartId,
        voucher: null,
        discountAmount: 0
      }
    });
  } catch (error) {
    console.error('Error removing voucher:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
