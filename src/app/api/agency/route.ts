import { NextResponse } from 'next/server';

export async function GET() {
  const agency = {
    name: 'Wanderlust Adventures',
    description: 'Lorem ipsum dolor sit amet consectetur. Nulla varius faucibus elementum.',
    trips: '15+',
    travelers: '500+',
    activeTrips: 2,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
  };

  return NextResponse.json(agency);
}
