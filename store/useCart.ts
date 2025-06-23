import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface CartStore {
  items: cart[]; // Array of cart items
  addItem: (data: cart) => void; // Add a new item or increase quantity
  removeItem: (id: string) => void; // Remove a single item
  removeAll: () => void; // Clear all items from the cart
  updateQty: (data: cart) => void; // Change quantity or remove item if qty is 0
  total: () => void; // Calculate total price of the cart
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [], // Initialize with an empty array

      // add item to the cart
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          const index = currentItems.findIndex(
            (cartItem) => cartItem.id === data.id
          );

          if (data.qty >= 0) {
            let newCart = [...currentItems];
            newCart[index] = {
              ...newCart[index],
              qty: newCart[index].qty + 1,
            };
            set({
              items: [
                ...currentItems.filter((item) => item.id !== data.id),
                ...newCart,
              ],
            }); // remove the existing item
            set({
              items: [...newCart],
            }); // set updated cart
            toast.success(`${data.title} quantity updated.`);
          }
        } else {
          set({ items: [...currentItems, data] }); // Add new item to the cart
          toast.success(`${data.title} added to cart.`);
        }
      },

      //   update item quantity in the cart
      updateQty: (data) => {
        const currentItems = get().items;
        const product = currentItems.filter((item) => item.id === data.id);

        if (product.length >= 0) {
          const index = currentItems.findIndex(
            (cartItem) => cartItem.id === data.id
          );
          let newCart = [...currentItems];
          if (data.qty >= 1) {
            newCart[index] = data; // Update the item with new quantity
            set({
              items: [...newCart],
            }); // Set updated cart
            toast.success(`${data.title} quantity updated.`);
          } else {
            set({
              items: [...currentItems.filter((item) => item.id !== data.id)],
            }); // Remove the item if quantity is 0
            toast.success(`${data.title} removed from cart.`);
          }
        }
      },
      // remove a single item from the cart
      removeItem: (id) => {
        const product = get().items.find((item) => item.id === id);

        set({
          items: [...get().items.filter((item) => item.id !== id)],
        }); // Remove the item if quantity is 0
        toast.success(`${product?.title} removed from cart.`);
      },

      // clear all items from the cart
      removeAll: () => {
        set({ items: [] }); // Clear the cart
        toast.success("Cart cleared.");
      },

      // calculate total price of the cart
      total: () => {
        const currentItems = get().items;
        const totalPrice = currentItems.reduce(
          (total, item) => total + item.price * item.qty,
          0
        );
        return totalPrice;
      },
    }),
    {
      name: "my-shop-cart-storage", // Unique name for the storage
      storage: createJSONStorage(() => localStorage), // Use
    }
  )
);

export default useCart;
