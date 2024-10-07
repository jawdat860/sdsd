import React, { useState, useEffect, useContext } from "react";
import { Modal, VisuallyHidden } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import CartContext from "../store/CartContext";
import image from "../../assets/biryani_cover.jpg";

const ServiceModal = ({ isOpen, onClose, service,favoriteHandler,favorite }) => {
  const [quantity, setQuantity] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  
  const cartCtx = useContext(CartContext);
console.log(favorite)
  // Reset quantity and validation state when the modal is opened
  useEffect(() => {
    if (isOpen && service) {
      const existingItem = cartCtx.items.find(item => item.id === service.id);
      setQuantity(existingItem ? existingItem.amount : 1); // Set to existing amount or default to 1
      setAmountIsValid(true);
    }
  }, [isOpen, service, cartCtx.items]);

  if (!service) return null;

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quantity < 1 || quantity > 5) {
      setAmountIsValid(false);
      return;
    }

    cartCtx.addItem({
      id: service.id,
      name: service.title,
      amount: quantity,
      price: service.price,
    });
  
    setAmountIsValid(true); // Reset validation on successful add to cart
    onClose(); // Optionally close the modal after adding to the cart
  };
    console.log(cartCtx.itemsFavourite)
  return (
    <Modal
      header={<ModalHeader style={{ backgroundColor: "transparent" }}>Service Details</ModalHeader>}
      open={isOpen}
      onOpenChange={(open) => onClose(open)}
      dismissible={true}
      style={{
        backgroundColor: "transparent",
        bottom: "0",
        display: "flex",
        alignContent: "space-between",
      }}
    >
      <DialogTitle>
        <VisuallyHidden>{service.title}</VisuallyHidden>
      </DialogTitle>

      <div className="rounded-t-lg shadow-lg w-full flex flex-col text-center  ">
        <div className="relative w-full" style={{ backgroundColor: "transparent" }}>
          <img className="w-full h-[260px] object-cover rounded-t-[40px]" alt={service.title} src={image} />
        </div>
        <div className="rounded-t-[40px] w-[100%] bg-white dark:bg-gray-800 p-6 z-[100] mt-[-40px] pb-[42px]">
          <h2 className="text-xl font-bold mb-2 dark:text-white">{service.title}</h2>
          <p className="dark:text-gray-300 mb-4">{service.description}</p>
          <button onClick={favoriteHandler} className="bg-black text-white">favouite</button>
          <p className="text-lg font-bold text-primary dark:text-secondary mb-6">{service.price} ₽</p>

          <form onSubmit={handleSubmit} className="max-w-xs mx-auto items-center p-[10px] flex flex-col">
            <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Choose quantity:
            </label>
            <div className="relative flex items-center max-w-[11rem] mb-[10px] aling-center">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={`${
                  quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                } bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none font-bold text-[30px] flex justify-center items-center`}
              >
                -
              </button>
              <input
                type="text"
                id="quantity-input"
                value={quantity}
                readOnly
                className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= 5}
                className={`${
                  quantity >= 5 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                } bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none font-bold text-[20px] flex justify-center items-center`}
              >
                +
              </button>
            </div>
            {!amountIsValid && (
              <p className="text-red-500 mt-2">Please enter a valid quantity between 1 and 5.</p>
            )}
            <button className="button-85" role="button" type="submit">
              Add to Cart
              <span className="ml-2 text-xl">{service.price * quantity} ₽</span>
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceModal;
