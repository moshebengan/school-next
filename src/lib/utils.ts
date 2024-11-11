import { auth, currentUser } from "@clerk/nextjs/server";

export const getUserRole = async (): Promise<string | null> => {
  const user = await currentUser();
  return user?.publicMetadata.role as string | null;
};

export const getUserId = async (): Promise<string | null> => {
  return (await auth()).userId;
};

const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);

  if (dayOfWeek === 0) {
    startOfWeek.setDate(today.getDate() + 1);
  }
  if (dayOfWeek === 6) {
    startOfWeek.setDate(today.getDate() + 1);
  } else {
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
  }
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
};

export const adjustSchedueleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const startOfWeek = currentWorkWeek();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustedStartDay = new Date(startOfWeek);
    adjustedStartDay.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDay.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );

    const adjustedEndDay = new Date(startOfWeek);
    adjustedEndDay.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDay,
      end: adjustedEndDay,
    };
  });
};
