export const trackEvent = (event: string, data?: any) => {
  const log = {
    event,
    timestamp: new Date().toLocaleString(),
    isoTime: new Date().toISOString(),
    currentPage: data?.currentPage || "Server-side",
    userAgent: data?.userAgent || "Server",
    ...data,
  };

  // Pretty console table
  console.log("📊 ANALYTICS LOG", event);
  console.table(log);
};
