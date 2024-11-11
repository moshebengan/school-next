"user client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });
  

  const [img, setImg] = useState<any>();

  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction({...data, img: img?.secureUrl});
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { subjects } = relatedData;
  // console.log(img)

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="font-semibold text-xl">
        {type === "create" ? "Create a new Teacher" : "Update the teacher"}
      </h1>
      <span className="text-xs text-gray-500 font-medium">
        Autherization Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          defaultValue={data?.username}
          register={register}
          name="username"
          error={errors?.username}
        />
        <InputField
          type="Email"
          label="email"
          defaultValue={data?.email}
          register={register}
          name="email"
          error={errors?.email}
        />
        <InputField
          type="password"
          label="Password"
          defaultValue={data?.password}
          register={register}
          name="password"
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-500 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First name"
          defaultValue={data?.name}
          register={register}
          name="name"
          error={errors?.name}
        />
        <InputField
          label="Last name"
          defaultValue={data?.surname}
          register={register}
          name="surname"
          error={errors?.surname}
        />
        <InputField
          label="Phone"
          defaultValue={data?.phone}
          register={register}
          name="phone"
          error={errors?.phone}
        />
        <InputField
          label="Address"
          defaultValue={data?.address}
          register={register}
          name="address"
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          defaultValue={data?.bloodType}
          register={register}
          name="bloodType"
          error={errors?.bloodType}
        />
        <InputField
          label="Birthday"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          register={register}
          name="birthday"
          error={errors?.birthday}
          type="date"
        />
        {data && (
          <InputField
            label="ID"
            defaultValue={data?.id}
            register={register}
            name="id"
            error={errors?.id}
            hidden
          />
        )}

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-sm text-gray-400">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-sm text-gray-400">Subjects</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjects")}
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects.message.toString()}
            </p>
          )}
        </div>
        {img ? (
          <Image
            src={img?.secure_url}
            alt=""
            width={80}
            height={40}
            className="rounded-md flex items-center gap-2"
          />
        ) : (
          <CldUploadWidget
            uploadPreset="school"
            onSuccess={(result, { widget }) => {
              setImg(result?.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="text-sm text-gray-400 flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/upload.png" alt="" width={28} height={28} />
                  <span>Upload a photo</span>
                </div>
              );
            }}
          </CldUploadWidget>
        )}
        {state.error && (
          <span className="text-red-500">Something Went Wrong!</span>
        )}
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;