import Announcements from "@/components/Announcements"
import BigCalanderContainer from "@/components/BigCalanderContainer"
import BigCalendar from "@/components/BigCalendar"
import prisma from "@/lib/prisma"
import { getUserId, getUserRole } from "@/lib/utils"


const ParentPage = async () => {

  const role = await getUserRole()
  const userId = await getUserId()

  const students = await prisma.student.findMany({
    where: {
      parentId: userId!
    }
  })

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="">
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <BigCalanderContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage