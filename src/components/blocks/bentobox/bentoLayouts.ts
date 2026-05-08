export const bentoLayouts: Record<string, Array<{ className: string }>> = {
  // Style 1: Two on top (50% each), three below (33% each)
  "2U3D": [
    { className: "col-span-6 row-span-1" },
    { className: "col-span-6 row-span-1" },
    { className: "col-span-4 row-span-1" },
    { className: "col-span-4 row-span-1" },
    { className: "col-span-4 row-span-1" },
  ],

  // Style 2: One full box
  "1C": [{ className: "col-span-12 row-span-2" }],

  // Style 3: Two vertical boxes (side-by-side)
  "2V": [
    { className: "col-span-6 row-span-2" },
    { className: "col-span-6 row-span-2" },
  ],

  // Style 4: Two horizontal boxes (stacked)
  "2H": [
    { className: "col-span-12 row-span-1" },
    { className: "col-span-12 row-span-1" },
  ],

  // Style 5: Three vertical boxes (evenly spaced)
  "3V": [
    { className: "col-span-4 row-span-2" },
    { className: "col-span-4 row-span-2" },
    { className: "col-span-4 row-span-2" },
  ],

  // Style 6: One vertical + two horizontal
  "1V2H": [
    { className: "col-span-4 row-span-2" },
    { className: "col-span-8 row-span-1" },
    { className: "col-span-8 row-span-1" },
  ],

  // Style 7: Two horizontal on top, one vertical on side
  "2H1V": [
    { className: "col-span-8 row-span-1" },
    { className: "col-span-8 row-span-1" },
    { className: "col-span-4 row-span-2" },
  ],

  // Style 8: Four small vertical boxes (like 25% each)
  "4V": [
    { className: "col-span-3 row-span-2" },
    { className: "col-span-3 row-span-2" },
    { className: "col-span-3 row-span-2" },
    { className: "col-span-3 row-span-2" },
  ],
  // Style 9: one verticla two horizontal one vertical
  "1V2H1V": [
    { className: "col-span-3 row-span-2" },
    { className: "col-span-6 row-span-1" },
    { className: "col-span-6 row-span-1" },
    { className: "col-span-3 row-span-2" },
  ],
  // Style 10: two horizontal two vertical
  "2H2V": [
    { className: "col-span-6 row-span-1" },
    { className: "col-span-3 row-span-2" },
    { className: "col-span-6 row-span-1" },
    { className: "col-span-3 row-span-2" },
  ],
  // Style 11: two horizontal two horizontal
  "2H2H": [
    { className: "col-span-6 row-span-1" },
    { className: "col-span-6 row-span-1" },
    { className: "col-span-6 row-span-1" },
    { className: "col-span-6 row-span-1" },
  ],
  // Style 12: two horizontal two horizontal two horizontal
  "2H2H2H": [
    { className: "col-span-4 row-span-1" },
    { className: "col-span-4 row-span-1" },
    { className: "col-span-4 row-span-1" },
    { className: "col-span-4 row-span-1" },
    { className: "col-span-4 row-span-1" },
    { className: "col-span-4 row-span-1" },
  ],

  // Style 13: One vertical + three horizontal
  "1V3H": [
    { className: "col-span-4 row-span-3" },
    { className: "col-span-8 row-span-1" },
    { className: "col-span-8 row-span-1" },
    { className: "col-span-8 row-span-1" },
  ],

  // Style 14: Two on top (50% each) + 1 Down(100%)
  "2U1D": [
    { className: "col-span-6 row-span-1" },
    { className: "col-span-6 row-span-1" },
    { className: "col-span-12 row-span-1" },
  ],

};
