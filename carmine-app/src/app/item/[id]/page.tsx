import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`http://localhost:3000/api/item/${params.id}`);

  if (!response.ok) {
    notFound(); // This will render your custom 404 page
  }

  const data = await response.json();

  return (
    <div>
      <h1>Item Details</h1>
      <p>{data.name}</p>
    </div>
  );
}
