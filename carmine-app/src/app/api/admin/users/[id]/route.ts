const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5208";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Replace with your actual API URL
    const apiUrl = `${API_BASE_URL}/api/users/${id}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return new Response(JSON.stringify(errorResponse), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const successResponse = await response.json();
    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error communicating with API:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to delete user" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
