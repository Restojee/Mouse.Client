import { privacyPolicySheet } from "@/modules/auth/authSheets";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const FALLBACK_PATH = "/maps";

export const PrivacyPolicyController = () => {
  const router = useRouter();
  const isOpenRef = useRef(false);

  useEffect(() => {
    if (!router.isReady || isOpenRef.current) return;
    isOpenRef.current = true;

    privacyPolicySheet.show().then(() => {
      isOpenRef.current = false;
      const fallback = typeof router.query.from === "string" ? router.query.from : FALLBACK_PATH;
      router.push(fallback).catch(() => undefined);
    });
  }, [router]);

  return null;
};
