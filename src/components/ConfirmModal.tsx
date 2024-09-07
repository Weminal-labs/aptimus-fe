import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ConfirmModal({
  isOpen,
  onOpenChange,
  action,
  title = "",
  description = "",
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  action: () => Promise<void>;
  title?: string;
  description?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);

    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    await action();
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-grayText text-sm">{description}</p>
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center space-x-4 pb-5">
                <Button
                  className="w-40"
                  color="primary"
                  onClick={handleClick}
                  isLoading={isLoading}
                >
                  Yes, Do it
                </Button>
                <Button
                  className="w-40"
                  onClick={onClose}
                  isLoading={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
