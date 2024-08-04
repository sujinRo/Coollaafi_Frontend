import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
