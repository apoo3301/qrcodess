"use client";

interface HomeButtonProps {
  children: React.ReactNode;
}

export function HomeButton({ children }: HomeButtonProps) {
  const onClick = () => {
    window.location.href = "/"
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
