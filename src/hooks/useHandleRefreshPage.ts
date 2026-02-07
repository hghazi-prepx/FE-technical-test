"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useHandlePageRefresh(examId?: string) {
  const router = useRouter();

  useEffect(() => {
    // Detect if this page load was due to a browser refresh
    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    console.log(navEntries);
    const isReload =
      navEntries.length > 0 && navEntries[0].entryType === "reload";
    if (
      performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD
    ) {
      console.log(
        "Page was refreshed using the browser's reload button or F5."
      );
    }
    if (isReload) {
      const baseUrl = "/acj-exam/create-acj-exam";
      if (examId) {
        router.replace(`${baseUrl}?exam-id=${encodeURIComponent(examId)}`);
      } else {
        router.replace(baseUrl);
      }
    }
  }, [examId, router]);
}
