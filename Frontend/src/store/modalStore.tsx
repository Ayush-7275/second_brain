import { create } from "zustand";

type ModalStore = {
  modal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
    modal: false,
    openModal: () => set({ modal: true }),
    closeModal: () => set({ modal: false }),
}));
