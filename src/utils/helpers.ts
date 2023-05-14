/**
 *
 * 360 - A*  (100%)
 *
 * 120 - A*  (90% - 99%)
 *
 * 40  - A   (80% - 89%)
 *
 * 10  - B   (70% - 79%)
 *
 * 6   - C   (60% - 69%)
 *
 * 4   - D   (50% - 59%)
 *
 * 2   - E   (40% - 49%)
 *
 * -2  - F   (30% - 39%)
 *
 * -4  - G   (20% - 29%)
 *
 * -8  - U   (0% - 19%)
 *
 * 0   - N/A
 * @returns A* (100%) | A* | A | B | C | D | E | F | G | U | -
 */
export const intToGrade = {
  360: "A* (100%)",
  120: "A*",
  40: "A",
  10: "B",
  6: "C",
  4: "D",
  2: "E",
  "-2": "F",
  "-4": "G",
  "-8": "U",
  0: "-",
};
export type IntGradesType = keyof typeof intToGrade;

/**
 *
 * A* (100%) - 360
 *
 * A*        - 120
 *
 * A         - 40
 *
 * B         - 10
 *
 * C         - 6
 *
 * D         - 4
 *
 * E         - 2
 *
 * F         - -2
 *
 * G         - -4
 *
 * U         - -8
 *
 * -         - 0
 * @returns Int
 */
export const gradeToInt = {
  "A* (100%)": 360,
  "A*": 120,
  A: 40,
  B: 10,
  C: 6,
  D: 4,
  E: 2,
  F: -2,
  G: -4,
  U: -8,
  "-": 0,
};
export type GradesType = keyof typeof gradeToInt;
