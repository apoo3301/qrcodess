"use client";

import { useCurrentUser } from "~/hooks/use-current-user";
import { UserInfo } from "~/components/userInfo";
import { useEffect, useState } from "react";

export default function ClientPage() {
  const user = useCurrentUser();
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    updateMedia();

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isDesktop]);
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <UserInfo user={user} label="client informations" />
    </div>
  );
}
