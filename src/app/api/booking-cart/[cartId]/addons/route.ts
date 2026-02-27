import { NextRequest, NextResponse } from 'next/server';

interface Addon {
  id: string;
  title: string;
  quantity: number;
  pricePerUnit: number;
}

interface AddonsPayload {
  addons: Addon[];
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;
    const body: AddonsPayload = await request.json();
    const { addons } = body;

    if (!addons || !Array.isArray(addons) || addons.length === 0) {
      return NextResponse.json(
        { error: 'Addons array is required' },
        { status: 400 }
      );
    }

    // Validate each addon
    for (const addon of addons) {
      if (!addon.id || !addon.title || !addon.quantity || !addon.pricePerUnit) {
        return NextResponse.json(
          { error: 'Each addon must have id, title, quantity, and pricePerUnit' },
          { status: 400 }
        );
      }
    }

    // In a real application, you would:
    // 1. Find the cart by cartId
    // 2. Update the cart's addons
    // 3. Save to database
    // For now, we'll simulate a successful response

    const totalPrice = addons.reduce(
      (sum, addon) => sum + addon.quantity * addon.pricePerUnit,
      0
    );

    // Simulated response - in production, this would come from database
    const updatedAddons = addons.map(addon => ({
      id: addon.id,
      title: addon.title,
      quantity: addon.quantity,
      pricePerUnit: addon.pricePerUnit,
      price: addon.quantity * addon.pricePerUnit // Total price for this addon
    }));

    return NextResponse.json({
      success: true,
      message: 'Addons added to cart successfully',
      data: {
        cartId,
        addons: updatedAddons,
        totalAddonsPrice: totalPrice
      }
    });
  } catch (error) {
    console.error('Error adding addons to cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
