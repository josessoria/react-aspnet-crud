import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Product } from "./Product"; // Import the Product type

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSave: () => void;
};

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onChange,
  onSave,
}) => (
  <Modal size="md" isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1">Editar Producto</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          label="Nombre"
          placeholder="Nombre del producto"
          variant="bordered"
          size="sm"
          name="name"
          value={product.name}
          onChange={onChange}
          labelPlacement="outside"
        />
        <Select
          label="Categoría"
          placeholder="Selecciona la categoría"
          name="categoryId"
          variant="bordered"
          value={product.categoryId.toString()}
          defaultSelectedKeys={[product.categoryId.toString()]}
          onChange={onChange}
          size="sm"
          labelPlacement="outside"
        >
          <SelectItem key={1}>Electrónica</SelectItem>
          <SelectItem key={2}>Salud</SelectItem>
          <SelectItem key={3}>Construcción</SelectItem>
        </Select>
        <Input
          type="number"
          label="Precio"
          placeholder="Precio del producto"
          variant="bordered"
          size="sm"
          name="price"
          value={product.price.toString()}
          onChange={onChange}
          labelPlacement="outside"
        />
        <Textarea
          type="text"
          label="Descripción"
          placeholder="Descripción del producto"
          variant="bordered"
          size="sm"
          name="description"
          value={product.description}
          onChange={onChange}
          labelPlacement="outside"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onClick={onClose}>
          Cerrar
        </Button>
        <Button className="bg-[#B3C300]" onClick={onSave}>
          <span className="text-white font-[500]">Editar</span>
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default EditProductModal;
