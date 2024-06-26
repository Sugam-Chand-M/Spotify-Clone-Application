"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    // to prevent the iteration errors caused by the modals while server side rendering
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted)
        return null;
    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
};

export default ModalProvider;