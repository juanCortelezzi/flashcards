// place files you want to import through the `$lib` alias in this folder.

import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors ease-in-out font-bold capitalize duration-100',
  variants: {
    color: {
      error: 'border-red-800 text-red-800 hover:bg-red-800 hover:text-white',
      success: 'border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white',
      warning: 'border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white'
    },
    format: {
      normal: "px-4 py-2",
      square: "p-2 flex flex-row justify-center items-center",
    }
  },
  defaultVariants: {
    format: "normal",
  }
});
