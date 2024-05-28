import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (event.path.startsWith("/admin") && session?.user.role !== "admin") {
    return sendRedirect(event, "/");
  }
});
