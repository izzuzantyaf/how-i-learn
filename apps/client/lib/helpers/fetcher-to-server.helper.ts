export async function fetchToServer({
  path,
  method = "GET",
  body,
}: {
  path?: string;
  method?: string;
  body?: object;
}) {
  if (!path?.startsWith("/")) path = "/" + path;
  const response = await fetch(
    new URL((process.env.NEXT_PUBLIC_API_URL as string) + path),
    {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    }
  );
  const responseJson = await response.json();
  console.log("Server response", responseJson);
  return responseJson;
}
