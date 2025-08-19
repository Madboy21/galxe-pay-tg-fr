export function getTelegramUser() {
  const tg = window.Telegram?.WebApp;
  const initData = tg?.initData || "";
  const unsafe = tg?.initDataUnsafe;

  if (unsafe?.user?.id) {
    return {
      inTelegram: true,
      initData,
      userId: String(unsafe.user.id),
      referrerId: unsafe?.start_param || null
    };
  }
  return { inTelegram: false };
}
