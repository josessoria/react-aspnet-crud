import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import React from "react";

const Model = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Producto
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" >
                Cerrar
              </Button>
              <Button className=" bg-[#B3C300] " >
                <span className=" text-white font-[500]">Crear</span>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Model;
