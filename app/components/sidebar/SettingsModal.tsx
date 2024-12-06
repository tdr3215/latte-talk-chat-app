"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image,
    },
  });

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <h2 className="text-base-content font-semibold leading-7 ">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-secondary-content/80">
              Edit your profile
            </p>
            <div className="mt-10 flex flex-col gap-y-8 ">
              <Input
                disabled={isLoading}
                label="Name "
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={48}
                    alt="profile picture"
                    height={48}
                    className="rounded-full"
                    src={
                      image ||
                      currentUser.image ||
                      "/images/placeholder_image.jpg"
                    }
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="pzmjhxoi"
                    className="text-secondary btn bg-primary mx-2 hover:bg-primary hover:opacity-70 transition"
                  >
                    Change
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
