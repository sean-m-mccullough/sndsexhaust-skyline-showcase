export default async function fetchHelper<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return res.json();
}
