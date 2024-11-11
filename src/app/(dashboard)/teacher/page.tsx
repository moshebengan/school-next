import Announcements from "@/components/Announcements"
import BigCalanderContainer from "@/components/BigCalanderContainer"
import BigCalendar from "@/components/BigCalendar"
import { getUserId, getUserRole } from "@/lib/utils"


const TeacherPage = async () => {
  const userId = await getUserId()
  // const role = await getUserRole();

  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row flex-1'>
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
      <div className="h-full bg-white p-4 rounded-md gap-4">
        <h1 className="text-xl font-semibold">Schedule</h1>
        <BigCalanderContainer type="teacherId" id={userId!}/>
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements/>
      </div>
    </div>
  )
}

export default TeacherPage