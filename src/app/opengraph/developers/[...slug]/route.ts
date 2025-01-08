// Route segment config
export const runtime = 'nodejs';
export const revalidate = 3600; // 1 hour
// export const dynamic = "force-static";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string[] }>;
  }
) {
  const slug = (await params).slug;
  // format the provided slug as a path route
  let route = slug.join('/').toLowerCase();

  // handle the special case for course lessons
  if (route.startsWith('courses/lesson/'))
    route = route.replace('courses/lesson/', 'lesson/');

  return new Response('hello', {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public; max-age=18000',
    },
  });
}
