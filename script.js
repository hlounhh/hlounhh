/**
 * CORE LOGIC — HOÀNG TRỌNG LƯƠNG PORTFOLIO
 * Implements typewriter effect, viewport scroll animations, dynamic JSON-based localization,
 * and background music playback after the first user interaction.
 */

// Embedded fallback translations in case of CORS limitations when opening via file:// protocol
const fallbackTranslations = {
    "vi": {
        "title": "Hoàng Trọng Lương — Kỹ sư Phần mềm",
        "title