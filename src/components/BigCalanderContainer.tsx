import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustSchedueleToCurrentWeek } from "@/lib/utils";

const BigCalanderContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });


  const data = dataRes.map(lesson => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime
  }))

  const schedule =  adjustSchedueleToCurrentWeek(data)

  return <div className=""><BigCalendar data={schedule}/></div>;
};

export default BigCalanderContainer;
