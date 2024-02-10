import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist, createJSONStorage } from "zustand/middleware";
import * as cartInMemory from './helpers/cartInMemory'

export type ProductsCartProps = ProductProps & {
    quantity: number;
}

type StateProps = {
    products: ProductsCartProps[];
    add: (product: ProductProps) => void;
    remove: (productID: string) => void;
    clear: () => void;
}

export const useCartStore = create(
    persist<StateProps>((set) => ({
        products: [],
        add: (product: ProductProps) => set((state) => ({
            products: cartInMemory.add(state.products, product)
        })),
        remove: (productID: string) => set((state) => ({
            products: cartInMemory.remove(state.products, productID)
        })),
        clear: () => set(() => ({
            products: []
        })),
    }), {
        name: 'app-delivery: cart',
        storage: createJSONStorage(() => AsyncStorage )
    })
)