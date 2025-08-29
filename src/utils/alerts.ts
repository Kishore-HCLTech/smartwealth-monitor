export const isRenewalDue = (renewalDate: string): boolean => {
  const today = new Date();
  const dueDate = new Date(renewalDate);
  const diff = (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
  return diff <= 30;
};
