"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 800) {
  const [isMobile, setIsMobile] = useState(false); // valor inicial

  useEffect(() => {
    // Função que checa o tamanho da tela e atualiza o estado
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    // Limpa o listener quando o componente for desmontado
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
