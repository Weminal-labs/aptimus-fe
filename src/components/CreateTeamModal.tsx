import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Image,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { createTeam } from "../utils/team";

type Inputs = {
  name: string;
};

export default function CreateTeamModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { user, team, setTeam } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!user) return;
    const response = await createTeam(data.name, user.id);
    setTeam(response);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 items-center">
            <Image src="/imgs/laptop.svg" className="w-1/2" removeWrapper />
            <h1 className="text-2xl font-bold">Start with your team!</h1>
            <p className="text-sm text-grayText font-semibold">
              Team make you go far!
            </p>
          </ModalHeader>
          <ModalBody>
            <form
              className="flex flex-col pb-4 space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-center w-full flex-col space-y-3 font-bold">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <h1 className="text-sm dark:text-gray-400 mb-2">
                      Team's Image
                    </h1>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              <Input
                type="text"
                variant="underlined"
                label="Team Name"
                {...register("name", { required: true })}
                errorMessage="Please enter Team's name"
                isInvalid={!!errors.name}
              />
              {/* include validation with required or other standard HTML validation rules */}

              <Button type="submit" className="!mt-8 font-bold">
                Create
              </Button>
            </form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
