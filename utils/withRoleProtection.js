'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withRoleProtection = (Component, allowedRoles = []) => {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");

      if (!token || !userData) {
        router.push("/login");
        return;
      }

      const { role } = JSON.parse(userData);

      if (!allowedRoles.includes(role)) {
        router.push("/unauthorized"); // 👈 now it will work
        return;
      }
    }, []);

    return <Component {...props} />;
  };
};

export default withRoleProtection;
