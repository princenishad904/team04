


export function getDate() {
  const date = new Date();

  // Current date ke parts nikaalo
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Fixed time set karo (21:03:00 => 9:03 PM)
  const hours = "20";
  const minutes = "30";
  const seconds = "00";

  // Final formatted string banao
  const formatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formatted;
}
