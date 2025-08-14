import Link from "next/link";
export default function ComingSoon({title,description}:{title:string;description?:string;}){
  return (
    <div className="card text-center">
      <div className="mb-2 text-4xl">🚧</div>
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p className="mb-4 text-gray-600">{description ?? "This calculator is on the way. Check back soon!"}</p>
      <Link href="/" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">← Back to all calculators</Link>
    </div>
  );
}
