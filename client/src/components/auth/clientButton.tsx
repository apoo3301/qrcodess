"use client";

interface ClientButtonProps {
  children: React.ReactNode;
  
}

export function ClientButton({ children }: ClientButtonProps) {
  const onClick = () => {
    window.location.href = "/client"
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
