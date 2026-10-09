import { Musician } from "@/lib/types/events";

// Section order for consistent display
export const sectionOrder = [
  "Rhythm",
  "Saxophones",
  "Trumpets",
  "Trombones",
  "Tuba",
  "French Horns",
  "Percussion",
];

// Visible musicians, by section then sortOrder
export const sortMusicians = (musicians: Musician[]) =>
  musicians
    .filter((musician) => !musician.isHidden)
    .sort((a, b) => {
      const sectionA = sectionOrder.indexOf(a.section);
      const sectionB = sectionOrder.indexOf(b.section);
      if (sectionA !== sectionB) {
        return (
          (sectionA === -1 ? sectionOrder.length : sectionA) -
          (sectionB === -1 ? sectionOrder.length : sectionB)
        );
      }
      return a.sortOrder - b.sortOrder;
    });
