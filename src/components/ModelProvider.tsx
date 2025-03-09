"use client"; // ✅ Client Component for managing modal state
import { useState, useContext, createContext } from "react";
//import SignInModal from "./SignInModal";
import dynamic from "next/dynamic";

// ✅ Dynamically import modal to prevent SSR issues
const SignInModal = dynamic(() => import("@/components/SignInModal"), { ssr: false });

interface ModalContextType {
    openSignIn: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);
//const ModalContext = createContext<{ openSignIn: () => void } | undefined>(undefined);

// ✅ Move Client-Side Logic to a Separate Client Component
export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ openSignIn: () => setIsSignInOpen(true) }}>
            {children}
            {isSignInOpen && <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}