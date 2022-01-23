export default async function handler(req, res) {
  const respondents = await fetch(
    process.env.NEXT_PUBLIC_API_BASEURL + "/respondents"
  )
    .then((res) => res.json())
    .catch((err) => err);
  res.status(200).json(respondents);
}