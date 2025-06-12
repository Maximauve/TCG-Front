import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const { provider } = await request.json();
    if (!provider) {
      return NextResponse.json({ message: "Provider requis" }, { status: 400 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth/disconnect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`,
      },
      body: JSON.stringify({ provider }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
    }

    return NextResponse.json({ message: "Provider déconnecté avec succès" });
  } catch (error) {
    console.error('Erreur lors de la déconnexion du provider:', error);
    return NextResponse.json(
      { message: "Erreur lors de la déconnexion du provider" },
      { status: 500 }
    );
  }
} 